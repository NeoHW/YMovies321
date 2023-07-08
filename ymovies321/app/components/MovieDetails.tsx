import { Typography, Grid } from "@mui/material";
import moment from "moment";
import { MovieResult } from "../interfaces/TMDBapi";
import Score from "./Score";

export default function MovieDetails({ apiData, firebaseData, setFireBaseData}: { apiData: MovieResult; firebaseData : any; setFireBaseData: (x: any) => void }) {
    return (
        <div>
            <Grid container direction="column" alignItems="center">
                <Grid
                    item>
                    <Typography p={3} sx={{ color: "#ffffff" }} fontWeight="bold" variant="h4" style={{ display: "-webkit-box", WebkitLineClamp: "1", WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {apiData.title ? apiData.title : apiData.original_title}
                    </Typography>
                </Grid>
                <Grid
                    item
                    sx={{ height: "150%" }}
                >
                    <img
                        className=""
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "../images/no-image-available.png";
                        }}
                        src={`https://image.tmdb.org/t/p/w185${apiData.poster_path}`}
                        alt={apiData.title ? apiData.title : apiData.original_title}
                    ></img>
                </Grid>

                <Grid
                    item
                    className="pl-1"
                >
                    <Typography sx={{ color: "#ffffff" }} variant="subtitle1" >
                        {moment(apiData.release_date).format("YYYY")}
                    </Typography></Grid>
                <Grid
                    item
                    className="pl-1"
                >

                    <Score firebaseMovieData={firebaseData} setFireBaseData={setFireBaseData}></Score>
                </Grid>
                
                    <Typography sx={{ color: "#ffffff" }} variant="subtitle1">
                        <span>Genres: </span>
                        {apiData.genres.map(g => <span key={g.name}>  {"\u2022 " + g.name} </span>)}
                    </Typography>
                    <Typography maxWidth="50%" sx={{ color: "#d8dbda" }} variant="subtitle2">
                        {apiData.overview}
                    </Typography>
                    <Typography sx={{ color: "#d8dbda" }}>Runtime: {apiData.runtime} minutes</Typography>
            </Grid>
        </div>
    )
}