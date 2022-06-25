import { FormEvent, useRef } from 'react';
import Form_Fields from '../components/_form_fields';

const article = {
  id: 'id',
  createdAt: 'createdAt',
  creatorId: 'creatorId',
  description: 'description',
  markdown: 'markdown',
  slug: 'slug',
  title: 'title',
};

export default function NewArticle() {
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLInputElement>(null);

  const newArticle = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(title.current?.value);
    console.log(description.current?.value);
    console.log(content.current?.value);
  };

  return (
    <>
      <h1 className="mb-4">Create New Article</h1>
      <form onSubmit={newArticle}>
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
