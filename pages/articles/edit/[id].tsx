import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import firebaseApp from '../../../firebase';
import { Article } from '../../../types/article';
import FormFields from '../../../components/_form_fields';
import { Form } from 'react-bootstrap';

const db = getFirestore(firebaseApp);

export default function EditArticle() {
  const [article, setArticle] = useState({} as Article);
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const markdown = useRef<HTMLTextAreaElement>(null);

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

  async function editArticle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title_ =
      title.current?.value == '' ? article.title : title.current?.value;

    const description_ =
      description.current?.value == ''
        ? article.description
        : description.current?.value;

    const markdown_ =
      markdown.current?.value == ''
        ? article.markdown
        : markdown.current?.value;

    const data = {
      title: title_,
      description: description_,
      markdown: markdown_,
    };

    try {
      await updateDoc(doc(db, `posts/${articleId}`), data);
    } catch (error) {
      alert('Missing permission');
    }
    router.push(`/articles/${article.slug}`);
  }

  return (
    <Form onSubmit={editArticle}>
      <FormFields
        article={article}
        description={description}
        content={markdown}
        title={title}
      />
    </Form>
  );
}
