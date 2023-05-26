import get from "../imdb/api"
export default function Content({profile}) {
    return (
        <div>
        <h2 className="">
            Welcome back, {profile.user.displayName}.
        </h2>
        <button 
        className = "rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        onClick={get}>Console log imdb API (100 limit daily)</button>
        </div>
    )
}