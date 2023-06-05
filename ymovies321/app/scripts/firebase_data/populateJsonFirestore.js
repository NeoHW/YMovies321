// firebase allows 20k writes/day, 50k reads/day
// maybe we trim it to top 20k movies?

import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { createReadStream } from "fs";
import readline from "readline";

// !! IMPORTANT: Remember to Set the environment variable GOOGLE_APPLICATION_CREDENTIALS to the path of the JSON file that contains your service account key. This variable only applies to your current shell session, so if you open a new session, set the variable again.
// proj account: 
// export GOOGLE_APPLICATION_CREDENTIALS="/Users/haowei/NUS/Orbital/orbital-ymovies321-firebase-service-account-file.json"

// test account:
// export GOOGLE_APPLICATION_CREDENTIALS="/Users/haowei/NUS/Orbital/orbtial-test-firebase-service-account-file.json"


// Initialise Firestore and get a reference to the database
initializeApp({
  credential: applicationDefault(),
  // databaseURL: 'https://orbital-ymovies321.firebaseio.com'
  databaseURL: 'https://orbital-test.firebaseio.com'
});

const db = getFirestore();

// Adding data from the JSON file
async function exportData() {
  // Read the downloaded file line by line
  const lineReader = readline.createInterface({
    input: createReadStream("./movie_ids_trimmed.json"),
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
          name: movieTitle,
          averageReviewRating: 0,
          numReviews: 0
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

// exportData();

// to use API to fetch using movieID
async function fetchOtherDetailsByAPI(movieId) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDI1NmMyZWVjNzhmNzk0OTg1ZWQwYjdjMzVjY2JiMCIsInN1YiI6IjY0NzFjZDM3YTE5OWE2MDExNmM2ZDk1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MjVdbubEYW3r_vtxBOcq4zxOo6lteIShmCykxu1m8co'
    }
  };
  
  return fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=images&language=en-US&include_image_language=en,null`, options)
    .then(response => response.json())
}

// trying to check if data exists
async function getData() {
  const docRef = db.collection('MoviesID_TMDB_database').doc("10003");
  const doc = await docRef.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    console.log('Document data:', doc.data());
  }
}

// getData();