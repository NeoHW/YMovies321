import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import FormFields from '../components/_form_fields';

import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import slugify from 'slugify';
import moment from 'moment';

import { collection, getFirestore, addDoc } from 'firebase/firestore';
import { useAuthContext } from '../context/AuthContext';
import firebaseApp from '../firebase';
import { AuthContext } from '../types/context';

const db = getFirestore(firebaseApp);
const postRef = collection(db, 'posts');

export default function NewArticle() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const { user, login }: AuthContext = useAuthContext();
  const router = useRouter();

  const createNewArticle = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addDoc(postRef, {
      createdAt: moment().format('MMM Do [at] h:mmA'),
      creatorId: user.uid,
      description: description,
      html: sanitizeHtml(marked.parse(content)),
      markdown: content,
      // Each slug has to be unique
      slug:
        Math.round(Math.random() * 1000) +
        slugify(title as string, {
          lower: true,
          strict: true,
        }),
      title: title,
    });
    router.push('/');
  };

  useEffect(() => {
    const loginWithGoogle = async () => {
      try {
        await login({ popup: true });
        router.push('/new');
      } catch (error) {
        console.error(error);
      }
    };
    if (user === null) loginWithGoogle();
  }, [user, login, router]);
  return (
    <>
      <h1 className="mb-4">Create New Article</h1>
      <form onSubmit={createNewArticle}>
        <FormFields
          article={null}
          title={setTitle}
          description={setDescription}
          content={setContent}
        />
      </form>
    </>
  );
}
