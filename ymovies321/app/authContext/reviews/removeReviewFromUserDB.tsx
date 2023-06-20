import { doc, updateDoc, arrayUnion, Timestamp, query, where, collection, getDocs} from "firebase/firestore";
import { User } from "firebase/auth";
import { findUser } from "../users/findUser";
import { db } from "../users/reauthenticateUser";
import { signIn } from "../auth";
import getDocFromMovieDB from "../getDocfromMovieDB";

// removes the most recent review for a particular movie
export default async function removeReviewFromUserDB(user: User | null | undefined, movieId : string) {
    const userRes = await findUser(user);

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