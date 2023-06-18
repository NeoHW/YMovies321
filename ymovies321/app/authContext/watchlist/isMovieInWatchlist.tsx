import { User } from "firebase/auth";
import { findUser } from "../users/findUser";


export async function isMovieInWatchlist(user: User, movieId: string) {
    const userRes = await findUser(user);

    if (userRes != null && userRes.size > 0) {
        // console.log("id is " + id);
        let array: string[] = [];
        userRes.forEach(doc => {
            array = doc.data()["watchlist"];
            // console.log("watchlist is " + (doc.data()["watchlist"]));
            // console.log("email is " + (doc.data()["email"]));
        });
        return array.includes(movieId);
    }

}
