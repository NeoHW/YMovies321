// shows trending movies + searchbar(?)
import firebase_app from "../firebase/config";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import { Box, CircularProgress, Typography } from "@mui/material";
import moment from "moment";
import Link from 'next/link';
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";
import { auth, signIn, signOut } from "../authContext/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import UserDatabase, { reauthenticateUser } from "../authContext/users/reauthenticateUser";
import getFavMovie from "../authContext/scores/getFavMovie";


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

interface MovieData {
  showingInCinemas: any;
  topRated: any;
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

  return Promise.all([
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options),
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options),
  ]).then(([showingInCinemasAPIResponse, topRatedAPIResponse]) => {
    console.log(showingInCinemasAPIResponse);
    console.log(topRatedAPIResponse);
    return Promise.all([
      showingInCinemasAPIResponse.json(),
      topRatedAPIResponse.json(),
    ]);
  }).then(([showingInCinemas, topRated]) => {
    return { showingInCinemas, topRated };
  });
}

function MoviesComponent() {
  const [user] = useAuthState(auth);
  const [movieData, setMovieData] = useState<MovieData>({ showingInCinemas: null, topRated: null });

  useEffect(() => {
    fetchMovieDataAPI().then((data) => {
      setMovieData(data);
    }).catch((error) => {
      console.error('Error fetching movie data:', error);
    });
  }, []);

  if (movieData.showingInCinemas === null || movieData.topRated === null) {
    return <div>Loading...</div>;
  }

  const { showingInCinemas, topRated } = movieData;


  return (
    <div>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="subtitle2" sx={{ fontSize: "32px", fontWeight: "400" }}>
          Showing In Cinemas
        </Typography>
        <Typography variant="body1">
          Escape to Cinematic Wonder: Catch the Hottest Shows in Theaters Now!
        </Typography>
      </Box>

      <Box className="container mx-auto flex overflow-x-scroll pb-5 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-gray-300 scrollbar-track-sky-800" >
        <div className="flex flex-nowrap">
          {showingInCinemas.results && showingInCinemas.results.map((item: any) => (
            <MovieCard image_or_path={false} key={item.id} item={item} />
          ))}
        </div>
      </Box>

      {/*blank space as separator */}
      <Box sx={{ height: 50 }}></Box>

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="subtitle2" sx={{ fontSize: "32px", fontWeight: "400" }}>
          Top Rated
        </Typography>
        <Typography variant="body1">
          Masterpieces Unleashed: Top Rated Shows of All Time!
        </Typography>
      </Box>

      <Box className="container mx-auto flex overflow-x-scroll pb-5 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-gray-300 scrollbar-track-sky-800" >
        <div className="flex flex-nowrap">
          {topRated.results && topRated.results.map((item: any) => (
            <MovieCard image_or_path={false} key={item.id} item={item} />
          ))}
        </div>
      </Box>

    </div>
  );
}

export default MoviesComponent;