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
  if (movie.popularity < 50) {
    // Skip this movie entry
    return;
  }

  // Add the movie entry to the filteredMovies array
  filteredMovies.push(movie);
});

// Handle the end of the file
rl.on('close', () => {
  // Convert the filteredMovies array to JSON string
  const filteredJson = JSON.stringify(filteredMovies);

  // Write the filtered JSON data to the output file
  writeFileSync(outputFile, filteredJson);

  console.log('Filtered JSON file created:', outputFile);
});