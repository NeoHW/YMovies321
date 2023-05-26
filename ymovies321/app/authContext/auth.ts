import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebase_app from "../firebase/config";
import {useState} from 'react';


export const signIn = async () => {
  const provider = new GoogleAuthProvider();
    const auth = getAuth(firebase_app);
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
    return result;
};


