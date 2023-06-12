import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebase_app from "../firebase/config";
import { useState } from 'react';
import { addUserToDB, findUser } from "./userDatabase";
import { useAuthState } from "react-firebase-hooks/auth";



const provider = new GoogleAuthProvider();
export const auth = getAuth(firebase_app);

export const signIn = async () => {
  const user = await signInWithPopup(auth, provider);
  
  if (user) {
    addUserToDB(user.user);
  }

  return user;
};

export const signOut = async () => {
    auth.signOut();
};

