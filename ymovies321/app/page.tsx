"use client"
import 'firebase/firestore';

import Navbar from "./components/Navbar";
import { useState } from "react";
import { signIn } from "./authContext/auth";
import Content from "./components/ContentLoggedIn";
import { UserCredential } from 'firebase/auth';
import ContentLoggedIn from './components/ContentLoggedIn';



export default function Home() {
  {
    const [profile, setProfile] = useState<null | UserCredential>(null);;

    const handleSignIn = async () => {
      const user = await signIn();
      // Pass the user data
      console.log(user);
      setProfile(user);
    };

    // Handle the signing out of user.
    const handleSignOut = async () => {
      setProfile(null);
    }

    return (
      <div>
        <Navbar isSignedIn={profile == null ? false : true} profile={profile} handleSignIn={handleSignIn} handleSignOut={handleSignOut} />

        <h1 className="text-3xl font-bold underline">Home Page</h1>
        {profile == null
          ? (<p>LOGGED OUT</p>)
          : (
            <div>
              <ContentLoggedIn profile={profile} />
            </div>
          )}
      </div>
    );
  }
}
