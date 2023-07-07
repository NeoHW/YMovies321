"use client";

import { User, UserCredential } from "firebase/auth";
import firebase_app from "../../firebase/config";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Navbar from "../../components/Navbar";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signIn, signOut } from "../../authContext/auth";
import MovieCard from "../../components/MovieCard";
import getDocFromMovieDB from "../../authContext/getDocfromMovieDB";
import { MovieResult } from "../../interfaces/TMDBapi";
import getFavMovie from "../../authContext/scores/getFavMovie";


function Details({ user, data, favMovie, similar }: { user: User | null | undefined; data: any; favMovie: { movie: MovieResult }; similar: any }) {
    return (
        <div>
            <button onClick={() => getFavMovie(user).then(e => console.log(e.valueOf()))}>getFavMovie</button>
            <button onClick={() => fetchMovieDataAPI(381283).then(e => console.log(e.recommendations.results))}>get recos</button>
            <button onClick={() => console.log(favMovie)}>favMovie</button>
            <button onClick={() => console.log(similar)}>similar</button>
            <Navbar
                isSignedIn={user ? true : false}
                profile={user}
                nav={"Recommendations"}
            />
            {/* <MovieCard item={data[0]}></MovieCard> */}
            <Grid
                container
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                    justifyContent: "center",
                    backgroundColor: "#000519"
                }}
            >
                <Typography fontSize={15} m={2} sx={{ color: "#00adb5" }}>You've rated {favMovie.movie.title} highly. Here are similar movies:</Typography>
            </Grid>
            <Grid container justifyContent={"space-evenly"} spacing={3} padding={3}>
                {data && data.map((i: MovieResult) => (
                    <Grid item key={i.id}>
                        <MovieCard image_or_path={false} item={i} />
                    </Grid>
                ))}
            </Grid>
            <Grid
                container
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                    justifyContent: "center",
                    backgroundColor: "#000519"
                }}
            >
                <Typography fontSize={15} m={2} sx={{ color: "#00adb5" }}>Here are some other{" " + favMovie.movie.genres[0].name} movies you may like:</Typography>
            </Grid>
            <Grid container spacing={3} justifyContent={"space-evenly"} padding={3}>
                {similar && similar.map((i: MovieResult) => (
                    <Grid item key={i.id}>
                        <MovieCard image_or_path={false} item={i} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

function fetchMovieDataAPI(movieId: number) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            // Authorization: `Bearer ${process.env.MOVIE_API_READ_ACCESS_TOKEN}`
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDI1NmMyZWVjNzhmNzk0OTg1ZWQwYjdjMzVjY2JiMCIsInN1YiI6IjY0NzFjZDM3YTE5OWE2MDExNmM2ZDk1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MjVdbubEYW3r_vtxBOcq4zxOo6lteIShmCykxu1m8co'
        }
    }

    return fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`, options)
        .then(response => {
            // console.log(response);
            return Promise.all([response.json()]);
        }).then(([recommendations]) => {
            return { recommendations };
        });
}

function fetchMovieDetail(movieId: number) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            // Authorization: `Bearer ${process.env.MOVIE_API_READ_ACCESS_TOKEN}`
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDI1NmMyZWVjNzhmNzk0OTg1ZWQwYjdjMzVjY2JiMCIsInN1YiI6IjY0NzFjZDM3YTE5OWE2MDExNmM2ZDk1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MjVdbubEYW3r_vtxBOcq4zxOo6lteIShmCykxu1m8co'
        }
    }

    return fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options)
        .then(response => {
            // console.log(response);
            return Promise.all([response.json()]);
        }).then(([movie]) => {
            return { movie };
        });
}

function fetchSimilarMovieDataAPI(movieId: number) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            // Authorization: `Bearer ${process.env.MOVIE_API_READ_ACCESS_TOKEN}`
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDI1NmMyZWVjNzhmNzk0OTg1ZWQwYjdjMzVjY2JiMCIsInN1YiI6IjY0NzFjZDM3YTE5OWE2MDExNmM2ZDk1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MjVdbubEYW3r_vtxBOcq4zxOo6lteIShmCykxu1m8co'
        }
    }

    return fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar`, options)
        .then(response => {
            // console.log(response);
            return Promise.all([response.json()]);
        }).then(([similar]) => {
            return { similar };
        });
}

export default function Watchlist() {
    const [user] = useAuthState(auth);
    const [movieData, setMovieData]: any[] = useState(null);
    const [favMovie, setFavMovie]: any[] = useState(null);
    const [similarMovies, setSimilarMovies]: any[] = useState(null);

    useEffect(() => {
        if (user != null) {
            getFavMovie(user).then((mId) => {
                fetchMovieDataAPI(Number.parseInt(mId)).then(id => {
                    setMovieData(id.recommendations.results.slice(0, 6));
                    fetchMovieDetail(Number.parseInt(mId)).then(r => {
                        setFavMovie(r);
                        fetchSimilarMovieDataAPI(Number.parseInt(mId)).then((r) => setSimilarMovies(r.similar.results.slice(0, 6)))
                    });

                })
                console.log(mId);
            }).catch((error) => {
                console.error('Error fetching movie data:', error);
            });
        }
    }, []);

    if (user == null || movieData == null || favMovie == null) {
        return <div>Loading...</div>;
    }

    return <Details user={user} data={movieData} favMovie={favMovie} similar={similarMovies} />;
}