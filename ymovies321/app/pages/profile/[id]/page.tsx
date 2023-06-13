'use client'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../../authContext/auth"
import Navbar from '../../../components/Navbar';
import Profile from '../../../components/Profile';
import { Box, Grid, Button } from '@mui/material';
import Image from 'mui-image';
import { Typography } from '@mui/material';
import { deleteUserFromDB } from "../../../authContext/userDatabase";
import { signOut } from "../../../authContext/auth";

export default function Page() {
    const [user] = useAuthState(auth);
    return user != null ? (
        <div>
            <Navbar isSignedIn={true} profile={user} nav={null}></Navbar>
            <Grid
                container
                alignItems="center"
                direction="column"
                spacing={8}
            >
                <Grid item>
                    <Typography variant="subtitle2" sx={{ fontSize: "32px", fontWeight: "400" }}>
                        {user.displayName}
                    </Typography>
                </Grid>
                <Grid item>
                    <Image
                        width={250}
                        src={user ? user.photoURL : ""}
                    />
                </Grid>
                <Grid item>Email: {user.email}</Grid>
            </Grid>
            <Button variant="contained">
                <a onClick={async () => {
                    if (user) {
                        await deleteUserFromDB(user); // delete the user
                    }
                    window.location.href = "/"; // Redirect to "/"
                }}>Delete Account</a>
                </Button>
            <Profile user={user} />
        </div>
    ) : <div></div>;
}