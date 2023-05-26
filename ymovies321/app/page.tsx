"use client"
import 'firebase/firestore';

import Navbar from "./components/Navbar";
import { useState } from "react";
import { signIn } from "./authContext/auth";
import Content from "./components/Content";
import { UserCredential } from 'firebase/auth';



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

        {// Display different navbars based on sign in status
        profile == null ? (
          <Navbar isSignedIn={false} profile={profile} handleSignIn={handleSignIn} handleSignOut={handleSignOut} />
        )
          : (
            <Navbar isSignedIn={true} profile={profile} handleSignIn={handleSignIn} handleSignOut={handleSignOut} />
          )}


        <h1 className="text-3xl font-bold underline">Home Page</h1>
        {profile == null
          ? (<p>LOGGED OUT</p>)
          : (
            <div>
              <Content profile={profile} />
            </div>
          )}
      </div>
    );
  }
}
