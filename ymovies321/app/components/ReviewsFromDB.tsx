import { User, UserCredential } from "firebase/auth";
import firebase_app from "../firebase/config";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { signIn } from "../authContext/auth"
import { Box, Typography } from "@mui/material";
import Image from 'mui-image';
import getDocFromMovieDB from "../authContext/getDocfromMovieDB";
import ReviewArticle from "./ReviewArticle";


function Reviews({ user, movieId, reviewData} : {user: User | null | undefined; movieId : string | null; reviewData : any }) {

    return (
        <div>

            {reviewData.reviews ?  
                (reviewData.reviews.reverse().map((indivReview: any) => (
                    <ReviewArticle user={user} movieId={movieId} reviewData={indivReview} />
                )))
                : 
                ( <span></span> )
            }
            
        </div>
    );
}

export default function ReturnReviews({ user, movieId } : { user: User | null | undefined; movieId : string | null }) {

    const [data, setData] = useState(null);
  
    useEffect(() => {
        getDocFromMovieDB(movieId).then((movieData) => {
        setData(movieData);
      });
    }, []);

    return data != null ? <Reviews user ={user} movieId={movieId} reviewData={data} /> : <div></div>;
}