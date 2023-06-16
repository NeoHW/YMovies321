import { doc, updateDoc, arrayUnion, Timestamp} from "firebase/firestore";
import { User } from "firebase/auth";
import { findUser } from "../findUser";
import { db } from "../reauthenticateUser";
import { signIn } from "../auth";
import getDocFromMovieDB from "../getDocfromMovieDB";

export default async function removeReviewFromUserDB(movieId : string) {
    // getting data
    const data = getDocFromMovieDB(movieId);
    
}