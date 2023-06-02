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


export default function Reviews({ movieId } : { movieId : string | null }) {
    return (
        <div>
            <Box>
                <h1>
                    gather top few reviews {movieId}
                </h1>
            </Box>
        </div>
    )
}