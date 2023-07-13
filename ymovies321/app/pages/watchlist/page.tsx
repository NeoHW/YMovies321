"use client";

import { User } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import Navbar from "../../components/Navbar";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../authContext/auth";
import { getWatchlist } from "../../authContext/watchlist/getWatchlist";
import MovieCard from "../../components/MovieCard";
import getDocFromMovieDB from "../../authContext/getDocfromMovieDB";
import { MovieResult } from "../../interfaces/TMDBapi";


function Details({ user, data }: { user: User | null | undefined; data: any }) {

    return data ? (
        <div>
            <Navbar
                isSignedIn={user ? true : false}
                profile={user}
                nav={"Watchlist"}
            />

            <Grid container spacing={3} padding={3}>
                {data && data.map((i: MovieResult) => (
                    <Grid item key={i.id}>
                        <MovieCard image_or_path={true} item={i} />
                    </Grid>
                ))}
            </Grid>
        </div>
    ) : <div>
        <Navbar
                isSignedIn={user ? true : false}
                profile={user}
                nav={"Watchlist"}
            />
        <Grid
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{
                        justifyContent: "center",
                        backgroundColor: "#000519"
                    }}
                >

            <Typography fontSize={20} m={2} sx={{ color: "#00adb5" }}>You have not added anything to your watchlist!</Typography>
                </Grid>
        </div>
    ;
}

export default function Watchlist() {
    const [user] = useAuthState(auth);
    const [movieData, setMovieData]: any[] = useState(null);

    useEffect(() => {
        if (user != null) {
            getWatchlist(user).then((data) => {
                let allList: any[] = [];
                data?.map(d => {getDocFromMovieDB(d).then(r => allList.push(r)).then(() => setMovieData(allList))})
            }).catch((error) => {
                console.error('Error fetching movie data:', error);
            });
        }
    }, [user]);


    return <Details user={user} data={movieData} />;
}