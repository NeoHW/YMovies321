import { getDoc, addDoc, getFirestore } from "firebase/firestore";
import firebase_app from "../firebase/config";
import { auth, signIn} from "./auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, reauthenticateWithCredential, User } from "firebase/auth";
import { Button } from "@mui/material";
import { getWatchlist } from "./getWatchlist";
import { addUserToDB } from "./addUserToDB";
import { deleteUserFromDB } from "./deleteUserFromDB";
import { findUser } from "./findUser";
import { addToWatchlist } from "./addToWatchlist";
import { isMovieInWatchlist } from "./isMovieInWatchlist";
import { removeFromWatchlist } from "./removeFromWatchlist";

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

// TEST COMPONENT
export default function UserDatabase() {
    const [user] = useAuthState(auth);

    return (<div>
        <Button
            variant="contained"
            onClick={() => {
                addUserToDB(user);
            }}> add user
        </Button>
        <Button
            variant="contained"
            onClick={() => {
                findUser(user);
            }}>
            find user
        </Button>
        <Button
            variant="contained"
            onClick={() => {
                addToWatchlist(user, "6969")
            }}
        >
            add to watch list
        </Button>
        <Button
            variant="contained"
            onClick={() => {
                removeFromWatchlist(user, "6969")
            }}
        > remove from watchlist
        </Button>
        <Button
            onClick={() => {
                isMovieInWatchlist(user, "6969").then(e => console.log(e))
                isMovieInWatchlist(user, "385687").then(e => console.log(e))
            }}
        >
            in watchlist?
        </Button>
        <div>
            <Button onClick={() => getWatchlist(user)}>console log watchlist</Button>
            <Button variant="contained" onClick={() => deleteUserFromDB(user)}>delete current user</Button>
        </div>

    </div>)
}