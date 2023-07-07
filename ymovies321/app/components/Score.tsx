// Provide template for scoring of movie
import { auth } from '../authContext/auth';
import { Typography, Rating } from '@mui/material';
import { useAuthState } from "react-firebase-hooks/auth"
import { useState, useEffect, memo } from 'react';
import playerWriteNewMovieScore from '../authContext/scores/playerWriteNewMovieScore';
import movieWriteNewScore from '../authContext/scores/movieWriteNewScore';
import { User } from "firebase/auth";
import getUserFromMovieDB from '../authContext/getUserFromUserDB';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface ScoreProps {
    firebaseMovieData: any;
    value: number;
    setValue: (value: number) => void;
    user: User | null;
}

function Score({ firebaseMovieData, value, setValue, user }: ScoreProps) {
    console.log(value);

    return (
        <div>
            <Typography align="center" sx={{ color: "#d8dbda" }} variant="subtitle1" >
                <p>{firebaseMovieData.vote_average.toFixed(1)} / 10, {firebaseMovieData.vote_count} votes</p>
            </Typography>
            <Rating
                defaultValue={value}
                max={10}
                precision={0.5}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    playerWriteNewMovieScore(user, firebaseMovieData.id, newValue)
                    movieWriteNewScore(user, firebaseMovieData.id, newValue);
                }}
                emptyIcon={<StarBorderIcon style={{ color: "#fff" }} />}
                icon={<StarIcon style={{ color: "#ff0" }} />}
            />
        </div>
    )
}

export default function ReturnScore({ firebaseMovieData }: { firebaseMovieData: any }) {
    
    const [user] = useAuthState(auth);

    // Annoyance: after voting, score does not stay at selected score after refreshing
    const [value, setValue] = useState(-1);
    const movieID = firebaseMovieData.id;

    useEffect(() => {
        if (user) {
            getUserFromMovieDB(user.uid).then((userData) => {
                const movieScores = userData.movieScores;
                const scoresForMovieID = movieScores[movieID];
                if (scoresForMovieID) {
                    setValue(scoresForMovieID);
                } else {
                    setValue(0);
                }
              });
        };
    }, []);

    if (value === -1) {
        return <div>Loading...</div>;
    }
    
    return  <Score firebaseMovieData={firebaseMovieData} value={value} setValue={setValue} user={user} /> ;
}