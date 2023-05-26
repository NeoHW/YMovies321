import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebase_app from "../firebase/config";
import { useState } from 'react';


export const signIn = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(firebase_app);
  const user = await signInWithPopup(auth, provider);
  return user;
};


