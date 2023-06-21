import { doc, setDoc } from "firebase/firestore";
import { db } from "./users/reauthenticateUser";
import { MovieResult } from "../interfaces/TMDBapi";


export async function addMovieToDB(movieId : string, movieData : MovieResult) {
    console.log(movieData);
    console.log("trying to add movie: " + movieData.title);
    try {
        const movieRef = doc(db, "test_MoviesID_TMDB_database", movieId);
        await setDoc(movieRef, {
            id: movieId,
            name: movieData.title.toLowerCase(),
            original_name: movieData.original_title,
            original_language: movieData.original_language || "",
            genres: movieData.genres || [],
            overview: movieData.overview || "",
            poster_image: movieData.poster_path || "",
            release_date: movieData.release_date || "",
            runtime: movieData.runtime || 0,
            vote_average: movieData.vote_average || 0,
            vote_count: 10 || 0
        });
        console.log("added movie: " + movieData.title);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
