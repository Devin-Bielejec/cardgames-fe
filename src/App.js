import React, { useState, useEffect } from "react";
import "./App.css";
import Chat from "./components/Chat.js";
import Login from "./components/Login.js";
import io from "socket.io-client";

function App() {
  const socket = io("http://localhost:4000");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <Chat socket={socket} />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} socket={socket} />
      )}
    </>
  );
}

export default App;
