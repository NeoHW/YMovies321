import { collection, doc, getDoc, getDocs, addDoc, setDoc, getFirestore, query, where, updateDoc } from "firebase/firestore";
import firebase_app from "../firebase/config";
import { auth, signIn, signOut} from "./auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, deleteUser, reauthenticateWithCredential } from "firebase/auth";
import { Button } from "@mui/material";

const db = getFirestore(firebase_app);


export async function addUserToDB(user) {
    if ((await findUser(user)).size == 0) {
        try {
            const docRef = await setDoc(doc(db, "users", user.uid), {
                uid : user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                watchlist: [],
                // map : movie id & score
            });
            console.log("added user with uid & email " + user.uid + user.email);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}

export async function reauthenticateUser(user) {
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

// note that after deleting a user, users data will still be shown in firestore
// only after a new login, then data will be updated to a new blank state user
export async function deleteUserFromDB(user) {
    await reauthenticateUser(user);

    deleteUser(user).then(() => {
        console.log("user deleted")
        signOut();
    }).catch((e) => {
        console.error("Error deleting user: ",  e);
    });
}

export async function findUser(user) {

    console.log("finding user");

    const usersRef = collection(db, "users");
    console.log("user.uid = " , user.uid);
    const q = query(usersRef, where("uid", "==", user.uid));

    const querySnapshot = await getDocs(q);
    
    // console.log(querySnapshot);
    // console.log(querySnapshot.docs);
    // console.log("found user")
    
    return querySnapshot;
}

export async function isMovieInWatchlist(user, movieId) {
    const userRes = await findUser(user);

    if (userRes.size > 0) {
        // console.log("id is " + id);
        const id = user.uid;
        let array = [];
        userRes.forEach(doc => {
            array = doc.data()["watchlist"];
            // console.log("watchlist is " + (doc.data()["watchlist"]));
            // console.log("email is " + (doc.data()["email"]));
        })
        return array.includes(movieId);
    }
}

export async function addToWatchlist(user, movieId) {
    const userRes = await findUser(user);

    if (userRes.size > 0) {
        const id = user.uid;
        let array = [];
        userRes.forEach(doc => {
            array = doc.data()["watchlist"];
            // console.log("JSON IS " + (doc.data()["email"]));
        })
        const userRef = doc(db, "users", id);
        if (!array.includes(movieId)) {
            array.push(movieId);
        }
        await updateDoc(userRef, {
            watchlist: array
        })
    }
}

export async function removeFromWatchlist(user, movieId) {
    const userRes = await findUser(user);

    if (userRes.size > 0) {
        const id = user.uid;
        let array = [];
        userRes.forEach(doc => {
            array = doc.data()["watchlist"];
        })

        if (array.includes(movieId)) {
            array = array.filter(id => id != movieId);
        }
        
        const userRef = doc(db, "users", id);
        await updateDoc(userRef, {
            watchlist: array
        })
    }
}

export async function getWatchlist(user) {
    const userRes = await findUser(user);

    if (userRes.size > 0) {
        const id = user.uid;
        let array = [];
        userRes.forEach(doc => {
            array = doc.data()["watchlist"];
        })
        console.log(array);
        return array;
    } else {
        return null;
    }
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