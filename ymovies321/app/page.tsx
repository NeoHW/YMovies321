"use client"
// firebase sdk
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import 'firebase/firestore';

import Image from 'next/image'
import firebase_app from './firebase/config';
import Navbar from "./components/Navbar";
import { useState } from "react";
import { signIn } from "./authContext/auth";
import Content from "./components/Content";



export default function Home() {

  {
    const [profile, setProfile] = useState(null);

    const handleSignIn = async () => {
      const user = await signIn();
      // Perform any additional actions after sign-in if needed
      console.log("signed in")

      // Pass the user data to somewhere
      setProfile(user);
    };

    const handleSignOut = async () => {
      setProfile(null);
    }

    return (
      <div>
        <div>
          {
            /* user ? <NavbarSignedIn /> : <NavbarSignedOut /> */
          }
          {
            <div>
            </div>
          }
        </div>

        {profile == null ? (
          <Navbar isSignedIn={false} user={profile} handleSignIn={handleSignIn} handleSignOut={handleSignOut} />
        )
          : (
            <Navbar isSignedIn={true} user={profile} handleSignIn={handleSignIn} handleSignOut={handleSignOut} />
          )}


        <h1 className="text-3xl font-bold underline">Home Page</h1>
        { profile == null
        ? (<p>LOGGED OUT</p>) 
        : (
          <div>
        <Content profile = {profile} />
        </div>
        )}
      </div>
    );
  }
}
