"use client";

import { User, UserCredential } from "firebase/auth";
import { MovieResult } from "../interfaces/TMDBapi";
import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { getWatchlist } from "../authContext/watchlist/getWatchlist";
import getDocFromMovieDB from "../authContext/getDocfromMovieDB";
import UserProfileWatchlist from "./UserProfileWatchlist";
import UserProfileTopRated from "./UserProfileTopRated";
import MovieCard from "./MovieCard";

function ProfileDetails ({ user } : { user: User }) {
    
    return (
        <div>
            <UserProfileWatchlist user={user}/>
            
            <UserProfileTopRated user={user}/>
            
            <Box sx={{ padding: "10px" }}>
                Your top genres! (5)
            </Box>
        </div>
    );
}


export default function Profile ({ user } : { user: User }) {
    

    return <ProfileDetails user={user} />;
}