import React, { useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Chat from "./Components/Chat";
import Login from "./Components/Login";
import Sidebar from "./Components/Sidebar";
import { useStateValue } from "./Context/StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app-body">
          <Router>
            <Route path="/">
              <Sidebar className="mysidebar" />
            </Route>
            <Route exact path="/rooms/:roomId">
              <Chat />
            </Route>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
