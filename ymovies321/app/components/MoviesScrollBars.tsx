// shows trending movies + searchbar(?)
import firebase_app from "../firebase/config";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import moment from "moment";
import Link from 'next/link';

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
        <h2>Showing In Cinemas</h2>
        <div className="container mx-auto flex overflow-x-scroll pb-5">
            <div className="flex flex-nowrap">
                {showingInCinemas.results && showingInCinemas.results.map((item: any) => (
                  <Link href={"/details/" + item.id} key={item.id}>
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
                  </Link>
                ))}
            </div>
        </div>
        <h2>Top Rated</h2>
        <div className="container mx-auto flex overflow-x-scroll pb-5">
            <div className="flex flex-nowrap">
                {topRated.results && topRated.results.map((item: any) => (
                  <Link href={"/details/" + item.id} key={item.id}>
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
                  </Link>
                ))}
            </div>
        </div>
    </div>
    );
  }
  
  export default MoviesComponent;