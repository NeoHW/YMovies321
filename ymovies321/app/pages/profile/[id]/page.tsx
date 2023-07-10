'use client'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../../authContext/auth"
import Navbar from '../../../components/Navbar';
import { Box, Grid, Button, Typography, Avatar } from '@mui/material';
import { deleteUserFromDB } from "../../../authContext/users/deleteUserFromDB";

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
            <Navbar isSignedIn={true} profile={user} nav={null}></Navbar>
            <Box sx={{ p: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Avatar src={user.photoURL} alt="Profile Image" sx={{ width: 100, height: 100 }} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">{user.displayName}</Typography>
                        <Typography variant="subtitle1" color="text.secondary">{user.email}</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ p: 3 }}>
                <Button variant="contained" onClick={handleDeleteAccount}>
                    Delete Account
                </Button>
            </Box>
        </div>
    ) : <div></div>;
}