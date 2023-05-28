// shows trending movies + searchbar(?)
import firebase_app from "../firebase/config";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import React, { useEffect } from "react";

// initialise cloud firestone and get ref to service
const db = getFirestore(firebase_app);

// https://firebase.google.com/docs/firestore/manage-data/add-data
async function addData() {    
    // "cities" is the new collection's name
    const moviesID_ref = collection(db, "MoviesID_TMDB_database");

    // adding separate documents into the collection 
    //await setDoc(doc(moviesID_ref, "1"), {
    //    name: "movie_test",
    //    id: 1});

    const movieId = "3924";
    const movieTitle = "blondie"
    // console.log(movieId);

    // Store the movie ID in the Firestore database
    await setDoc(doc(moviesID_ref, movieId), {
        id: movieId,
        name: movieTitle
    })
}

// https://firebase.google.com/docs/firestore/query-data/get-data
async function fetchData() {
    // getting data
    const docRef = doc(db, "MoviesDB", "Sherlock Holmes");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    }
}


function Movies() {
    // testing out fetchData & addData from database function (it works!)
    addData();
    fetchData();
    
    // return jsx
    return (
        <div>
            movies will be shown here
        </div>
    )
};

export default Movies;