import { User, UserCredential } from "firebase/auth";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from 'next/link';
import companyLogo from "../navigation/YMoviesLogo.jpg";
import avatar from "../navigation/avatar.png";
import { signIn } from "../authContext/auth"
import { Box, Typography, Button } from "@mui/material";
import getDocFromMovieDB from "../authContext/getDocfromMovieDB";
import ReviewForm from "./ReviewForm";
import ReviewsFromDB from "./ReviewsFromDB";
import removeReviewFromMovieDB from "../authContext/reviews/removeReviewFromMovieDB";

export default function ReviewSection({ user, movieId, formSubmitted, handleFormSubmit } : { user: User | null | undefined; movieId : string | null; formSubmitted : boolean; handleFormSubmit: () => void }) {

    return (
        <div>
            <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
                <div className="max-w-2xl mx-auto px-4">
                    <ReviewForm user={user} movieId={movieId} handleFormSubmit={handleFormSubmit}/>
                    <ReviewsFromDB user={user} movieId={movieId} key={formSubmitted ? 'refresh' : 'default'} />

                    <Button variant="contained" onClick={() => removeReviewFromMovieDB(user, movieId)}>
                        remove review from DB
                    </Button>
                </div>
            </section>
        </div>
    );
}