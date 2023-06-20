import { doc, getDoc } from "firebase/firestore";
import { db } from "./users/reauthenticateUser";

export default async function getDocFromMovieDB(movieId : string) {
    // getting data
    const docRef = doc(db, "test_MoviesID_TMDB_database", movieId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    }

    return docSnap.data();
}