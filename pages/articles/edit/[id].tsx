import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { FormEvent } from 'react';
import firebaseApp from '../../../firebase';
import { Article } from '../../../types/article';
import FormFields from '../../../components/_form_fields';

const db = getFirestore(firebaseApp);

export default function EditArticle() {
  const [description, setDescription] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [title, setTitle] = useState('');

  const router = useRouter();
  const { id: articleId } = router.query;
  getDoc(doc(db, `posts/${articleId}`)).then((snap) => {
    // Check whether the post exists
    if (snap.exists()) {
      const { description, markdown, title }: Article = snap.data() as Article;
      setDescription(description);
      setMarkdown(markdown);
      setTitle(title);
    } else {
      // Redirect user to home page if invalid formId is used
      router.push('/');
    }
  });

  function editArticle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <>
      <h1 className="mb-4">Edit Article</h1>
      <form onSubmit={editArticle}>
        <FormFields
          article={null}
          description={setDescription}
          content={setMarkdown}
          title={setTitle}
        />
      </form>
    </>
  );
}
