import type { NextPage } from 'next';
import { useState } from 'react';
import { Article } from '../types/article';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import firebaseApp from '../firebase';
import { useAuthContext } from '../context/AuthContext';
import type { User } from 'firebase/auth';

const db = getFirestore(firebaseApp);
const postRef = collection(db, 'posts');

function createNewArticle() {
  return;
}

function deleteArticle(articleId: string) {
  return;
}

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

  const { user }: { user: User } = useAuthContext();

  return (
    <>
      <h1 className="mb-4">Blog Articles</h1>
      <button
        id="new-article"
        className="btn btn-success"
        onClick={createNewArticle}
      >
        Create New Article
      </button>
      {articles.map((article: Article) => {
        return (
          <div className="card mt-4" key={article.id}>
            <div className="card-body">
              <h4 className="card-title">{article.title}</h4>
              <div className="card-subtitle text-muted mb-2">
                {article.createdAt}
              </div>
              <div className="card-text mb-2">{article.description}</div>
              <a href={`articles/${article.slug}`} className="btn btn-primary">
                Read More
              </a>
              {article.creatorId !== user?.uid ? (
                ''
              ) : (
                <span className="creator" id={article.creatorId}>
                  {' '}
                  <a
                    href={`articles/edit/${article.id}`}
                    className="btn btn-info"
                  >
                    Edit
                  </a>{' '}
                  <button
                    type="submit"
                    className="btn btn-danger"
                    onClick={() => deleteArticle(article.id)}
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
