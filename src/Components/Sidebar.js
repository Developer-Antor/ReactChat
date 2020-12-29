import db from "../Firebase/firebase";
import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarChats from "./SidebarChats";
import { useStateValue } from "../Context/StateProvider";
function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  console.log(user.uid);
  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
          };
        })
      );
    });
  }, []);

  return (
    <div className="sidebar">
      {user.uid === "6RwwAYVqUghDmLR7Cz9SYMmtbFI3" ? (
        <SidebarChats addNewChat />
      ) : null}

      {rooms.map((room) => {
        return (
          <SidebarChats key={room.id} id={room.id} name={room.data.name} />
        );
      })}
    </div>
  );
}
export default Sidebar;
