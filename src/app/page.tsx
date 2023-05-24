import Image from 'next/image'
import addData from './firebase/firestore/addData'
import getData from './firebase/firestore/getData'
import {collection, doc, getDoc, getDocs, getFirestore, setDoc} from 'firebase/firestore'
import React, { useState, useEffect } from "react";
import db from "./firebase/config"


export default async function Home() {
  const citiesRef = collection(db, "users");

  return(
    citiesRef.doc("SF").set
    )
}
