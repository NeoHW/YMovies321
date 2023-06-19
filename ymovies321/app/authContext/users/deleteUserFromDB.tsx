import { signOut } from "../auth";
import { deleteUser, User } from "firebase/auth";
import { reauthenticateUser } from "./reauthenticateUser";

// note that after deleting a user, users data will still be shown in firestore
// only after a new login, then data will be updated to a new blank state user

export async function deleteUserFromDB(user: User) {
    await reauthenticateUser(user);

    deleteUser(user).then(() => {
        console.log("user deleted");
        signOut();
    }).catch((e) => {
        console.error("Error deleting user: ", e);
    });
}
