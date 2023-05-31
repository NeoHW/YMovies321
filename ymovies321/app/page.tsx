"use client"
import 'firebase/firestore';

import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import { useState } from "react";
import { auth, signIn , signOut} from "./authContext/auth";
import Content from "./components/ContentLoggedIn";
import { UserCredential } from 'firebase/auth';
import ContentLoggedIn from './components/ContentLoggedIn';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home() {
  { 
    // user is the state, useAuthState auto detects if person is logged in or out
    const [user] = useAuthState(auth);
    console.log(user);

    return (
      <div>
        <Navbar isSignedIn={user ? true : false} profile={user} handleSignIn={signIn} handleSignOut={signOut} />

        <h1 className="text-3xl font-bold underline">Home Page</h1>
        {user
          ? (
            <div>
              <ContentLoggedIn profile={user} />
            </div>
          )
          :
          (<p>LOGGED OUT</p>)
        }

        <Movies />
      </div>
    );
  }
}
