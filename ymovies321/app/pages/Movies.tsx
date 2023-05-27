// shows trending movies + searchbar(?)
import firebase_app from "../firebase/config";
import { doc, getDoc, getFirestore } from "firebase/firestore";


async function fetchData() {
    // initialise cloud firestone and get ref to service
    const db = getFirestore(firebase_app);

    // getting data
    const docRef = doc(db, "MoviesDB", "Sherlock Holmes");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    }
}

function Movies() {
    // testing out fetchData from database function (it works!)
    fetchData();
    
    // return jsx
    return (
        <div>
            movies will be shown here
        </div>
    )
};

export default Movies;