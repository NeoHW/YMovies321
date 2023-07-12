import { User } from "firebase/auth";
import React from "react";
import ReviewForm from "./ReviewForm";
import ReviewsFromDB from "./ReviewsFromDB";

export default function ReviewSection({ user, movieId, refresh, handleRefresh } : { user: User | null | undefined; movieId : string | null; refresh : boolean; handleRefresh: () => void }) {

    return (
        <div>
            <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
                <div className="max-w-2xl mx-auto px-4">
                    <ReviewForm user={user} movieId={movieId} handleRefresh={handleRefresh}/>
                    <ReviewsFromDB user={user} movieId={movieId} handleRefresh={handleRefresh} key={refresh ? 'refresh' : 'default'} />
                </div>
            </section>
        </div>
    );
}