// firebase sdk
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import 'firebase/firestore';

import Image from 'next/image'
import firebase_app from './firebase/config';
import NavbarSignedOut from "./Navigation/NavbarSignedOut";
import NavbarSignedIn from "./Navigation/NavbarSignedIn";


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
  
  return (
    <div>
        <div>
          {/* user ? <NavbarSignedIn /> : <NavbarSignedOut /> */}
          < NavbarSignedOut />
        </div>
      <h1 className="text-3xl font-bold underline">Home Page</h1>
      <p>Some content</p>
    </div>
  );
}
