// TODO !

import { User, UserCredential } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase_app from "../firebase/config";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from 'next/link';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Typography } from "@mui/material";
import { auth, signIn, signOut } from "../authContext/auth";
import { findUser } from "../authContext/userDatabase";


// initialise cloud firestone and get ref to service
const db = getFirestore(firebase_app);

// https://firebase.google.com/docs/firestore/manage-data/add-data
async function addDataToDB() {    
    // "cities" is the new collection's name
    const citiesRef = collection(db, "cities");

    await setDoc(doc(citiesRef, "SF"), {
        name: "San Francisco", state: "CA", country: "USA",
        capital: false, population: 860000,
        regions: ["west_coast", "norcal"] }
    );
}

export default function Form({ user, movieId } : { user: User | null | undefined; movieId : string | null }) {
    return (
        <div>
            <Box>
                <h1>
                    input review form {movieId}
                </h1>
            </Box>
            <Box>
                button to submit?
            </Box>
        </div>
    )
}