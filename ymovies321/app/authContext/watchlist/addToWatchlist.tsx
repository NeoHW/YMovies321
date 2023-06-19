import { doc, updateDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { findUser } from "../users/findUser";
import { db } from "../users/reauthenticateUser";


export async function addToWatchlist(user: User, movieId: string) {
    const userRes = await findUser(user);

    if (userRes != null && userRes.size > 0) {
        const id = user.uid;
        let array: string[] = [];
        userRes.forEach(doc => {
            array = doc.data()["watchlist"];
            // console.log("JSON IS " + (doc.data()["email"]));
        });
        const userRef = doc(db, "users", id);
        if (!array.includes(movieId)) {
            array.push(movieId);
        }
        await updateDoc(userRef, {
            watchlist: array
        });
    }
}
