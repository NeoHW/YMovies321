import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import MovieCard from "./MovieCard";

function fetchMovieDataAPI(movieId: string) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            // Authorization: `Bearer ${process.env.MOVIE_API_READ_ACCESS_TOKEN}`
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDI1NmMyZWVjNzhmNzk0OTg1ZWQwYjdjMzVjY2JiMCIsInN1YiI6IjY0NzFjZDM3YTE5OWE2MDExNmM2ZDk1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MjVdbubEYW3r_vtxBOcq4zxOo6lteIShmCykxu1m8co'
        }
    }

    return fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`, options)
        .then(response => {
            // console.log(response);
            return Promise.all([response.json()]);
        }).then(([recommendations]) => {
            return { recommendations };
        });
}

export default function RecommendationScrollBar({ movieId } : { movieId : string | null }) {
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    fetchMovieDataAPI(movieId).then((data) => {
        setMovieData(data.recommendations);
    }).catch((error) => {
        console.error('Error fetching movie data recommendations:', error);
    });
  }, []);

  if (movieData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ backgroundColor: "#1E1E1E", marginTop: '-5px' }}>
        <Typography variant="h5" sx={{ marginTop: "5px", marginLeft:"15px", marginBottom:"5px" }}>
            We Recommend
        </Typography>

        <Box className="container mx-auto flex overflow-x-scroll pb-5 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-gray-300 scrollbar-track-sky-800" >
            <div className="flex flex-nowrap">
                {movieData.results && movieData.results.map((item: any) => (
                <MovieCard image_or_path={false} key={item.id} item={item} />
                ))}
            </div>
        </Box>
    </div>
  );
}