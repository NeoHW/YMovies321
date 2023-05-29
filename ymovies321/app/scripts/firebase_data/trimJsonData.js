import { createReadStream, writeFileSync } from "fs";
import readline from "readline";

const inputFile = "./movie_ids.json";
const outputFile = './movie_ids_trimmed.json';

// Create a readline interface
const rl = readline.createInterface({
    input: createReadStream(inputFile),
    crlfDelay: Infinity
});

// Array to store filtered movie entries
const filteredMovies = [];

// Process each line of the JSON file
rl.on('line', (jsonLine) => {
    // Parse the JSON line
    const movie = JSON.parse(jsonLine);

    // Check if the movie's popularity is lower than 50
    if (movie.popularity < 15) {
    // Skip this movie entry
    return;
    }
    // Convert the movie object to a single-line JSON string
    const movieJson = JSON.stringify(movie);

    // Write the movie JSON to the output file with a newline character
    writeFileSync(outputFile, movieJson + "\n", { flag: "a" });
});

// Handle the end of the file
rl.on("close", () => {
    console.log("Filtered JSON file created:", outputFile);
  });