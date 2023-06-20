import { doc, updateDoc, arrayUnion, Timestamp, query, where, collection, getDocs} from "firebase/firestore";
import { User } from "firebase/auth";
import { findUser } from "../users/findUser";
import { db } from "../users/reauthenticateUser";
import { signIn } from "../auth";
import getDocFromMovieDB from "../getDocfromMovieDB";
import { Box, Button, Typography } from "@mui/material";

// removes the most recent review for a particular movie
export default async function removeReviewFromMovieDB( user: User, movieId : string) {
    // getting data
    const data = await getDocFromMovieDB(movieId);
    const reviewsArray: any[] = data?.reviews;
    let newArray: any[] = reviewsArray;

    // console.log(reviewsArray);
    for (let i = reviewsArray.length - 1; i >= 0; i--) {
        const item = reviewsArray[i];
        console.log("item", item.uid);
        if (item.uid == user.uid) {
            reviewsArray.splice(i, 1);
            break;
        }
    }


    // const newArray = reviewsArray.slice(0, reviewsArray.length - 1);
    // console.log("newArray", newArray);

    const moviesRef = collection(db, "test_MoviesID_TMDB_database");
    const q = query(moviesRef, where("id", "==", movieId.toString()));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const movieRef = doc(db, "test_MoviesID_TMDB_database", movieId.toString());

        await updateDoc(movieRef, {reviews: reviewsArray});
    }

    return;
}


/*
<Button variant="contained" onClick={() => removeReviewFromMovieDB(movieId)}>
    remove review from DB
</Button>
*/