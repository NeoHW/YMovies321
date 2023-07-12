"use client";

import { User } from "firebase/auth";
import React from "react";
import UserProfileWatchlist from "./UserProfileWatchlist";
import UserProfileTopRated from "./UserProfileTopRated";
import UserProfileTopGenres from "./UserProfileTopGenres";

function ProfileDetails ({ user } : { user: User }) {
    
    return (
        <div>
            <UserProfileTopGenres user={user}/>
            <UserProfileWatchlist user={user}/>
            <UserProfileTopRated user={user}/>
        </div>
    );
}


export default function Profile ({ user } : { user: User }) {
    

    return <ProfileDetails user={user} />;
}