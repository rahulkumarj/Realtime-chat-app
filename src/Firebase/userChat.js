import { get, ref, set } from "firebase/database";
import { database } from "./firebase";

export const getChatMessages = async (senderEmail, recieverEmail) => {
  const chatRoomEmail = senderEmail + recieverEmail;
  const chatRoomRef = ref(database, "chats/", chatRoomEmail);
  const snapshot = await get(chatRoomRef);
  const chatRoomExists = snapshot.exists();

  if (chatRoomExists) {
    const existingMessages = (await snapshot.val().message) || [];
    return existingMessages;
  }
};

export const chatMessages = (senderEmail, recieverEmail, message) => {
  const chatRoomEmail = senderEmail + recieverEmail;
  const _chatRoomEmail = recieverEmail + senderEmail; 
  const chatRoomRef = ref(database, "chats/", chatRoomEmail);

  if (!message) {
    alert("no messages");
    return;
  }

  const messageObject = { senderEmail, recieverEmail, message };

  get(chatRoomRef)
    .then((snapshot) => {
      const chatRoomExists = snapshot.exists();
      const snapshotArray = snapshot.val();

      if (chatRoomExists) {
        const chatRoomEmailExists = snapshotArray.find(
          (ele) => ele.chatRoomEmail === chatRoomEmail
        );
       
        const chatRefData = snapshotArray.map((childSnapShotValue) => {
          if (childSnapShotValue.chatRoomEmail === chatRoomEmail || childSnapShotValue.chatRoomEmail === _chatRoomEmail) {
            const existingMessages = childSnapShotValue.message || [];
            existingMessages.push(messageObject);
            const updatedChildSnapShotObject = {
              chatRoomEmail: chatRoomEmail,
              message: existingMessages,
            };
            return updatedChildSnapShotObject;
          } else {
            return childSnapShotValue;
          }
        });

        set(chatRoomRef, chatRefData);
      } else {
        const chatObject = [
          {
            chatRoomEmail,
            message: [messageObject],
          },
        ];
        set(chatRoomRef, chatObject);
      }
    })
    .catch((error) => {
      console.error("Error checking chat room:", error);
    });
};
