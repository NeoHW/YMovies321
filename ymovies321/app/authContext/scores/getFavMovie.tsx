import { User } from "firebase/auth";
import { findUser } from "../users/findUser";
import { MovieScores } from "../../interfaces/MovieScores";

export default async function getFavMovie(user: User) {

    if (user) {
        const userRes = await findUser(user);

        if (userRes != null && userRes.size > 0) {
            let allRatings: MovieScores = {};
            userRes.forEach(doc => {
                allRatings = doc.data()["movieScores"];
            })

            if (allRatings != undefined) {
                let currentFavId: string = "-1";
                let currentMax: number = 0;

                for (const [currentId, score] of Object.entries(allRatings)) {
                    console.log("id", currentId, "score", score)
                    if ( score > currentMax) {
                        currentFavId = currentId;
                        currentMax = score
                    }
                }
                return currentFavId;
            }
        }
    }
    return "-1";
}