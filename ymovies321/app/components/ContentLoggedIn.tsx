// Display the signed-in contents of main page.
import { User, UserCredential } from "firebase/auth";
import { useState } from "react";


export default function ContentLoggedIn({ profile }: { profile: User | null | undefined}) {
    const [token, setToken] = useState("");


    profile?.getIdTokenResult().then((user) => setToken(user.token))
    return (
        <div>
            <h2 className="text-xl font-bold">
                Welcome back, {profile?.displayName}!
            </h2>
            <h2>
                Your UUID {token}
            </h2>
        </div>
    )
}