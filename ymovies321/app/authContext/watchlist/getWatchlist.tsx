import { User } from "firebase/auth";
import { findUser } from "../users/findUser";


export async function getWatchlist(user: User) {
    const userRes = await findUser(user);

    if (userRes != null && userRes.size > 0) {
        let array: string[] = [];
        userRes.forEach(doc => {
            array = doc.data()["watchlist"];
        });
        return array;
    } else {
        return null;
    }
}
