import { doc, getDoc } from "firebase/firestore";
import { db } from "./users/reauthenticateUser";

export default async function getDocFromMovieDB(movieId : string) {
    const docRef = doc(db, "test_MoviesID_TMDB_database", movieId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}