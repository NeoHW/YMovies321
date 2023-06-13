import { collection, doc, getDoc, getDocs, addDoc, setDoc, getFirestore, query, where, updateDoc } from "firebase/firestore";
import firebase_app from "../firebase/config";
import { auth } from "./auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@mui/material";

const db = getFirestore(firebase_app);


export async function addUserToDB(user) {
    if ((await findUser(user)).size == 0) {
        try {
            const docRef = await setDoc(doc(db, "users", user.email), {
                uid : user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                watchlist: [],
                // reviews: ,
            });
            // console.log("Document written with ID: ", docRef.id);
            console.log("added user with email " + user.email);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}

export async function findUser(user) {

    console.log("finding user");

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", user.uid));

    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot);
    // console.log("found user")
    return querySnapshot;
}

export async function isMovieInWatchlist(user, movieId) {
    const userRes = await findUser(user);

    if (userRes.size > 0) {
        let id = "";
        let array = [];
        userRes.forEach(doc => {
            id = doc.id;
            array = doc.data()["watchlist"];
            // console.log("JSON IS " + (doc.data()["email"]));
        })
        return array.includes(movieId);
    }
}

export async function addToWatchlist(user, movieId) {
    const userRes = await findUser(user);

    if (userRes.size > 0) {
        let id = "";
        let array = [];
        userRes.forEach(doc => {
            id = doc.id;
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

    // console.log("added to watchlist")
}

export async function removeFromWatchlist(user, movieId) {
    const userRes = await findUser(user);

    if (userRes.size > 0) {
        let id = "";
        let array = [];
        userRes.forEach(doc => {
            id = doc.id;
            array = doc.data()["watchlist"];
        })

        const userRef = doc(db, "users", id);
        if (array.includes(movieId)) {
            array = array.filter(id => id != movieId);
        }

        await updateDoc(userRef, {
            watchlist: array
        })
    }
    // console.log("removed from watchlist")
}

export async function getWatchlist(user) {
    const userRes = await findUser(user);

    if (userRes.size > 0) {
        let id = "";
        let array = [];
        userRes.forEach(doc => {
            id = doc.id;
            array = doc.data()["watchlist"];
        })

        console.log(array);
        return array;

    } else {
        return [];
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
        <Button onClick={() => getWatchlist(user)}>console log watchlist</Button>

    </div>)
}