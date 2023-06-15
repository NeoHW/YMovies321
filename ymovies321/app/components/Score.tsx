// Provide template for scoring of movie
import { auth } from '../authContext/auth';
import { Typography, Rating } from '@mui/material';
import { useAuthState } from "react-firebase-hooks/auth"
import { MovieResult } from '../interfaces/TMDBapi';
import { useState } from 'react';

export default function Score({ movie }: { movie: MovieResult }) {
    const [user] = useAuthState(auth);
    const [value, setValue] = useState(0);

    return (
        <div>
            <Typography align="center" sx={{ color: "#d8dbda" }} variant="subtitle1" >
                <p>{movie.vote_average.toFixed(1)} / 10, {movie.vote_count} votes</p>
            </Typography>
            <Rating
                value={value}
                max={10}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    console.log("changed rating to " + newValue)
                }}
            />

        </div >
    )
}