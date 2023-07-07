import { doc, getDocs, setDoc, updateDoc, collection, query, where, increment } from "firebase/firestore";
import { findUser } from "../users/findUser";
import { db } from "../users/reauthenticateUser";
import { User } from "firebase/auth";



export default async function movieWriteNewScore(user: User, movieId: number, newScore: number) {
    const newRating: any = {};
    newRating[user.uid] = newScore;

    const moviesRef = collection(db, "test_MoviesID_TMDB_database");
    const q = query(moviesRef, where("id", "==", movieId.toString()));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const movieDocument = querySnapshot.docs[0].data();
        const movieRef = doc(db, "test_MoviesID_TMDB_database", movieId.toString());
        if (movieDocument["userScores"] == undefined) {
            await updateDoc(movieRef, {userScores: newRating});
        } else {
            const allRatings = movieDocument["userScores"];
            allRatings[user.uid] = newScore;
            await updateDoc(movieRef, {userScores: allRatings});
        }
        await updateDoc(movieRef, { vote_count: increment(1)});
        const updatedScore = (movieDocument["vote_average"] * movieDocument["vote_count"] + newScore) / (movieDocument["vote_count"] + 1)
        await updateDoc(movieRef, { vote_average: updatedScore});
    }
}