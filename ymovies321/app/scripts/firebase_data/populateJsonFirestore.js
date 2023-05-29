import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { createReadStream } from "fs";
import readline from "readline";

// !! IMPORTANT: Remember to Set the environment variable GOOGLE_APPLICATION_CREDENTIALS to the path of the JSON file that contains your service account key. This variable only applies to your current shell session, so if you open a new session, set the variable again.
// export GOOGLE_APPLICATION_CREDENTIALS="/Users/haowei/NUS/Orbital/firebase-service-account-file.json"

// Initialise Firestore and get a reference to the database
initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://orbital-9ada9.firebaseio.com'
});

const db = getFirestore();

// Adding data from the JSON file
async function exportData() {
  // Read the downloaded file line by line
  const lineReader = readline.createInterface({
    input: createReadStream("./movie_ids.json"),
  });

  // Process each line (JSON object) and store the movie ID in the database
  lineReader.on("line", async (line) => {
    const movieData = JSON.parse(line);
    const movieId = movieData.id.toString(); // Convert to string as document ID in Firestore
    const movieTitle = movieData.original_title;

    const docRef = db.collection('MoviesID_TMDB_database').doc(movieId);

    try {
      await db.runTransaction(async (transaction) => {
        // Retry the operation in case of failures
        return transaction.set(docRef, {
          id: movieId,
          name: movieTitle
        });
      });

      console.log(`Movie ID ${movieId} added to Firestore.`);
    } catch (error) {
      console.error(`Failed to add Movie ID ${movieId} to Firestore:`, error);
    }
  });

  lineReader.on("close", () => {
    console.log("Data import completed.");
  });
}

exportData();