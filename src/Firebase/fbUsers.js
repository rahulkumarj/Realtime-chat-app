import { get, push, ref, set } from "firebase/database";
import { database } from "./firebase";

export const fbUsers = async (email, userName,userId,avtarImage ) => {
  console.log(avtarImage,"avtarImage")
  const usersRef = ref(database, 'users');
  const newRecordRef = push(usersRef);
  try {
     set(newRecordRef, {
      avtarImage,
      userId: userId,
      userName: userName,
      email: email,
      isOnline: true,
    })
  } catch (error) {
    console.log(error, "error===>");
  }
};

export const getAllUsers = async () => {
  try {
    const usersRef = ref(database,'users');

    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const users = [];
      snapshot.forEach((childSnapshot) => {
        users.push(childSnapshot.val());
      });

      console.log("All users:", users);
      return users;
    } else {
      console.log("No users found.");
      return [];
    }
  } catch (error) {
    console.error(error, "Error fetching users");
    return [];
  }
}
