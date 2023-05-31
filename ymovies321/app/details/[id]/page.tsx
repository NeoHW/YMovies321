// this will be a page containing all the details for the specified movieId
import { User, UserCredential } from "firebase/auth";

function details() {
    return (
        <div>
            <h2 className="text-xl font-bold">
                Movie details here
            </h2>
        </div>
    )
};

export default details;