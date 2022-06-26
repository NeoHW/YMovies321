import { useRouter } from 'next/router';
import { FormEvent, useRef } from 'react';
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
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLInputElement>(null);
  const { user, login }: AuthContext = useAuthContext();
  const router = useRouter();

  const createNewArticle = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addDoc(postRef, {
      createdAt: moment().format('MMM Do [at] h:mmA'),
      creatorId: user.uid,
      description: description.current?.value,
      html: sanitizeHtml(marked.parse(content.current?.value as string)),
      markdown: content.current?.value,
      // Each slug has to be unique
      slug:
        Math.round(Math.random() * 1000) +
        slugify(title.current?.value as string, {
          lower: true,
          strict: true,
        }),
      title: title.current?.value,
    });
    router.push('/');
  };

  if (user === null) login({ popup: false });

  return (
    <>
      <h1 className="mb-4">Create New Article</h1>
      <form onSubmit={createNewArticle}>
        <FormFields
          article={null}
          // @ts-ignore
          title={title}
          // @ts-ignore
          description={description}
          // @ts-ignore
          content={content}
        />
      </form>
    </>
  );
}
