// shows trending movies + searchbar(?)
import firebase_app from "../firebase/config";
import { collection, doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import React, { useEffect } from "react";
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

export const getStaticProps = async () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDI1NmMyZWVjNzhmNzk0OTg1ZWQwYjdjMzVjY2JiMCIsInN1YiI6IjY0NzFjZDM3YTE5OWE2MDExNmM2ZDk1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MjVdbubEYW3r_vtxBOcq4zxOo6lteIShmCykxu1m8co'
        }
      };

    const popularAPIResponse : any = await fetch(
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options
    );
  
    const showingInCinemasAPIResponse : any = await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options
    );

    const popular = await popularAPIResponse.json();
    const showingInCinemas = await showingInCinemasAPIResponse.json();

    return {
      props: {
        showingInCinemas: showingInCinemas.results,
        popular: popular.results,
      },
    };
  };

// Homepage component that shows all the current movies showing in cinemas 
function Home ({ showingInCinemas, popular }: InferGetStaticPropsType<typeof getStaticProps>) {
    
    // addData() & fetchData() works
    // addData();
    // fetchData();

    // return jsx
    return (
        <div>
            {showingInCinemas.map((item) => (
                <div className="ml-3 w-40 h-128 max-w-xs overflow-hidden cursor-pointer" key={item.id}>
                <img
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
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
    )
};

export default Home;