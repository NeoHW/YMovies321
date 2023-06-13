"use client";

import firebase_app from "../firebase/config";
import { collection, doc, getDoc, getDocs, setDoc, getFirestore, query, where } from "firebase/firestore";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Button, InputBase, LinearProgress, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { blueGrey } from "@mui/material/colors";
import DropDownItem from "./DropDownItem";

// initialise cloud firestone and get ref to service
const db = getFirestore(firebase_app);
// const moviesRef = collection(db, "MoviesID_TMDB_database");
const moviesRef = collection(db, "test_MoviesID_TMDB_database");

async function fetchDataFromDB( searchVal: string | undefined, setIsFetching: (isFetching: boolean) => void, setResults: any) {
  setIsFetching(true); // Set isFetching to true before fetching data

  if (searchVal) {
    const q = query(
      moviesRef,
      where("name", ">=", searchVal),
      where("name", "<=", searchVal + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot);

    const fetchedResults: any[] = [];
    querySnapshot.forEach((doc) => {
      fetchedResults.push(doc.data());
    });
    
    setResults(fetchedResults);
  }

  setIsFetching(false); // Set isFetching to false after fetching data
}

function SearchBar() {

  // states
  const [searchVal, setSearchVal] = useState<string>();
  const [results, setResults] = useState<any[]>([]);
  const [isResultsVisible, setIsResultsVisible] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchDataFromDB(searchVal, setIsFetching, setResults);
    // console.log(results);
  }, [searchVal]);

  //console.log(results);

  const displayedResults = results.length != 0 && results.length <= 5
  ? results
  : results.slice(0, 5); // Take the top 5 results

  // console.log(displayedResults);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={searchVal || ""}
        onChange={(e) => setSearchVal(e.target.value)}
        onFocus={() => setIsResultsVisible(true)}
        onBlur={() => setIsResultsVisible(false)}
        /*
        onKeyUp={(e) => {
            if (e.key == "Enter") {
            e.currentTarget.blur();
            customRedirect("/search?q=" + (searchVal ?? ""));
            }
        }}
        */
      />

      {isFetching && (
        <LinearProgress
          color="secondary"
          sx={{
            backgroundColor: "lightblue",
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            zIndex: 2,
          }}
        />
      )}

      {displayedResults.length > 0 && (
        <Dropdown>
          {displayedResults.map((item: any) => (
            <DropDownItem item = {item} />
          ))}
        </Dropdown>
      )}
    </Search>
  );
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    // elongate effect
    [theme.breakpoints.up("md")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Dropdown = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  width: "100%",
  backgroundColor: blueGrey[500],
  boxShadow: theme.shadows[1],
  zIndex: 3,
  padding: theme.spacing(1),
  maxHeight: 200,
  overflowY: "auto",
}));

export default SearchBar;
