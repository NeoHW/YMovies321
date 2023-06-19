import { doc, updateDoc, arrayUnion, Timestamp} from "firebase/firestore";
import { User } from "firebase/auth";
import { findUser } from "../users/findUser";
import { db } from "../users/reauthenticateUser";

export async function addReviewToMovieDB(user: User, movieId: string, review: string) {
    const userRes = await findUser(user);

    if (userRes != null && userRes.size > 0) {
        const uid = user.uid;
        const name = user.displayName;
        const userRef = doc(db, "test_MoviesID_TMDB_database", movieId);

        await updateDoc(userRef, {
            reviews : arrayUnion(
                {
                    uid: uid,
                    name: name,
                    review: review,
                    created: Timestamp.now(),
                }
            )
        });
    }
}
