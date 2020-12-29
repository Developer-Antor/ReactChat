import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./SidebarChats.css";
import Profile from "../Assets/undraw_profile_pic_ic5t (1).png";
import db from "../Firebase/firebase";
import { Link } from "react-router-dom";
function SidebarChats({ addNewChat, name, id }) {
  const [messages, setMessages] = useState([]);
  const createChat = () => {
    const roomName = prompt("Please enter a name for room");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  const handleChat = () => {
    document.querySelector(".chat").classList.add("show");
  };

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {};
  }, [id]);

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div onClick={handleChat} className="sidebar-chat">
        <Avatar src={Profile} />
        <div className="sidebar-chat-info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="add sidebar-chat">
      <h2>Add New Room</h2>
    </div>
  );
}

export default SidebarChats;
