import { IdTokenResult } from "firebase/auth"

export default interface User {
    displayName: string
    email: string
    GetIdTokenResult: () => Promise<IdTokenResult>
    photoURL: string
}