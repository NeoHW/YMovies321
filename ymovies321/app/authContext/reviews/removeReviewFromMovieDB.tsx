import { doc, updateDoc, arrayUnion, Timestamp, query, where, collection, getDocs} from "firebase/firestore";
import { User } from "firebase/auth";
import { findUser } from "../users/findUser";
import { db } from "../users/reauthenticateUser";
import { signIn } from "../auth";
import getDocFromMovieDB from "../getDocfromMovieDB";
import { Box, Button, Typography } from "@mui/material";

export default async function removeReviewFromMovieDB( user: User | null | undefined, movieId : string) {
    // getting data
    const data = await getDocFromMovieDB(movieId);
    const reviewsArray = data?.reviews;
    // console.log(reviewsArray);

    const newArray = reviewsArray.slice(0, reviewsArray.length - 1);
    // console.log("newArray", newArray);

    const moviesRef = collection(db, "test_MoviesID_TMDB_database");
    const q = query(moviesRef, where("id", "==", movieId.toString()));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const movieRef = doc(db, "test_MoviesID_TMDB_database", movieId.toString());

        await updateDoc(movieRef, {reviews: newArray});
    }

    return;
}


/*
<Button variant="contained" onClick={() => removeReviewFromMovieDB(movieId)}>
    remove review from DB
</Button>
*/