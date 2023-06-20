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

    return;
}