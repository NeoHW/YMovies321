import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { Article } from '../../types/article';
import firebaseApp from '../../firebase';
import Link from 'next/link';
import { useState } from 'react';

const db = getFirestore(firebaseApp);
const postRef = collection(db, 'posts');

export default function ViewArticle() {
  const router = useRouter();
  const [createdAt, setCreatedAt] = useState('');
  const [html, setHtml] = useState('');
  const [title, setTitle] = useState('');
  const [articleId, setArticleId] = useState('');
  const { slug: givenSlug } = router.query;

  const post = query(postRef, where('slug', '==', givenSlug));
  onSnapshot(post, (event) => {
    event.docs.forEach((doc) => {
      // @ts-ignore
      const postData: Article = { ...doc.data(), id: doc.id };
      const { createdAt, html, title, id }: Article = postData;

      setCreatedAt(createdAt);
      setHtml(html);
      setArticleId(id);
      setTitle(title);
    });
  });
  return (
    <>
      <h1 className="mb-1">{title}</h1>
      <div className="text-muted mb-2">{createdAt}</div>
      <Link href="/">
        <a className="btn btn-secondary">All Articles</a>
      </Link>{' '}
      <a href={`/articles/edit/${articleId}`} className="btn btn-info">
        Edit
      </a>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </>
  );
}
