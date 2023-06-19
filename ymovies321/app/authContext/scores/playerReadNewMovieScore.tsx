import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth";
import { findUser } from "../users/findUser";
import { db } from "../users/reauthenticateUser";



export default async function playerReadNewMovieScore(user, movieId: number) {
    // const [user] = useAuthState(auth);

    if (user) {
        const userRes = await findUser(user);

        if (userRes != null && userRes.size > 0) {
            const id = user?.uid;
            let allRatings = {};
            userRes.forEach(doc => {
                allRatings = doc.data()["movieScores"];
                if (allRatings[movieId]) {
                    return allRatings[movieId];
                }
            })
        }
        return 0;
    }

}