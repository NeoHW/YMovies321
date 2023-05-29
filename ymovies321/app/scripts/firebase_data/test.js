// testing of adding data to firebase (works!)

import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

// !! IMPORTANT: Remember to Set the environment variable GOOGLE_APPLICATION_CREDENTIALS to the path of the JSON file that contains your service account key. This variable only applies to your current shell session, so if you open a new session, set the variable again.
// export GOOGLE_APPLICATION_CREDENTIALS="/Users/haowei/NUS/Orbital/firebase-service-account-file.json"

// Initialise Firestore and get a reference to the database
initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://orbital-9ada9.firebaseio.com'
});

const db = getFirestore();

const docRef = db.collection('users').doc('alovelace');

await docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});

