import firebase_app from "../firebase/config.js";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import { createReadStream } from "fs";
import readline from "readline";

// Initialise Firestore and get a reference to the database
const db = getFirestore(firebase_app);
const moviesID_ref = collection(db, "MoviesID_TMDB_database");

async function loadData() {

  // Read the downloaded file line by line
  /*const lineReader = readline.createInterface({
    input: createReadStream("./movie_ids.json"),
  });
*/
  // Process each line (JSON object) and store the movie ID in the database
  //lineReader.on("line", async (line) => {
  //  const movieData = JSON.parse(line);
    //const movieId = movieData.id.toString(); // as document ID in firebase has to be string
    //const movieTitle = movieData.original_title;
    const movieId = "3924";
    const movieTitle = "blondie"
    // console.log(movieId);

    // Store the movie ID in the Firestore database
    await setDoc(doc(moviesID_ref, movieId), {
      id: movieId,
      name: movieTitle
    })
  };
/*
  lineReader.on("close", () => {
    console.log("Data import completed.");
  });
}
*/
loadData();