import React, { useState } from "react";
import "./App.css";
import Chat from "./components/Chat.js";
import Login from "./components/Login.js";
import io from "socket.io-client";

function App() {
  const socket = io("http://localhost:4000");

  const [user, setUser] = useState({ name: "" });

  return (
    <>
      {user.name === "" ? (
        <Login socket={socket} setUser={setUser} />
      ) : (
        <Chat socket={socket} user={user} />
      )}
    </>
  );
}

export default App;
