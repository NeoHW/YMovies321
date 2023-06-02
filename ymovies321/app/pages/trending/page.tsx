// this will be a page containing all the details for the specified movieId
"use client";

import { User, UserCredential } from "firebase/auth";
import firebase_app from "../../firebase/config";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import moment from "moment";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Reviews from "../../components/ReviewForm";
import { Box, Typography } from "@mui/material";

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
        .then(response => response.json());
  }


async function details() {

    const data = await fetchMovieDataAPI();
    console.log(data);

    return (
        <div>
            <Box>
                To create & add in NavBar for Trending
            </Box>
            <Box>
                To add in trending videos but probably in grid form and can load more
            </Box>
        </div>
    )
};

export default details;