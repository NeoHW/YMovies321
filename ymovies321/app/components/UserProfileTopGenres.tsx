import { User } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import getUserFromMovieDB from "../authContext/getUserFromUserDB";
import getDocFromMovieDB from "../authContext/getDocfromMovieDB";
import Loading from "./Loading";

function TopGenres ({ topGenresData } : { topGenresData: any }) {
    console.log(topGenresData);
    return (
        <div>
            <Typography variant="body1" sx={{ color: "#FFFFFF", fontFamily: "Arial, sans-serif", padding: "10px" }}>
                Favourite Genres!
            </Typography>

            <Grid container justifyContent={"space-evenly"} sx={{ padding: "10px" }}>
                {topGenresData && topGenresData.map((genre: any) => (
                    <Box key={genre} sx={{ p: 3 }}>
                        <button 
                            type="button" 
                            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >
                            {genre}
                        </button>
                    </Box>
                ))}
            </Grid>
        </div>
    );
}

export default function UserProfileTopGenres({ user } : { user: User }) {
    const [topGenresData, setTopGenresData]: any[] = useState(null);

        useEffect(() => {
            if (user) {
                getUserFromMovieDB(user.uid).then((data) => {
                    let movieScores = data.movieScores;
                    let sortable = [];
                    for (var movie in movieScores) {
                        sortable.push([movie, movieScores[movie]]);
                    }
                    sortable.sort(function(a, b) {
                        return b[1] - a[1];
                    });
                    const results = sortable.slice(0,5);

                     const promises = results.map((d) =>
                            getDocFromMovieDB(d[0]).then((r) => r.genres)
                        );
                        Promise.all(promises)
                            .then((genresList) => {
                                const flattenedGenres = Array.from(
                                    // set is used to remove duplicates
                                    new Set(genresList.flatMap((genres) => 
                                        genres.map((genre) => genre.name)
                                    ))
                                );
                                setTopGenresData(flattenedGenres.slice(0,5));
                            })
                            .catch((error) => {
                                console.error('Error fetching genres:', error);
                            });
                }).catch((error) => {
                    console.error('Error fetching watchlist movie data:', error);
                });
            }
            
        }, [user]);

        if (topGenresData == null) {
            return <Loading/>;
        }

    return <TopGenres topGenresData={topGenresData} />;
}