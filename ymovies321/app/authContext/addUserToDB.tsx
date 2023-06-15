import { doc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "./reauthenticateUser";
import { findUser } from "./findUser";



export async function addUserToDB(user: User) {
    const userRes = await findUser(user);
    if (userRes != null && userRes.size == 0) {
        try {
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                watchlist: [],
            });
            console.log("added user with uid & email " + user.uid + user.email);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}
