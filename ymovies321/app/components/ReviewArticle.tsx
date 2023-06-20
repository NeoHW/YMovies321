import { User, UserCredential } from "firebase/auth";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { signIn } from "../authContext/auth"
import { Box, Button, Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import Image from 'mui-image';
import removeReviewFromMovieDB from "../authContext/reviews/removeReviewFromMovieDB";
import removeReviewFromUserDB from "../authContext/reviews/removeReviewFromUserDB";

export default function ReviewArticle({ user, movieId, handleRefresh, reviewData} : {user: User | null | undefined; movieId : string | null; handleRefresh: () => void; reviewData : any }) {
    
    const date = reviewData.created.toDate().toDateString();
    const [showAlert, setShowAlert] = useState(false);

    const handleDeleteReview = async () => {
        if (user?.uid == reviewData.uid) {
            // User is already signed in, add the review
            removeReviewFromMovieDB(user, movieId, reviewData);
            removeReviewFromUserDB(user, movieId, reviewData)
      
            // Call the handleRefresh function passed from the parent component
            handleRefresh();
        } else {
            setShowAlert(true);
        }
    };

    return (
        <div>
            <article className="p-6 mb-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                            <Image
                                className="mr-8 w-6 h-6 rounded-full"
                                width={24}
                                height={24}
                                src={reviewData ? reviewData.photoURL : ""}
                                alt={reviewData ? reviewData.name : ""}
                            />{reviewData ? reviewData.name : ""}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400"><time 
                                title="date">{date}</time></p>
                    </div>
                    <button id="dropdownCommentButton" data-dropdown-toggle="dropdownComment"
                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button">
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                            </path>
                        </svg>
                        <span className="sr-only">Comment settings</span>
                    </button>
                    {/*Dropdown Menu */}
                    <div id="dropdownComment"
                        className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownMenuIconHorizontalButton">
                            <li>
                                <a href="#"
                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                            </li>
                            <li>
                                <a href="#"
                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                            </li>
                            <li>
                                <a href="#"
                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                            </li>
                        </ul>
                    </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">{reviewData.review}</p>
                { /* (reply button )
                <div className="flex items-center mt-4 space-x-4">
                    <button type="button"
                        className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                        <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                        Reply
                    </button>
                </div>
                */ }
            </article>
            {/* if got time (nested comments)
            <article className="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                            <Image
                                className="mr-8 w-6 h-6 rounded-full"
                                width={24}
                                src={reviewData ? reviewData.photoURL : ""}
                                alt={reviewData ? reviewData.name : ""}
                            /> {reviewData ? reviewData.name : ""}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400"><time 
                                title="date">{date}</time></p>
                    </div>
                    <button id="dropdownComment2Button" data-dropdown-toggle="dropdownComment2"
                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button">
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                            </path>
                        </svg>
                        <span className="sr-only">Comment settings</span>
                    </button>
                    !!!! {dropdown menu comment}
                    <div id="dropdownComment2"
                        className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownMenuIconHorizontalButton">
                            <li>
                                <a href="#"
                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                            </li>
                            <li>
                                <a href="#"
                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                            </li>
                            <li>
                                <a href="#"
                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                            </li>
                        </ul>
                    </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">{reviewData.review}</p>
                <div className="flex items-center mt-4 space-x-4">
                    <button type="button"
                        className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                        <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                        Reply
                    </button>
                </div>
            </article>
            */}
            {showAlert && (
                <Alert severity="error" onClose={() => setShowAlert(false)}>You can only remove your own reviews</Alert>
            )}
            <Button variant="contained" onClick={() => handleDeleteReview()}>
                remove review from both User DB and Movie DB
            </Button>
        </div>
    );
}