// shows trending movies + searchbar(?)
import firebase_app from "../firebase/config";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import moment from "moment";

// initialise cloud firestone and get ref to service
const db = getFirestore(firebase_app);

// https://firebase.google.com/docs/firestore/manage-data/add-data
async function addData() {    
    // "cities" is the new collection's name
    const citiesRef = collection(db, "cities");

    await setDoc(doc(citiesRef, "SF"), {
        name: "San Francisco", state: "CA", country: "USA",
        capital: false, population: 860000,
        regions: ["west_coast", "norcal"] }
    );
}

// https://firebase.google.com/docs/firestore/query-data/get-data
async function fetchData() {
    // getting data
    const docRef = doc(db, "cities", "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    }
}

interface MovieData {
    showingInCinemas: any;
    topRated: any; 
  }


function fetchMovieData() {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          // Authorization: `Bearer ${process.env.MOVIE_API_READ_ACCESS_TOKEN}`
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDI1NmMyZWVjNzhmNzk0OTg1ZWQwYjdjMzVjY2JiMCIsInN1YiI6IjY0NzFjZDM3YTE5OWE2MDExNmM2ZDk1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MjVdbubEYW3r_vtxBOcq4zxOo6lteIShmCykxu1m8co'
        }
      }
  
    return Promise.all([
      fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options),
      fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options),
    ]).then(([showingInCinemasAPIResponse, topRatedAPIResponse]) => {
        console.log(showingInCinemasAPIResponse);
        console.log(topRatedAPIResponse);
        return Promise.all([
        showingInCinemasAPIResponse.json(),
        topRatedAPIResponse.json(),
      ]);
    }).then(([showingInCinemas, topRated]) => {
      return { showingInCinemas, topRated };
    });
}
  
  function MoviesComponent() {
    const [movieData, setMovieData] = useState<MovieData>({ showingInCinemas: null, topRated: null });
  
    useEffect(() => {
      fetchMovieData().then((data) => {
        setMovieData(data);
      }).catch((error) => {
        console.error('Error fetching movie data:', error);
      });
    }, []);
  
    if (movieData.showingInCinemas === null || movieData.topRated === null) {
        return <div>Loading...</div>;
      }
    const { showingInCinemas, topRated } = movieData;
    
    return (
    <div>
      <div id="gallery" className="relative w-full" data-carousel="slide">
          {/* Carousel wrapper */}
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
              {/* Item 1 */}
              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                  <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
              </div>
              {/* Item 2 */}
              <div className="hidden duration-700 ease-in-out" data-carousel-item="active">
                  <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
              </div>
              {/* Item 3 */}
              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                  <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
              </div>
              {/* Item 4 */}
              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                  <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
              </div>
              {/* Item 5 */}
              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                  <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
              </div>
          </div>
          {/* Slider controls */}
          <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg aria-hidden="true" className="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                  <span className="sr-only">Previous</span>
              </span>
          </button>
          <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg aria-hidden="true" className="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                  <span className="sr-only">Next</span>
              </span>
          </button>
      </div>

        <h2>Showing In Cinemas</h2>
        <div className="container mx-auto flex overflow-x-scroll pb-5">
            <div className="flex flex-nowrap">
                {showingInCinemas.results && showingInCinemas.results.map((item: any) => (
                <div className="ml-3 w-40 h-128 max-w-xs overflow-hidden cursor-pointer" key={item.id}>
                    <img
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "../images/no-image-available.png";
                    }}
                    src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                    alt={item.title ? item.title : item.name}
                    />
                    <div className="pl-1">
                    <a className="break-all">
                        {item.title ? item.title : item.name}
                    </a>
                    <p>{moment(item.release_date).format("MMM DD, YYYY")}</p>
                    <p>{item.vote_average}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
        <h2>Top Rated</h2>
        <div className="container mx-auto flex overflow-x-scroll pb-5">
            <div className="flex flex-nowrap">
                {topRated.results && topRated.results.map((item: any) => (
                <div className="ml-3 w-40 h-128 max-w-xs overflow-hidden cursor-pointer" key={item.id}>
                    <img
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "../images/no-image-available.png";
                    }}
                    src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                    alt={item.title ? item.title : item.name}
                    />
                    <div className="pl-1">
                    <a className="break-all">
                        {item.title ? item.title : item.name}
                    </a>
                    <p>{moment(item.release_date).format("MMM DD, YYYY")}</p>
                    <p>{item.vote_average}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </div>
    );
  }
  
  export default MoviesComponent;