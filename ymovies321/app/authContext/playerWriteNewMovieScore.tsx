import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./auth";
import { findUser } from "./users/findUser";
import { db } from "./reauthenticateUser";



export default async function playerWriteNewMovieScore(user, movieId: number, newScore: number) {
    // const [user] = useAuthState(auth);

    if (user) {
        const userRes = await findUser(user);

        if (userRes != null && userRes.size > 0) {
            const id = user?.uid;
            let allRatings = {};
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