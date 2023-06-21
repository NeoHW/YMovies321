"use client";

import { db } from "../authContext/users/reauthenticateUser";
import { collection, doc, getDoc, getDocs, setDoc, getFirestore, query, where, orderBy, limit } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { Box, Button, InputBase, LinearProgress, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { blueGrey } from "@mui/material/colors";
import DropDownItem from "./DropDownItem";

const moviesRef = collection(db, "test_MoviesID_TMDB_database");

async function fetchDataFromDB( searchVal: string | undefined, setIsFetching: (isFetching: boolean) => void, setResults: any) {
  setIsFetching(true); // Set isFetching to true before fetching data

  if (searchVal) {
    const q = query(
      moviesRef,
      where("name", ">=", searchVal),
      where("name", "<=", searchVal + "\uf8ff"),
      orderBy("name"),
      limit(5)
    );

    const querySnapshot = await getDocs(q);

    const fetchedResults: any[] = [];
    querySnapshot.forEach((doc) => {
      fetchedResults.push(doc.data());
    });
    
    setResults(fetchedResults);
  }

  setIsFetching(false); // Set isFetching to false after fetching data
}

function SearchBar() {

  const dropdownRef = useRef(null);

  // states
  const [searchVal, setSearchVal] = useState<string>();
  const [results, setResults] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchDataFromDB(searchVal, setIsFetching, setResults);
  }, [searchVal]);


  const handleClick = () => {
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
      console.log('handleClick: opening dropdown');
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
      console.log('handleClickOutside: closing dropdown');
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        className="search-input"
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={searchVal || ""}
        onChange={(e) => setSearchVal(e.target.value)}
        onClick={handleClick}
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

      {results.length > 0 && isDropdownOpen && (
        <Dropdown ref={dropdownRef}>
          {results.map((item: any) => (
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
