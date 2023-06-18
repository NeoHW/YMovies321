import { doc, getDocs, setDoc, updateDoc, collection, query, where } from "firebase/firestore";
import { findUser } from "./users/findUser";
import { db } from "./reauthenticateUser";



export default async function movieWriteNewScore(user, movieId: number, newScore: number) {
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
    }

    // if (user) {
    //     const userRes = await findUser(user);

    //     if (userRes != null && userRes.size > 0) {
    //         const id = user?.uid;
    //         let allRatings = {};
    //         userRes.forEach(doc => {
    //             allRatings = doc.data()["movieScores"];

    //             console.log(allRatings);
    //             allRatings[movieId] = newScore;
    //         })

    //         const userRef = doc(db, "users", id);
    //         await updateDoc(userRef, {
    //             movieScores: allRatings
    //         });

    //     }
    // }

}