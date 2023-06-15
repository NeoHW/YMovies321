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
import Reviews from "../../../components/ReviewForm";
import { Box, Typography, Button } from "@mui/material";
import Navbar from "../../../components/Navbar";
import { addToWatchlist, removeFromWatchlist, isMovieInWatchlist } from '../../../authContext/userDatabase';

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
  // const movieId = extractIdFromPath();

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

async function checkMovie(user, movieId) {
  console.log("checkMovie");
  // isMovieInWatchlist(user, movieId).then((res) => {return res;});
}


function Details({ user, APIdata }: { user: User | null | undefined; APIdata: any }) {
  // getting URL path
  const pathName = usePathname();

  const movieId = extractIdFromPath(pathName);

  const [inWatchlist, setInWatchlist] = useState(false);
  isMovieInWatchlist(user, movieId).then(res => setInWatchlist(res));

  // console.log(APIdata);

  return (
    <div>
      <Navbar
        isSignedIn={user ? true : false}
        profile={user}
        nav={"Home"}
      />
      
      <h2 className="text-xl font-bold">Movie details here</h2>

      {inWatchlist ? (<Button
        variant="contained"
        color="info"
        onClick={() => {
          removeFromWatchlist(user, movieId).then(() => {
            setInWatchlist(false);
            console.log(inWatchlist);
          })

        }}
      > remove from watchlist
      </Button>) : (<Button
        variant="outlined"
        onClick={() => {
          addToWatchlist(user, movieId).then(() => {          
            setInWatchlist(true);
            console.log(inWatchlist);});
        }}
      >
        add to watch list
      </Button>)}
      
      <Reviews movieId={movieId} />
    </div>
  );
}

export default function MovieDetails() {
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

  return <Details user={user} APIdata={data} />;
}
