"use client"
import 'firebase/firestore';

import Navbar from "./components/Navbar";
import MoviesScrollBars from "./components/MoviesScrollBars";
import { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signIn , signOut} from "./authContext/auth";
import { UserCredential } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Box, Typography } from "@mui/material";
import UserDatabase from "./authContext/users/reauthenticateUser";


export default function Page() {
  { 
    // user is the state, useAuthState auto detects if person is logged in or out
    const [user] = useAuthState(auth);
    console.log(user);

    return (
      <div>
         { /* <UserDatabase /> */}
        <Navbar isSignedIn={user ? true : false} profile={user} nav="Home" />
        <MoviesScrollBars />
      </div>
    );
  }
}
