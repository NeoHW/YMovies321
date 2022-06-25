import { FormEvent, useRef } from 'react';
import Form_Fields from '../components/_form_fields';
import { useAuthContext } from '../context/AuthContext';
import { AuthContext } from '../types/context';

export default function NewArticle() {
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLInputElement>(null);
  const { user, login }: AuthContext = useAuthContext();

  const createNewArticle = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(title.current?.value);
    console.log(description.current?.value);
    console.log(content.current?.value);
  };

  if (user === null) login({ popup: false });

  return (
    <>
      <h1 className="mb-4">Create New Article</h1>
      <form onSubmit={createNewArticle}>
        <Form_Fields
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
