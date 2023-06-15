import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { User } from "firebase/auth";
import { findUser } from "./findUser";
import { db } from "./reauthenticateUser";
import { signIn } from "./auth";

export async function addReviewToMovieDB(user: User, movieId: string, review: string) {
    const userRes = await findUser(user);

    if (userRes == null) {
        signIn();
    }

    if (userRes != null && userRes.size > 0) {
        const uid = user.uid;
        const userRef = doc(db, "test_MoviesID_TMDB_database", movieId);

        await updateDoc(userRef, {
            reviews : arrayUnion(
                {
                    uid: uid,
                    review: review,
                }
            )
        });
    }
}
