import { doc, getDocs, setDoc, updateDoc, collection, query, where } from "firebase/firestore";
import { findUser } from "./findUser";
import { db } from "./reauthenticateUser";



export default async function movieWriteNewScore(user, movieId: number, newScore: number) {
    const uid = user.uid;

    const moviesRef = collection(db, "test_MoviesID_TMDB_database");
    const q = query(moviesRef, where("id", "==", movieId.toString()));
    let allRatings = {};

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const movieDocument = querySnapshot.docs[0];
        console.log(movieDocument.data())
        allRatings = movieDocument.userScores;

        // allRatings[uid] = newScore;

        // const movieRef = doc(db, "test_MoviesID_TMDB_database", movieDocument.id);
        // await updateDoc(userRef, {
        //     userScores: allRatings
        // })
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