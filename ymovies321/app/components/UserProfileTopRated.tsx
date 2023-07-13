import { User } from "firebase/auth";
import { MovieResult } from "../interfaces/TMDBapi";
import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import getUserFromMovieDB from "../authContext/getUserFromUserDB";
import MovieCard from "./MovieCard";
import getDocFromMovieDB from "../authContext/getDocfromMovieDB";
import Loading from "./Loading";

function TopRated({ topRatedData } : { topRatedData: any }) {
    
    return (
        <div>
            <Typography variant="body1" sx={{ color: "#FFFFFF", fontFamily: "Arial, sans-serif", padding: "10px" }}>
                Your top rated movies!
            </Typography>

            <Grid container justifyContent={"space-evenly"} sx={{ padding: "10px" }}>
                {topRatedData && topRatedData.map((i: MovieResult) => (
                    <Grid item key={i.id}>
                        <MovieCard image_or_path={true} item={i} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default function UserProfileTopRated({ user } : { user: User }) {
    const [topRatedData, setTopRatedData]: any[] = useState(null);

        useEffect(() => {
            if (user) {
                // get the top 5 rated shows from user db in firebase
                getUserFromMovieDB(user.uid).then((data) => {
                    let movieScores = data.movieScores;
                    let allList: any[] = [];
                    let sortable = [];
                    for (var movie in movieScores) {
                        sortable.push([movie, movieScores[movie]]);
                    }
                    sortable.sort(function(a, b) {
                        return b[1] - a[1];
                    });
                    const results = sortable.slice(0,5);
                    results.map(d => {getDocFromMovieDB(d[0]).then(r => allList.push(r)).then(() => setTopRatedData(allList))})
                    // console.log(allList)
                }).catch((error) => {
                    console.error('Error fetching watchlist movie data:', error);
                });
            }
            
        }, [user]);

        if (topRatedData == null) {
            return <Loading/>;
        }

    return <TopRated topRatedData={topRatedData} />;
}