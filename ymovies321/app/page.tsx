"use client"
import 'firebase/firestore';

import HomeNavbar from "./components/NavBars/HomeNavBar";
import MoviesScrollBars from "./components/MoviesScrollBars";
import { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signIn , signOut} from "./authContext/auth";
import Content from "./components/ContentLoggedIn";
import { UserCredential } from 'firebase/auth';
import ContentLoggedIn from './components/ContentLoggedIn';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Box, Typography } from "@mui/material";

export default function Page() {
  { 
    // user is the state, useAuthState auto detects if person is logged in or out
    const [user] = useAuthState(auth);
    console.log(user);

    return (
      <div>
        <HomeNavbar isSignedIn={user ? true : false} profile={user} handleSignIn={signIn} handleSignOut={signOut} />
        {user
          ? (
            <div>
              <ContentLoggedIn profile={user} />
            </div>
          )
          :
          <div></div>
        }

        <MoviesScrollBars />
      </div>
    );
  }
}
