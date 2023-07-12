import { collection, getDocs, query, where } from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "./reauthenticateUser";

export async function findUser(user: User | undefined | null) {
    if (user != null && user != undefined) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        return querySnapshot;
    }
}
