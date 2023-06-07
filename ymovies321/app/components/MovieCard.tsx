import Link from 'next/link';
import { Typography } from "@mui/material";
import moment from "moment";

export interface MovieResult {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: MediaType.Movie;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    runtime: number;
    homepage: string;
    genres: { name: string; id: number }[];
    spoken_languages: { english_name: string; name: string }[];
    images: { backdrops: { file_path: string }[] };
    credits: {
        cast: Cast[];
    };
    videos: {
        results: ClipResults[];
    };
    recommendations: { results: MovieResult[] };
    similar: { results: MovieResult[] };
    status: string;
    revenue: number;
    budget: number;
    imdb_id: string;
}

export enum MediaType {
    Movie = "movie",
    Tv = "tv",
    Person = "person",
}

export type Cast = {
    character: string;
    name: string;
    profile_path: string;
    id: string;
};

export type ClipResults = {
    key: string;
    site: string;
    name: string;
};


export default function MovieCard({ item } : {item: MovieResult}) {
    return (
        <Link href={"/pages/details/" + item.id} key={item.id}>
            <div className="ml-3 w-40 h-128 max-w-xs overflow-hidden cursor-pointer">
                <img
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "../images/no-image-available.png";
                    }}
                    src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                    alt={item.title ? item.title : item.original_title}
                />
                <div className="pl-1">
                    <Typography sx={{ color: "#00adb5" }} variant="subtitle2" style={{ display: "-webkit-box", WebkitLineClamp: "1", WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.title ? item.title : item.original_title}
                    </Typography>
                    <Typography sx={{ color: "#00adb5" }} variant="subtitle2" >
                        {moment(item.release_date).format("YYYY")}
                    </Typography>
                    <Typography sx={{ color: "#00adb5" }} variant="subtitle2" >
                        <p>{item.vote_average.toFixed(1)} / 10</p>
                    </Typography>
                </div>
            </div>
        </Link>
    )
}