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
import getDocFromMovieDB from "../authContext/getDocfromMovieDB";


function Reviews({ movieId, reviewData} : { movieId : string | null; reviewData : any }) {
    // console.log(reviewData.reviews);

    if(reviewData.reviews) {
        reviewData.reviews.map((item: any) => {
            console.log(item.review);
            console.log(item.uid);
            console.log(item.name);
            return null;
        });
    }
    

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

export default function ReturnReviews({ movieId } : { movieId : string | null }) {

    const [data, setData] = useState(null);
  
    useEffect(() => {
        getDocFromMovieDB(movieId).then((movieData) => {
        setData(movieData);
      });
    }, []);

    return data != null ? <Reviews movieId={movieId} reviewData={data} /> : <div></div>;
  }