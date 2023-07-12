import { doc, updateDoc } from "firebase/firestore";
import { findUser } from "../users/findUser";
import { db } from "../users/reauthenticateUser";
import { User } from "firebase/auth";

export default async function playerWriteNewMovieScore(user: User, movieId: number, newScore: number) {

    if (user) {
        const userRes = await findUser(user);

        if (userRes != null && userRes.size > 0) {
            const id = user?.uid;
            let allRatings;
            userRes.forEach(doc => {
                allRatings = doc.data()["movieScores"];

                allRatings[movieId] = newScore;
            })

            const userRef = doc(db, "users", id);
            await updateDoc(userRef, {
                movieScores: allRatings
            });
        }
    }
}