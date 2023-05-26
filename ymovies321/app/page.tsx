"use client"
import 'firebase/firestore';

import Navbar from "./components/Navbar";
import { useState } from "react";
import { auth, signIn , signOut} from "./authContext/auth";
import Content from "./components/ContentLoggedIn";
import { UserCredential } from 'firebase/auth';
import ContentLoggedIn from './components/ContentLoggedIn';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home() {
  { 
    // profile is the state, useAuthState auto detects if person is logged in or out
    const [profile] = useAuthState(auth);
    console.log(profile);

    return (
      <div>
        <Navbar isSignedIn={profile ? true : false} profile={profile} handleSignIn={signIn} handleSignOut={signOut} />

        <h1 className="text-3xl font-bold underline">Home Page</h1>
        {profile
          ? (
            <div>
              <ContentLoggedIn profile={profile} />
            </div>
          )
          :
          (<p>LOGGED OUT</p>)
        }
          
      </div>
    );
  }
}
