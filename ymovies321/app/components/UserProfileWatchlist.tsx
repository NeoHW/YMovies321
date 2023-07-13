import { User } from "firebase/auth";
import { MovieResult } from "../interfaces/TMDBapi";
import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import { getWatchlist } from "../authContext/watchlist/getWatchlist";
import getDocFromMovieDB from "../authContext/getDocfromMovieDB";
import MovieCard from "./MovieCard";
import Loading from "./Loading";

function Watchlist({ watchlistData } : { watchlistData: any }) {
    
    return (
        <div>
            <Typography variant="body1" sx={{ color: "#FFFFFF", fontFamily: "Arial, sans-serif", padding: "10px" }}>
                Your most recent watchlisted movies! Check them out!
            </Typography>

            <Grid container justifyContent={"space-evenly"} sx={{ padding: "10px" }}>
                {watchlistData && watchlistData.map((i: MovieResult) => (
                    <Grid item key={i.id}>
                        <MovieCard image_or_path={true} item={i} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}


export default function UserProfileWatchlist({ user } : { user: User }) {
    const [watchlistData, setWatchlistData]: any[] = useState(null);

    useEffect(() => {
        if (user) {
            getWatchlist(user).then((data) => {
                let allList: any[] = [];
                data?.reverse().slice(0,5)?.map(d => {getDocFromMovieDB(d).then(r => allList.push(r)).then(() => setWatchlistData(allList))})
            }).catch((error) => {
                console.error('Error fetching watchlist movie data:', error);
            });
        }
    }, [user]);

    if (watchlistData == null) {
        return <Loading/>;
    }

    return <Watchlist watchlistData={watchlistData} />;
}