// this will be the page for specific user watchlist movies
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
import Navbar from "../../components/Navbar";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signIn, signOut } from "../../authContext/auth";
import { getWatchlist } from "../../authContext/userDatabase";

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

function Details({ user, data }: { user: User | null | undefined; data: any }) {

    return (
        <div>
            <Navbar
                isSignedIn={user ? true : false}
                profile={user}
                nav={"Watchlist"}
            />
            <Box>
                {data && data.map(item => (
                    <div>{item}</div>
                ))}
            </Box>
        </div>
    );
}

export default function Watchlist() {
    const [user] = useAuthState(auth);
    const [movieData, setMovieData] = useState([]);

    useEffect(() => {
        getWatchlist(user).then((data) => {
            // console.log("from useeffect " + data);
            setMovieData(data);
        }).catch((error) => {
            console.error('Error fetching movie data:', error);
        });
    }, []);

    if (movieData == null) {
        return <div>Loading...</div>;
    }

    return <Details user={user} data={movieData} />;
}