// this will be a page containing all the details for the specified movieId
"use client";

import { User, UserCredential } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signIn, signOut } from "../../../authContext/auth";
import React, { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { Box, Typography, Grid, Button } from "@mui/material";
import Navbar from "../../../components/Navbar";
import { removeFromWatchlist } from "../../../authContext/watchlist/removeFromWatchlist";
import { isMovieInWatchlist } from "../../../authContext/watchlist/isMovieInWatchlist";
import { addToWatchlist } from "../../../authContext/watchlist/addToWatchlist";
import MovieDetails from "../../../components/MovieDetails";
import ReviewSection from "../../../components/ReviewSection";
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import { MovieResult } from "../../../interfaces/TMDBapi";
import getDocFromMovieDB from "../../../authContext/getDocfromMovieDB";
import { addMovieToDB } from "../../../authContext/addMovieToDB";
import PicturesScrollBar from "../../../components/PicturesScrollBar";
import TrailersScrollBar from "../../../components/TrailersScrollBar";


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

  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
    .then(response => response.json());

  // response is json data
  console.log(response);

  // adding data to firebase db if it does not exist
  const docSnapData = await getDocFromMovieDB(movieId);
  console.log(docSnapData);

  if (docSnapData === undefined) {
    addMovieToDB(movieId, response);
  }

  return response;
}

function Details({ user, APIdata, firebaseData, setFireBaseData }: { user: User | null | undefined; APIdata: MovieResult; firebaseData: any; setFireBaseData: (x: any) => void}) {
  // getting URL path
  const pathName = usePathname();

  const movieId = extractIdFromPath(pathName);

  const [inWatchlist, setInWatchlist] = useState(false);
  isMovieInWatchlist(user, movieId).then(res => setInWatchlist(res));

  const [refresh, setRefresh] = useState(false);
  
  const handleRefresh = () => {
    setRefresh(!refresh);
  };

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
        sx={{ p: 2}}
        spacing={3}
      >
        <Grid item> 
          <MovieDetails apiData={APIdata} firebaseData={firebaseData} setFireBaseData={setFireBaseData} />
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

      <PicturesScrollBar movieId={movieId}/>
      <TrailersScrollBar movieId={movieId}/>
      
      <ReviewSection user={user} movieId={movieId} refresh={refresh} handleRefresh={handleRefresh}/>
      
    </div>
  );
}

export default function ReturnMovieDetails() {
  const [user] = useAuthState(auth);
  const [data, setData] = useState(null);
  const [firebaseData, setFireBaseData] = useState(null);

  // getting URL path
  const pathName = usePathname();

  useEffect(() => {
    const movieId = extractIdFromPath(pathName);
    fetchMovieDataAPI(movieId).then((movieData) => {
      setData(movieData);
    });
    getDocFromMovieDB(movieId).then((data) => {
      setFireBaseData(data);
    });
  }, []);
  return data != null ? <Details user={user} APIdata={data} firebaseData={firebaseData} setFireBaseData={setFireBaseData} /> : <div></div>;
}
