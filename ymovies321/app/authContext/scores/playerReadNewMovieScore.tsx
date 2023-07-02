import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth";
import { findUser } from "../users/findUser";
import { db } from "../users/reauthenticateUser";
import { User } from "firebase/auth";



export default async function playerReadNewMovieScore(user: User, movieId: number) {
    // const [user] = useAuthState(auth);

    if (user) {
        const userRes = await findUser(user);

        if (userRes != null && userRes.size > 0) {
            let allRatings;
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