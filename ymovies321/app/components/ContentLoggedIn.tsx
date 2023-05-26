// Display the signed-in contents of main page.
import { UserCredential } from "firebase/auth";
import get from "../imdb/api";


export default function ContentLoggedIn({ profile }: { profile: User | null | undefined}) {
    return (
        <div>
            <h2 className="text-xl font-bold">
                Welcome back, {profile?.user?.displayName}!
            </h2>
            <button
                className="rounded bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={get}>Console log imdb API (100 limit daily)
            </button>
        </div>
    )
}