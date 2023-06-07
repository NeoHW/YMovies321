'use client'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../../authContext/auth"
import Navbar from '../../../components/Navbar';

export default function Page() {
    const [user] = useAuthState(auth);
    return (
        <div>
            <Navbar isSignedIn={true} profile={user} nav={null} ></Navbar>
            <h1>My Profile</h1>
            <div>{user?.displayName}</div>
            <img src={user?.photoURL}></img>
        </div>
    );
}