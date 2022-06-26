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

const db = getFirestore(firebaseApp);
const postRef = collection(db, 'posts');

export default function ViewArticle() {
  const router = useRouter();
  const { slug: givenSlug } = router.query;

  const post = query(postRef, where('slug', '==', givenSlug));
  onSnapshot(post, (event) => {
    event.docs.forEach((doc) => {
      // @ts-ignore
      const postData: Article = { ...doc.data(), id: doc.id };
      const {
        id,
        createdAt,
        creatorId,
        description,
        html,
        markdown,
        slug,
        title,
      } = postData;
    });
  });
  return <>Post:</>;
}
