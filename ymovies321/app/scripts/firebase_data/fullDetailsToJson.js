import { createReadStream, writeFileSync} from "fs";
import readline from "readline";


// Specify the path of the JSON file to save the movie data
const inputFile = "./missed_out.json";
const outputFile = './full_movie_data.json';

// Create a readline interface
const rl = readline.createInterface({
    input: createReadStream(inputFile),
    crlfDelay: Infinity
});

// Process each line of the JSON file
rl.on('line', async (jsonLine) => {
    // Parse the JSON line
    const movie = JSON.parse(jsonLine);

    const movieId = movie.id;
    console.log(movieId);

    const movieData = await getData(movieId);

    // Convert the movie object to a single-line JSON string
    const movieJson = JSON.stringify(movieData);
    console.log(movieJson);

    // Write the movie JSON to the output file with a newline character
    writeFileSync(outputFile, movieJson + "\n", { flag: "a" });
});

// Handle the end of the file
rl.on("close", () => {
    console.log("Filtered JSON file created:", outputFile);
});


// Adding data from the JSON file
async function getData(movieId) {
  
    // getting full details from API
    const fullMovieData = await fetchOtherDetailsByAPI(movieId);

    const movieData = {
    id: movieId,
    original_title: fullMovieData.original_title,
    title: fullMovieData.title,
    original_language: fullMovieData.original_language,
    genres: fullMovieData.genres,
    overview: fullMovieData.overview,
    poster_image: fullMovieData.poster_path,
    release_date: fullMovieData.release_date,
    runtime: fullMovieData.runtime,
    vote_average: fullMovieData.vote_average,
    vote_count: fullMovieData.vote_count,
    };
    // console.log("movie data in getData");
    // console.log(movieData);

    return movieData;
}

// to use API to fetch using movieID
async function fetchOtherDetailsByAPI(movieId) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDI1NmMyZWVjNzhmNzk0OTg1ZWQwYjdjMzVjY2JiMCIsInN1YiI6IjY0NzFjZDM3YTE5OWE2MDExNmM2ZDk1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MjVdbubEYW3r_vtxBOcq4zxOo6lteIShmCykxu1m8co'
      }
    };
    
    return fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=images&language=en-US&include_image_language=en,null`, options)
      .then(response => response.json())
}


// testing individual movies
// const movieData = await getData(2059);
//console.log(JSON.stringify(movieData));