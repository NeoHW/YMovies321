"use client"
// firebase sdk
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import 'firebase/firestore';

import Image from 'next/image'
import firebase_app from './firebase/config';
import NavbarSignedOut from "./Navigation/NavbarSignedOut";
import NavbarSignedIn from "./Navigation/NavbarSignedIn";
import { useState } from "react";
import { signIn } from "./authContext/auth";



export default function Home() {
  
  {
  /* trying to move it to auth.ts
  const provider = new GoogleAuthProvider()
  const auth = getAuth(firebase_app);
  const signIn = async() => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  }
  */
  }

  {
    const [profile, setProfile] = useState(null);

    const handleSignIn = async () => {
      const user = await signIn();
      // Perform any additional actions after sign-in if needed
      console.log("signed in")
    
      // Pass the user data to somewhere
      setProfile(user.user.displayName);
    };
  
    return (
      <div>
          <div>
            {
            /* user ? <NavbarSignedIn /> : <NavbarSignedOut /> */
            }
            {
              // < NavbarSignedOut />
            }
          </div>
          <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={handleSignIn} // call signIn function on button click
                >
                  <span className="sr-only">Log In</span>
                  Log In 
                </button>
        <h1 className="text-3xl font-bold underline">Home Page</h1>
        <p>Username: {profile}</p>
      </div>
    );
  }
}
