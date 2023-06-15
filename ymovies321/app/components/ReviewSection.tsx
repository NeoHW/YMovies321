import { User, UserCredential } from "firebase/auth";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from 'next/link';
import companyLogo from "../navigation/YMoviesLogo.jpg";
import avatar from "../navigation/avatar.png";
import { signIn } from "../authContext/auth"
import { Box, Typography } from "@mui/material";
import getDocFromMovieDB from "../authContext/getDocfromMovieDB";
import ReviewForm from "./ReviewForm";
import ReviewsFromDB from "./ReviewsFromDB";

export default function ReviewSection({ user, movieId } : { user: User | null | undefined; movieId : string | null }) {
    return (
        <div>
            <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
                <div className="max-w-2xl mx-auto px-4">
                    <ReviewForm user={user} movieId={movieId} />
                    <ReviewsFromDB user={user} movieId={movieId} />
                </div>
            </section>
        </div>
    );
}