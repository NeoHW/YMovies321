import { User } from "firebase/auth";
import React, { useState, useEffect } from "react";
import getDocFromMovieDB from "../authContext/getDocfromMovieDB";
import ReviewArticle from "./ReviewArticle";


function Reviews({ user, movieId, handleRefresh, reviewData} : {user: User | null | undefined; movieId : string | null; handleRefresh: () => void; reviewData : any }) {

    return (
        <div>

            {reviewData.reviews ?  
                (reviewData.reviews.reverse().map((indivReview: any) => (
                    <ReviewArticle user={user} movieId={movieId} handleRefresh={handleRefresh} reviewData={indivReview} key={indivReview} />
                )))
                : 
                ( <span></span> )
            }
            
        </div>
    );
}

export default function ReturnReviews({ user, movieId, handleRefresh } : { user: User | null | undefined; movieId : string | null; handleRefresh: () => void }) {

    const [data, setData] = useState(null);
  
    useEffect(() => {
        getDocFromMovieDB(movieId).then((movieData) => {
        setData(movieData);
      });
    }, [movieId]);

    return data != null ? <Reviews user ={user} movieId={movieId} handleRefresh={handleRefresh} reviewData={data} /> : <div></div>;
}