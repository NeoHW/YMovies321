import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { FormEvent } from 'react';
import firebaseApp from '../../../firebase';
import { Article } from '../../../types/article';
import FormFields from '../../../components/_form_fields';

const db = getFirestore(firebaseApp);

export default function EditArticle() {
  const [article, setArticle] = useState({} as Article);
  const [description, setDescription] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [title, setTitle] = useState('');

  const router = useRouter();
  const { id: articleId } = router.query;
  getDoc(doc(db, `posts/${articleId}`)).then((snap) => {
    // Check whether the post exists
    if (snap.exists()) {
      const article = snap.data() as Article;
      setArticle(article);
    } else {
      // Redirect user to home page if invalid formId is used
      router.push('/');
    }
  });

  function editArticle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(title);
    console.log(description);
    console.log(markdown);
  }

  return (
    <>
      <h1 className="mb-4">Edit Article</h1>
      <form onSubmit={editArticle}>
        <FormFields
          article={article}
          description={setDescription}
          content={setMarkdown}
          title={setTitle}
        />
      </form>
    </>
  );
}
