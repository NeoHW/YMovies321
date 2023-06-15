// this will be a page containing all the details for the specified movieId
"use client";

import { User, UserCredential } from "firebase/auth";
import firebase_app from "../../../firebase/config";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signIn, signOut } from "../../../authContext/auth";
import React, { useState, useEffect } from "react";
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import moment from "moment";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Typography, Grid, Button } from "@mui/material";
import Navbar from "../../../components/Navbar";
import { removeFromWatchlist } from "../../../authContext/removeFromWatchlist";
import { isMovieInWatchlist } from "../../../authContext/isMovieInWatchlist";
import { addToWatchlist } from "../../../authContext/addToWatchlist";
import MovieDetails from "../../../components/MovieDetails";
import ReviewForm from "../../../components/ReviewForm";
import ReviewsFromDB from "../../../components/ReviewsFromDB";
import ReviewSection from "../../../components/ReviewSection";
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';


// initialise cloud firestone and get ref to service
const db = getFirestore(firebase_app);

function extractIdFromPath(pathName: string) {
  // extracting out the id from URL path
  const regex = /\/pages\/details\/(\d+)/;
  const match = pathName.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}

async function fetchMovieDataAPI(movieId: string | null) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      // Authorization: `Bearer ${process.env.MOVIE_API_READ_ACCESS_TOKEN}`
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDI1NmMyZWVjNzhmNzk0OTg1ZWQwYjdjMzVjY2JiMCIsInN1YiI6IjY0NzFjZDM3YTE5OWE2MDExNmM2ZDk1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MjVdbubEYW3r_vtxBOcq4zxOo6lteIShmCykxu1m8co'
    }
  }

  return fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
    .then(response => response.json())
}

function Details({ user, APIdata }: { user: User | null | undefined; APIdata: any }) {
  // getting URL path
  const pathName = usePathname();

  const movieId = extractIdFromPath(pathName);

  const [inWatchlist, setInWatchlist] = useState(false);
  isMovieInWatchlist(user, movieId).then(res => setInWatchlist(res));



  return (
    <div>
      <Navbar
        isSignedIn={user ? true : false}
        profile={user}
        nav={"Home"}
      />

      

      <Grid
        container
        direction="column" alignItems="center"
        sx={{ p: 2, justifyContent:'center'}}
        spacing={3}
      >
        <Grid item> 
          <MovieDetails item={APIdata} />
        </Grid>
        <Grid item>
        {inWatchlist ? (<Button
          variant="contained"
          startIcon={<DoneIcon />}
          color="info"
          onClick={() => {
            removeFromWatchlist(user, movieId).then(() => {
              setInWatchlist(false);
            })

          }}
        > remove from watchlist
        </Button>) : (<Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => {
            addToWatchlist(user, movieId).then(() => {
              setInWatchlist(true);
            });
          }}
        >
          add to watchlist
        </Button>)}
        </Grid>
      
      </Grid>


      <div className="text-lg font-bold">
        TODO:
        <ol>
          <li>1. Reviews component: </li>
          <li>  a. Update user side for reviews map of  [movieId : review]</li>
          <li>  b. Update movie side for reviews map of [uuid : review]</li>
          <li>2. Ratings component: </li>
          <li>  a. Update user side for ratings map of  [movieId : rating]</li>
          <li>  b. Update movie side for overall rating score (number): calculate new score based on user input </li>
        </ol>
      </div>
      
      <ReviewSection user={user} movieId={movieId}/>
      
    </div>
  );
}

export default function ReturnMovieDetails() {
  const [user] = useAuthState(auth);
  const [data, setData] = useState(null);

  // getting URL path
  const pathName = usePathname();

  useEffect(() => {
    const movieId = extractIdFromPath(pathName);
    fetchMovieDataAPI(movieId).then((movieData) => {
      setData(movieData);
    });
  }, []);

  return data != null ? <Details user={user} APIdata={data} /> : <div></div>;
}
