import { User, UserCredential } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import ReviewForm from "./ReviewForm";
import ReviewsFromDB from "./ReviewsFromDB";

export default function ReviewSection({ user, movieId, refresh, handleRefresh } : { user: User | null | undefined; movieId : string | null; refresh : boolean; handleRefresh: () => void }) {

    return (
        <div>
            <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
                <div className="max-w-2xl mx-auto px-4">
                    <ReviewForm user={user} movieId={movieId} handleRefresh={handleRefresh}/>
                    <ReviewsFromDB user={user} movieId={movieId} key={refresh ? 'refresh' : 'default'} />
                </div>
            </section>
        </div>
    );
}