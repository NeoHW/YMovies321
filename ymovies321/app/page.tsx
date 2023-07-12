"use client"
import 'firebase/firestore';
import Navbar from "./components/Navbar";
import MoviesScrollBars from "./components/MoviesScrollBars";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./authContext/auth";


export default function Page() {
    const [user] = useAuthState(auth);

    return (
      <div>
        <Navbar isSignedIn={user ? true : false} profile={user} nav="Home" />
        <MoviesScrollBars />
      </div>
    );
}