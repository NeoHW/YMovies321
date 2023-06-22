import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";

function fetchTrailers(movieId: string) {
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
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
    options
  ).then((response) => {
    return response.json();
  });
}

export default function TrailersScrollBar({ movieId } : { movieId : string | null }) {
  const [trailers, setTrailers] = useState(null);
  useEffect(() => {
    fetchTrailers(movieId)
      .then((data) => {
        setTrailers(data.results);
      })
      .catch((error) => {
        console.error("Error fetching movie trailers:", error);
      });
  }, []);

  if (trailers == null) {
    return <div>Loading...</div>;
  }

  console.log(trailers);

  return (
    <div>
      <Typography variant="h5" sx={{ marginTop: "15px", marginLeft:"15px", marginBottom:"-5px" }}>
        Clips & Trailers
      </Typography>
      <Box className="container mx-auto flex overflow-x-scroll pb-5 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-gray-300 scrollbar-track-sky-800">
        <div className="flex flex-nowrap">
          {trailers &&
            trailers.map((item: any) => (
              <a
                href={`https://www.youtube.com/watch?v=${item.key}`}
                target="_blank"
                rel="noreferrer"
                style={anchorCSS}
              >
                <img
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "../trailers/no-image-available.png";
                  }}
                  style={imageCSS}
                  src={`https://img.youtube.com/vi/${item.key}/hqdefault.jpg`}
                />
                <div style={iconContainer}>
                  <YouTubeIcon style={youtubeIcon} />
                </div>
              </a>
            ))}
        </div>
      </Box>
    </div>
  );
}

const anchorCSS = {
  position: "relative",
  width: "320px",
  height: "210px",
  overflow: "hidden",
  flex: "none",
  marginRight: "18px",
  "@media (max-width: 900px)": {
    width: "256px",
    height: "144px",
  },
};

const imageCSS = {
  position: "relative",
  overflow: "hidden",
  flex: "none",
  borderRadius: "20px",
  objectFit: "contain",
};

const iconContainer = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  zIndex: 10,
};

const youtubeIcon = {
  fontSize: "55px",
  color: "red",
};
