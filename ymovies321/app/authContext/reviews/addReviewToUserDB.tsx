import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { User } from "firebase/auth";
import { findUser } from "../findUser";
import { db } from "../reauthenticateUser";
import { signIn } from "../auth";

export async function addReviewToUserDB(user: User, movieId: string, review: string) {
    const userRes = await findUser(user);

    if (userRes == null) {
        signIn();
    }

    if (userRes != null && userRes.size > 0) {
        const id = user.uid;
        const userRef = doc(db, "users", id);

        await updateDoc(userRef, {
            reviews_given : arrayUnion(
                {
                    movie_id: movieId,
                    review: review,
                }
            )
        });
    }
}