"use client";

import { User, UserCredential } from "firebase/auth";
import firebase_app from "../../firebase/config";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Navbar from "../../components/Navbar";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signIn, signOut } from "../../authContext/auth";
import { getWatchlist } from "../../authContext/watchlist/getWatchlist";
import MovieCard from "../../components/MovieCard";
import getDocFromMovieDB from "../../authContext/getDocfromMovieDB";


function Details({ user, data }: { user: User | null | undefined; data: any }) {

    return data ? (
        <div>
            <Navbar
                isSignedIn={user ? true : false}
                profile={user}
                nav={"Watchlist"}
            />
            {/* <MovieCard item={data[0]}></MovieCard> */}
            <Grid container spacing={3} padding={3}>
                {data && data.map(item => (
                    <Grid item key={item.id}>
                        <MovieCard image_or_path={true} item={item} />
                    </Grid>
                ))}
            </Grid>
        </div>
    ) : <div></div>;
}

export default function Watchlist() {
    const [user] = useAuthState(auth);
    const [movieData, setMovieData]: any[] = useState(null);

    useEffect(() => {
        if (user != null) {
            getWatchlist(user).then((data) => {
                // console.log("from useeffect " + data);
                let allList: any[] = [];

                data?.map(d => {getDocFromMovieDB(d).then(r => allList.push(r)).then(() => setMovieData(allList))})
            }).catch((error) => {
                console.error('Error fetching movie data:', error);
            });
        }
    }, []);

    if (user == null) {
        return <div>Loading...</div>;
    }

    return <Details user={user} data={movieData} />;
}