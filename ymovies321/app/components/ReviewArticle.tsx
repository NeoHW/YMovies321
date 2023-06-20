import { User, UserCredential } from "firebase/auth";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { signIn } from "../authContext/auth"
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'mui-image';
import removeReviewFromMovieDB from "../authContext/reviews/removeReviewFromMovieDB";
import removeReviewFromUserDB from "../authContext/reviews/removeReviewFromUserDB";

export default function ReviewArticle({ user, movieId, handleRefresh, reviewData} : {user: User | null | undefined; movieId : string | null; handleRefresh: () => void; reviewData : any }) {
    
    const date = reviewData.created.toDate().toDateString();
    const dropdownRef = useRef(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [open, setOpen] = useState(false); // for alert


    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    const handleDeleteReview = async () => {
        if (user?.uid == reviewData.uid) {
            removeReviewFromMovieDB(user, movieId, reviewData);
            removeReviewFromUserDB(user, movieId, reviewData)
      
            handleRefresh();
        } else {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
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
                    <Box className="relative" ref={dropdownRef}>
                        <button id="dropdownCommentButton"
                            data-dropdown-toggle="dropdownComment"
                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            type="button"
                            onClick={handleDropdownToggle}
                        >
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                                </path>
                            </svg>
                            <span className="sr-only">Comment settings</span>
                        </button>
                        {/*Dropdown Menu */}
                        {isDropdownOpen && (
                        <div id="dropdownComment"
                            className="absolute top-full right-0 z-10 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="mt-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                                <li>
                                <button 
                                    type="button"
                                    onClick={() => handleDeleteReview()} 
                                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                >
                                    remove
                                </button>
                                </li>
                            </ul>
                        </div>
                        )}
                    </Box>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">{reviewData.review}</p>
            </article>
            <ThemeProvider theme={theme}>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">You can only remove your own reviews</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are not the original user who posted this comment. Only the original user can remove their own reviews.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>OK</Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </div>
    );
}


const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
        paper: '#263238', // Adjust the color as per your preference
        },
    },
});