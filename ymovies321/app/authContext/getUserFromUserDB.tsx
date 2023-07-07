import { doc, getDoc } from "firebase/firestore";
import { db } from "./users/reauthenticateUser";

export default async function getUserFromMovieDB(uid : string) {
    // getting data
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    }

    return docSnap.data();
}