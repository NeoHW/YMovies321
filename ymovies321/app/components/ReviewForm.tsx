// TODO !

import { User, UserCredential } from "firebase/auth";
import firebase_app from "../firebase/config";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import moment from "moment";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image';
import companyLogo from "../navigation/YMoviesLogo.jpg";
import avatar from "../navigation/avatar.png";
import { useRouter } from 'next/router';
import { signIn } from "../authContext/auth"
import { Box, Typography, TextField, Grid, Button } from "@mui/material";


// initialise cloud firestone and get ref to service
const db = getFirestore(firebase_app);

// https://firebase.google.com/docs/firestore/manage-data/add-data
async function addDataToDB() {
    // "cities" is the new collection's name
    const citiesRef = collection(db, "cities");

    await setDoc(doc(citiesRef, "SF"), {
        name: "San Francisco", state: "CA", country: "USA",
        capital: false, population: 860000,
        regions: ["west_coast", "norcal"]
    }
    );
}

export default function Reviews({ movieId }: { movieId: string | null }) {
    const [review, setReview] = useState("");

    return (
        <Grid
        container
        alignItems="center"
        justifyContent="center"
        >
            <Box>
                <h1>
                    Write a review..
                </h1>
            </Box>
            <TextField
                variant="filled"
                multiline
                minRows={3}
                maxRows={5}
                sx={{margin:"10px", width: "300%", "bgcolor":"#363636"}}
                inputProps={{"style": {color: "white"}}}
                
                />
            <Button
                onClick={() => {

                }}
            >
                button to submit?
            </Button>
        </Grid>
    )
}