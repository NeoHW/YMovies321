// TODO !

import { User, UserCredential } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase_app from "../firebase/config";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from 'next/link';
import { Fragment } from 'react'
import { useRouter } from 'next/router';
import { Box, Typography, TextField, Grid, Button } from "@mui/material";
import { auth, signIn, signOut } from "../authContext/auth";
import { findUser } from "../authContext/findUser";
import { addReviewToMovieDB } from "../authContext/reviews/addReviewToMovieDB";
import { addReviewToUserDB } from "../authContext/reviews/addReviewToUserDB";

export default function Form({ user, movieId, handleFormSubmit } : { user: User | null | undefined; movieId : string | null; handleFormSubmit: () => void }) {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addReviewToUserDB(user, movieId, comment);
    addReviewToMovieDB(user, movieId, comment);
    // Reset the comment field after submission
    setComment('');
    // Call the handleFormSubmit function passed from the parent component
    handleFormSubmit();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Reviews</h2>
      </div>
      <form className="mb-6" onSubmit={handleSubmit}>
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="comment" className="sr-only">Your comment</label>
          <textarea
            id="comment"
            rows="6"
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Leave a review..."
            value={comment}
            onChange={handleCommentChange}
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-sky-700 rounded-lg focus:ring-4 focus:ring-sky-200 dark:focus:ring-sky-900 hover:bg-sky-800"
        >
          Review
        </button>
      </form>
    </div>
    );
}

/*
<Button
  variant="contained"
  onClick={() => {
    addReviewToUserDB(user, movieId, "test review 1");
    addReviewToMovieDB(user, movieId, "test review with name and timestamp");
  }}
>
  add review
</Button>
*/
