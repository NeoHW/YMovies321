import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';
import FormFields from '../components/_form_fields';

import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import slugify from 'slugify';
import moment from 'moment';

import { collection, getFirestore, addDoc } from 'firebase/firestore';
import { useAuthContext } from '../../context/AuthContext';
import firebaseApp from '../../../firebase';
import { AuthContext } from '../types/context';
import { Article } from '../types/article';
import { Form } from 'react-bootstrap';

const db = getFirestore(firebaseApp);
const postRef = collection(db, 'posts');

export default function NewArticle() {
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const content = useRef<HTMLTextAreaElement>(null);
  const { user, login }: AuthContext = useAuthContext();
  const router = useRouter();

  const createNewArticle = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const article: Article = {
      createdAt: moment().format('MMM Do [at] h:mmA'),
      creatorId: user.uid,
      description: description.current?.value as string,
      html: sanitizeHtml(marked.parse(content.current?.value as string)),
      markdown: content.current?.value as string,
      // Each slug has to be unique
      slug:
        Math.round(Math.random() * 1000) +
        slugify(title.current?.value as string, {
          lower: true,
          strict: true,
        }),
      title: title.current?.value as string,
    };
    addDoc(postRef, article);
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
    <Form onSubmit={createNewArticle}>
      <FormFields
        article={null}
        title={title}
        description={description}
        content={content}
      />
    </Form>
  );
}
