import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

function fetchImages(movieId: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      // Authorization: `Bearer ${process.env.MOVIE_API_READ_ACCESS_TOKEN}`
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDI1NmMyZWVjNzhmNzk0OTg1ZWQwYjdjMzVjY2JiMCIsInN1YiI6IjY0NzFjZDM3YTE5OWE2MDExNmM2ZDk1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MjVdbubEYW3r_vtxBOcq4zxOo6lteIShmCykxu1m8co",
    },
  };

  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/images`,
    options
  ).then((response) => {
    return response.json();
  });
}

export default function PicturesScrollBar({ movieId } : { movieId : string | null }) {
  const [images, setImages] = useState(null);
  useEffect(() => {
    fetchImages(movieId)
      .then((data) => {
        setImages(data.backdrops);
      })
      .catch((error) => {
        console.error("Error fetching movie images:", error);
      });
  }, []);

  if (images == null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography variant="h5" sx={{ marginTop: "15px", marginBottom: "15px", marginLeft:"15px" }}>
        Images
      </Typography>
      <Box className="container mx-auto flex overflow-x-scroll pb-5 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-gray-300 scrollbar-track-sky-800">
        <div className="flex flex-nowrap">
          {images &&
            images.map((item: any) => (
              <img
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "../images/no-image-available.png";
                }}
                style={imageCSS}
                src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
              />
            ))}
        </div>
      </Box>
    </div>
  );
}

const imageCSS = {
  position: "relative",
  width: "320px",
  height: "180px",
  overflow: "hidden",
  flex: "none",
  marginRight: "18px",
  borderRadius: "10px",
  "@media (max-width: 900px)": {
    width: "256px",
    height: "144px",
  },
};
