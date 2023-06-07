// Display the signed-in contents of main page.
import { User, UserCredential } from "firebase/auth";


export default function ContentLoggedIn({ profile }: { profile: User | null | undefined}) {
    profile?.getIdTokenResult().then((user) => console.log(user.token))
    return (
        <div>
            <h2 className="text-xl font-bold">
                Welcome back, {profile?.displayName}!
            </h2>
            <h2>
            </h2>
        </div>
    )
}