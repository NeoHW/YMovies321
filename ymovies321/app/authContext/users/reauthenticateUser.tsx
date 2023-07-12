import { getFirestore } from "firebase/firestore";
import firebase_app from "../../firebase/config";
import { signIn } from "../auth";
import { GoogleAuthProvider, reauthenticateWithCredential, User } from "firebase/auth";

export const db = getFirestore(firebase_app);

export async function reauthenticateUser(user: User) {
    const userCredential = await signIn();
    const authCredential = GoogleAuthProvider.credentialFromResult(userCredential);

    if (authCredential === null) {
        throw new Error("Reauthentication failed. Invalid credentials.");
    }

    reauthenticateWithCredential(user, authCredential).then(() => {
        console.log("user reauthenticated")
    }).catch((e) => {
        console.error("Error reauthenticating user: ",  e);
    });
}