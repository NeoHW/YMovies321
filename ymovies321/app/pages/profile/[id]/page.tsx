'use client'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../../authContext/auth"
import Navbar from '../../../components/Navbar';
import { Box, Grid, Button, Typography, Avatar } from '@mui/material';
import { deleteUserFromDB } from "../../../authContext/users/deleteUserFromDB";
import UserProfileInfo from '../../../components/UserProfileInfo';

export default function ProfilePage() {
    const [user] = useAuthState(auth);
    
    const handleDeleteAccount = async () => {
        if (user) {
            await deleteUserFromDB(user); // delete the user
        }
        window.location.href = "/";
    };

    return user ? (
        <div>
            <Navbar isSignedIn={true} profile={user} nav={null} />
            
            <Box sx={{ p: 3 }}>
                <div className="flex items-center space-x-4">
                    <Avatar src={user.photoURL} alt="Profile Image" sx={{ width: 100, height: 100 }} />
                    <div className="font-medium dark:text-white">
                        <div> {user.displayName} </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400"> {user.email} </div>
                    </div>
                </div>
            </Box>

            <Box sx={{ p: 3, my:0 }}>
                <UserProfileInfo user={user} />
            </Box>

            <Box sx={{ p: 3 }}>
                <button type="button" onClick={handleDeleteAccount} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Delete Account
                </button>
            </Box>
        </div>
    ) : <div></div>;
}