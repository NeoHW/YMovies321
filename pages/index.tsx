import type { NextPage } from 'next';
import { useState } from 'react';
import { Article } from '../types/article';
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore';
import firebaseApp from '../firebase';
import { useAuthContext } from '../context/AuthContext';
import Link from 'next/link';
import { AuthContext } from '../types/context';

const db = getFirestore(firebaseApp);
const postRef = collection(db, 'posts');

const Home: NextPage = () => {
  const [articles, setArticles] = useState<Article[]>([] as Article[]);

  onSnapshot(postRef, (event) => {
    const articles: Article[] = [];
    event.docs.forEach((doc) => {
      // @ts-ignore
      articles.push({ ...doc.data(), id: doc.id });
    });
    setArticles(articles);
  });

  const { user }: AuthContext = useAuthContext();
  function deleteArticle(article: Article) {
    const docRef = doc(db, 'posts', article.id as string);
    return deleteDoc(docRef);
  }

  return (
    <>
      <h1 className="mb-4">Blog Articles</h1>
      <Link href="/new">
        <a className="btn btn-success">Create New Article</a>
      </Link>
      {articles.map((article: Article) => {
        return (
          <div className="card mt-4" key={article.id}>
            <div className="card-body">
              <h4 className="card-title">{article.title}</h4>
              <div className="card-subtitle text-muted mb-2">
                {article.createdAt}
              </div>
              <div className="card-text mb-2">{article.description}</div>
              <Link href={`articles/${article.slug}`}>
                <a className="btn btn-primary">Read More</a>
              </Link>
              {article.creatorId !== user?.uid ? (
                ''
              ) : (
                <span className="creator" id={article.creatorId}>
                  {' '}
                  <Link href={`articles/edit/${article.id}`}>
                    <a className="btn btn-info">Edit</a>
                  </Link>{' '}
                  <button
                    type="submit"
                    className="btn btn-danger"
                    onClick={() => deleteArticle(article)}
                  >
                    Delete
                  </button>
                </span>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Home;
