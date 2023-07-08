// Provide template for scoring of movie
import { auth } from '../authContext/auth';
import { Typography, Rating, Box, Button } from '@mui/material';
import { useAuthState } from "react-firebase-hooks/auth"
import { useState, useEffect, memo } from 'react';
import playerWriteNewMovieScore from '../authContext/scores/playerWriteNewMovieScore';
import movieWriteNewScore from '../authContext/scores/movieWriteNewScore';
import { User } from "firebase/auth";
import getUserFromMovieDB from '../authContext/getUserFromUserDB';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import getDocFromMovieDB from '../authContext/getDocfromMovieDB';

interface ScoreProps {
    firebaseMovieData: any;
    value: number;
    setValue: (value: number) => void;
    user: User | null;
    setFireBaseData: (x: any) => void;
}

async function updateScoreFromDatabase(movieId: string, setFireBaseData: (x: any) => void) {
    const data = await getDocFromMovieDB(movieId);
    setFireBaseData(data);
}


function Score({ firebaseMovieData, value, setValue, user, setFireBaseData }: ScoreProps) {
    return (
        <div>
            <Typography align="center" sx={{ color: "#d8dbda" }} variant="subtitle1" >
                <p>{firebaseMovieData.vote_average.toFixed(1)} / 10, {firebaseMovieData.vote_count} votes</p>
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Rating
                    defaultValue={value}
                    max={10}
                    precision={0.5}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        playerWriteNewMovieScore(user, firebaseMovieData.id, newValue);
                        movieWriteNewScore(user, firebaseMovieData.id, newValue)
                            .then(() => updateScoreFromDatabase(firebaseMovieData.id, setFireBaseData));

                    }}
                    emptyIcon={<StarBorderIcon style={{ color: "#fff" }} />}
                    icon={<StarIcon style={{ color: "#ff0" }} />}
                />
            </Box>
        </div>
    )
}

export default function ReturnScore({ firebaseMovieData, setFireBaseData }: { firebaseMovieData: any; setFireBaseData: (x: any) => void }) {
    
    const [user] = useAuthState(auth);
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
    
    return  <Score firebaseMovieData={firebaseMovieData} value={value} setValue={setValue} user={user} setFireBaseData={setFireBaseData} /> ;
}