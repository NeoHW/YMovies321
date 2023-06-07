// this will be the page for all trending movies
"use client";

import { User } from "firebase/auth";
import firebase_app from "../../firebase/config";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signIn, signOut } from "../../authContext/auth";
import MovieCard from "../../components/MovieCard";
import Navbar from "../../components/Navbar";

// initialise cloud firestone and get ref to service
const db = getFirestore(firebase_app);


// https://firebase.google.com/docs/firestore/query-data/get-data
async function fetchDataFromDB() {
    // getting data
    const docRef = doc(db, "cities", "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

function fetchMovieDataAPI() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            // Authorization: `Bearer ${process.env.MOVIE_API_READ_ACCESS_TOKEN}`
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDI1NmMyZWVjNzhmNzk0OTg1ZWQwYjdjMzVjY2JiMCIsInN1YiI6IjY0NzFjZDM3YTE5OWE2MDExNmM2ZDk1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MjVdbubEYW3r_vtxBOcq4zxOo6lteIShmCykxu1m8co'
        }
    }

    return fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`, options)
        .then(response => {
            // console.log(response);
            return Promise.all([response.json()]);
        }).then(([trending]) => {
            return { trending };
        });
}

function Details({ user, data }: { user: User | null | undefined; data: any }) {
    const row1 = data.slice(0, 5);
    const row2 = data.slice(5, 10);
    const row3 = data.slice(10, 15);
    const row4 = data.slice(15, 21);
    return (
        <div>
            <Navbar
                isSignedIn={user ? true : false}
                profile={user}
                nav={"Trending"}
            />
            <Grid
                className="p-6"
                container
                justifyContent="center"
                direction="column"
                alignItems="stretch"

            >
                <Grid
                    className="flex"
                    justifyContent="space-around"
                >
                    {row1.map((item: any) => (
                        <MovieCard item={item}></MovieCard>
                    ))}
                </Grid>
                <Grid
                    className="flex"
                    justifyContent="space-around"
                >
                    {row2.map((item: any) => (
                        <MovieCard item={item}></MovieCard>
                    ))}
                </Grid>
                <Grid
                    className="flex"
                    justifyContent="space-around"
                >
                    {row3.map((item: any) => (
                        <MovieCard item={item}></MovieCard>
                    ))}
                </Grid>
                <Grid
                    className="flex"
                    justifyContent="space-around"
                >
                    {row4.map((item: any) => (
                        <MovieCard item={item}></MovieCard>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
}

export default function TrendingMovies() {
    const [user] = useAuthState(auth);
    const [movieData, setMovieData] = useState({ trending: null });

    useEffect(() => {
        fetchMovieDataAPI().then((data) => {
            setMovieData(data);
        }).catch((error) => {
            console.error('Error fetching movie data:', error);
        });
    }, []);

    if (movieData.trending == null) {
        return <div>Loading...</div>;
    }

    const { trending } = movieData;
    return <Details user={user} data={trending?.results} />;
}