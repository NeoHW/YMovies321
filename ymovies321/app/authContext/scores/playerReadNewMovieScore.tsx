import { findUser } from "../users/findUser";
import { User } from "firebase/auth";

export default async function playerReadNewMovieScore(user: User, movieId: number) {

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