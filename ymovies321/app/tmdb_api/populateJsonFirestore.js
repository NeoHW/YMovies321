import firebase_app from "../firebase/config.js";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import { createReadStream } from "fs";
import readline from "readline";

// Initialise Firestore and get a reference to the database
const db = getFirestore(firebase_app);

async function loadData() {
  // "moviesID_TMDB_database" is the new collection's name
  const moviesID_ref = collection(db, "MoviesID_TMDB_database");

  // Read the downloaded file line by line
  const lineReader = readline.createInterface({
    input: createReadStream("./movie_ids.json"),
  });

  // Process each line (JSON object) and store the movie ID in the database
  lineReader.on("line", (line) => {
    const movieData = JSON.parse(line);
    const movieId = movieData.id;
    const movieTitle = movieData.original_title;

    console.log("ID:", movieId);
    console.log("Title:", movieTitle);

    // Store the movie ID in the Firestore database
    setDoc(doc(moviesID_ref, movieId), {
      title: movieTitle,
      id: movieId
    })
      .then(() => {
        console.log("Document added:", documentRef.id);
      })
      .catch((error) => {
        console.error("Error adding document:", error);
      });  
  });

  lineReader.on("close", () => {
    console.log("Data import completed.");
  });
}

loadData();



