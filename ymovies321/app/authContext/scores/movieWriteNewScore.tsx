import { doc, getDocs, updateDoc, collection, query, where, increment } from "firebase/firestore";
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
            console.log("doing creation of userScores");
            await updateDoc(movieRef, {userScores: newRating});
            await updateDoc(movieRef, {vote_count: increment(1)});
            const updatedScore = (movieDocument["vote_average"] * movieDocument["vote_count"] + newScore) / (movieDocument["vote_count"] + 1)
            await updateDoc(movieRef, {vote_average: updatedScore});
        } else {
            const allRatings = movieDocument["userScores"];
            console.log(user.uid);
            console.log(allRatings);
            const oldScore = allRatings[user.uid];

            if (allRatings[user.uid] === undefined) {
                // if it is a new review for the movie
                console.log("doing new review");
                allRatings[user.uid] = newScore;
                await updateDoc(movieRef, {userScores: newRating});
                await updateDoc(movieRef, {vote_count: increment(1)});
                const updatedScore = (movieDocument["vote_average"] * movieDocument["vote_count"] + newScore) / (movieDocument["vote_count"] + 1)
                await updateDoc(movieRef, {vote_average: updatedScore});
            } else {
                // if it is overwriting an existing review
                console.log("doing overwriting");
                allRatings[user.uid] = newScore;
                await updateDoc(movieRef, {userScores: allRatings});
                const updatedScore = (movieDocument["vote_average"] * movieDocument["vote_count"] - oldScore + newScore) / (movieDocument["vote_count"])
                await updateDoc(movieRef, {vote_average: updatedScore});
            }
        }
        
    }
}