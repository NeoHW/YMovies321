import { doc, updateDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { findUser } from "./findUser";
import { db } from "./reauthenticateUser";


export async function removeFromWatchlist(user: User, movieId: string) {
    const userRes = await findUser(user);

    if (userRes != null && userRes.size > 0) {
        const id = user.uid;
        let array: string[] = [];
        userRes.forEach(doc => {
            array = doc.data()["watchlist"];
        });

        if (array.includes(movieId)) {
            array = array.filter(id => id != movieId);
        }

        const userRef = doc(db, "users", id);
        await updateDoc(userRef, {
            watchlist: array
        });
    }
}
