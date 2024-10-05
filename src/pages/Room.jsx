import { useEffect, useState } from "react";
import {
  COLLECTION_MESSAGES_ID,
  DATABASE_ID,
  databases,
} from "../../appwriteConfig";
import { ID, Query } from "appwrite";
import { Trash2 } from "react-feather";

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    getMessages();
  }, []);

  let payload = {
    body: messageBody,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_MESSAGES_ID,
      ID.unique(),
      payload
    );
    console.log("Created", response);
    setMessages((prevState) => [response, ...prevState]);
    setMessageBody("");
  };

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_MESSAGES_ID,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );
    console.log(response);
    setMessages(response.documents);
  };

  const deleteMessage = async (message_id) => {
    await databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_MESSAGES_ID,
      message_id
    );
    setMessages(() => messages.filter((message) => message.$id !== message_id));
  };

  return (
    <main className="container">
      <div className="room--container">
        <form id="message--form" onSubmit={handleSubmit}>
          <div>
            <textarea
              required
              maxLength="1000"
              placeholder="Say something...."
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
            ></textarea>
          </div>
          <div className="send-btn--wrapper">
            <input type="submit" value="Send" className="btn btn--secondary" />
          </div>
        </form>
        <div>
          {messages.map((message) => (
            <div key={message.$id} className="message--wrapper">
              <div className="message--header">
                <small className="message-timestamp">
                  {new Date(message.$createdAt).toLocaleString()}
                </small>
                <Trash2
                  onClick={() => {
                    deleteMessage(message.$id);
                  }}
                  className="delete--btn"
                />
              </div>
              <div className="message--body">
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Room;
