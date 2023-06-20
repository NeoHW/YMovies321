import { doc, updateDoc, arrayUnion, Timestamp, arrayRemove} from "firebase/firestore";
import { User } from "firebase/auth";
import { findUser } from "../users/findUser";
import { db } from "../users/reauthenticateUser";
import { signIn } from "../auth";
import getDocFromMovieDB from "../getDocfromMovieDB";

export default async function removeReviewFromUserDB(user: User, movieId: string, reviewData: any) {
    const userRes = await findUser(user);

    if (userRes != null && userRes.size > 0) {
        const id = user.uid;
        const userRef = doc(db, "users", id);

        await updateDoc(userRef, {
            reviews_given : arrayRemove(
                {
                    movie_id: movieId,
                    review: reviewData.review,
                }
            )
        });
    }

    if (user != null && userRes != null && userRes.size > 0) {
        const id = user.uid;
        const userRef = collection(db, "users");
        const q = query(userRef, where("uid", "==", user.uid));

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data();
            const reviewsArray:any[] = userDoc["reviews_given"];

            for (let i = reviewsArray.length - 1; i >= 0; i--) {
                const item = reviewsArray[i];
                // console.log(item.movie_id);
                if (item.movie_id == movieId) {
                    reviewsArray.splice(i, 1);
                    break;
                }
            }

            // need find for same movie id
            // const newArray = oldArray.splice(0, oldArray.length - 1);
            
            const userRef = doc(db, "users", user.uid);

            await updateDoc(userRef, {reviews_given: reviewsArray})
        }

        // console.log(userRef);
    }
}