import { doc, updateDoc, arrayUnion, arrayRemove, Timestamp} from "firebase/firestore";
import { User } from "firebase/auth";
import { findUser } from "../users/findUser";
import { db } from "../users/reauthenticateUser";

export default async function removeReviewFromMovieDB(user: User, movieId: string, reviewData: any) {
    const userRes = await findUser(user);
    console.log(user);
    console.log(userRes);
    if (userRes != null && userRes.size > 0) {
        const userRef = doc(db, "test_MoviesID_TMDB_database", movieId);

        await updateDoc(userRef, {
            reviews : arrayRemove(
                {
                    uid: reviewData.uid,
                    name: reviewData.name,
                    photoURL: reviewData.photoURL,
                    review: reviewData.review,
                    created: reviewData.created,
                }
            )
        });
    }
}
