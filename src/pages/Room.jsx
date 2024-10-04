import { useEffect, useState } from "react";
import {
  COLLECTION_MESSAGES_ID,
  DATABASE_ID,
  databases,
} from "../../appwriteConfig";

const Room = () => {
  useEffect(() => {
    getMessages();
  }, []);
  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_MESSAGES_ID
    );
    console.log(response);
  };

  return <div>Room</div>;
};

export default Room;
