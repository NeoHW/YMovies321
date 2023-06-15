// TODO !

import { User, UserCredential } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase_app from "../firebase/config";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from 'next/link';
import { Fragment } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Button, Typography } from "@mui/material";
import { auth, signIn, signOut } from "../authContext/auth";
import { findUser } from "../authContext/findUser";
import { addReviewToMovieDB } from "../authContext/addReviewToMovieDB";
import { addReviewToUserDB } from "../authContext/addReviewToUserDB";


export default function Form({ user, movieId } : { user: User | null | undefined; movieId : string | null }) {
    
    return (
        <div>
          <Box>
            <h1>input review form {movieId}</h1>
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              addReviewToUserDB(user, movieId, "test review 2");
            }}
          >
            add review
          </Button>
        </div>
      );
}