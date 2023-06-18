import { doc, updateDoc, arrayUnion, Timestamp} from "firebase/firestore";
import { User } from "firebase/auth";
import { findUser } from "../users/findUser";
import { db } from "../reauthenticateUser";
import { signIn } from "../auth";
import getDocFromMovieDB from "../getDocfromMovieDB";
import { Box, Button, Typography } from "@mui/material";

export default async function removeReviewFromMovieDB( user: User | null | undefined, movieId : string | null ) {
    // getting data
    const data = await getDocFromMovieDB(movieId);
    const reviewsArray = data.reviews;
    console.log(reviewsArray);

    return;
}


/*
<Button variant="contained" onClick={() => removeReviewFromMovieDB(movieId)}>
    remove review from DB
</Button>
*/