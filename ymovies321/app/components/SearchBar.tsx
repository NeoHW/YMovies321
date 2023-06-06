"use client";

import firebase_app from "../firebase/config";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Box, Typography } from "@mui/material";


// initialise cloud firestone and get ref to service
const db = getFirestore(firebase_app);

const citiesRef = collection(db, "cities");

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


function SearchBar() {

    return (

    )
};

export default SearchBar;