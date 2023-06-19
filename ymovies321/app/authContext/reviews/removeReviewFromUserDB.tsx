import { doc, updateDoc, arrayUnion, Timestamp} from "firebase/firestore";
import { User } from "firebase/auth";
import { findUser } from "../users/findUser";
import { db } from "../users/reauthenticateUser";
import { signIn } from "../auth";
import getDocFromMovieDB from "../getDocfromMovieDB";

export default async function removeReviewFromUserDB(movieId : string) {
    // getting data
    const data = getDocFromMovieDB(movieId);
    
}