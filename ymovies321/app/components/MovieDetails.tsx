import Link from 'next/link';
import { Typography, Box, Grid } from "@mui/material";
import moment from "moment";
import { MovieResult } from "../interfaces/TMDBapi";
import Image from 'mui-image';
import { toASCII } from 'punycode';




export default function MovieDetails({ item }: { item: MovieResult }) {
    return (
        <div>
            <Grid container direction="column" alignItems="center">
                <Grid
                item>
                    <Typography p={3} sx={{ color: "#ffffff" }} fontWeight="bold" variant="h4" style={{ display: "-webkit-box", WebkitLineClamp: "1", WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.title ? item.title : item.original_title}
                    </Typography>
                </Grid>
                <Grid
                item
                sx={{height:"150%"}}
                >
                    <img
                        className=""
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "../images/no-image-available.png";
                        }}
                        src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                        alt={item.title ? item.title : item.original_title}
                    ></img>
                </Grid>

                <Grid 
                item
                className="pl-1">

                    <Typography sx={{ color: "#ffffff" }} variant="subtitle2" >
                        {moment(item.release_date).format("YYYY")}
                    </Typography>
                    <Typography sx={{ color: "#d8dbda" }} variant="subtitle2" >
                        <p>{item.vote_average.toFixed(1)} / 10</p>
                    </Typography>
                    <Typography sx={{ color: "#ffffff" }} variant="subtitle2">
                        <span>Genres: </span>
                        {item.genres.map(g => <span key={g.name}>  {"\u2022 " + g.name} </span>)}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}