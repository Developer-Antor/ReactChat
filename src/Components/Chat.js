import React, { useEffect, useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import "./Chat.css";
import { useParams } from "react-router-dom";
import db from "../Firebase/firebase";
import { useStateValue } from "../Context/StateProvider";
import firebase from "firebase";
import { ArrowBack } from "@material-ui/icons";

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");

  const handleArrow = () => {
    document.querySelector(".chat").classList.remove("show");
  };

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => {
              return doc.data();
            })
          );
        });
    }
  }, [roomId]);
  console.log(messages);
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat-header">
        <ArrowBack onClick={handleArrow} />
        <h2>{roomName}</h2>
        <p>
          Last seen at
          {new Date(
            messages[messages.length - 1]?.timestamp?.toDate()
          ).toUTCString()}
        </p>
      </div>
      <div className="chat-body">
        {messages.map((message) => {
          return (
            <p
              className={`chat-message ${
                message.name === user.displayName && "chat-reciever"
              }`}
            >
              <span className="chat-name">{message.name}</span>
              {message.message}
              <span className="chat-timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          );
        })}
      </div>
      <form className="chat-footer">
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type="text"
          placeholder="Write a message"
        />

        <button onClick={sendMessage} type="submit">
          <SendIcon />
        </button>
      </form>
    </div>
  );
}

export default Chat;
