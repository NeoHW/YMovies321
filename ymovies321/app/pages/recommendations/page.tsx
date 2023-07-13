"use client";

import { User } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import Navbar from "../../components/Navbar";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../authContext/auth";
import MovieCard from "../../components/MovieCard";
import { MovieResult } from "../../interfaces/TMDBapi";
import getFavMovie from "../../authContext/scores/getFavMovie";
import Loading from "../../components/Loading";


function Details({ user, data, favMovie, similar }: { user: User | null | undefined; data: any; favMovie: { movie: MovieResult }; similar: any }) {
    if (data === -1) {
        return (
            <div>
                <Navbar
                    isSignedIn={user ? true : false}
                    profile={user}
                    nav={"Recommendations"}
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
                    <Typography variant="body1" sx={{ color: "#FFFFFF", fontFamily: "Arial, sans-serif", padding: "10px" }}>
                        Please rate at least 1 movie!
                    </Typography>
                </Grid>
            </div>
        );
    }

    return (
        <div>
            <Navbar
                isSignedIn={user ? true : false}
                profile={user}
                nav={"Recommendations"}
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
                <Typography fontSize={15} m={2} sx={{ color: "#00adb5" }}>You have rated <strong style={{ color: "#CCCCCC" }}> {favMovie.movie.title} </strong> highly. Here are similar movies:</Typography>
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
                <Typography fontSize={15} m={2} sx={{ color: "#00adb5" }}>Here are some other <strong style={{ color: "#CCCCCC" }}> {" " + favMovie.movie.genres[0].name} </strong> movies you may like:</Typography>
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
        if (user) {
            getFavMovie(user).then((mId) => {
                if (mId == "-1") {
                    setMovieData(mId);
                } else {
                    fetchMovieDataAPI(Number.parseInt(mId)).then(id => {
                        setMovieData(id.recommendations.results.slice(0, 6));
                        fetchMovieDetail(Number.parseInt(mId)).then(r => {
                            setFavMovie(r);
                            fetchSimilarMovieDataAPI(Number.parseInt(mId)).then((r) => setSimilarMovies(r.similar.results.slice(0, 6)))
                        });
                    })
                }
            }).catch((error) => {
                console.error('Error fetching movie data:', error);
            });
        }
    }, [user]);

    if (user == null) {
        return <Loading/>;
    } else if (favMovie == null || movieData == null) {
        return <Details user={user} data={-1} favMovie={favMovie} similar={similarMovies} />;
    }

    return <Details user={user} data={movieData} favMovie={favMovie} similar={similarMovies} />;
}