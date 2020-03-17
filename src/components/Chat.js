import React, { useEffect } from "react";
import ChatLog from "./ChatLog";
import UsersOnline from "./UsersOnline";
import Layout from "./Layout";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 6fr;
  row-gap: 0px;
  column-gap: 1px;
  padding: 0 1rem;
`;

const Chat = ({ socket }) => {
  useEffect(() => {
    try {
      const username = localStorage.getItem("username");
      socket.emit("add user", username);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const [message, setMessage] = React.useState("");
  const [chatLog, setChatLog] = React.useState([]);
  const [isTypingMessage, setIsTypingMessage] = React.useState("");
  const [usersOnline, setUsersOnline] = React.useState([]);

  socket.on("new message", data => {
    setChatLog([...chatLog, data]);
  });

  socket.on("user joined", data => {
    setChatLog([...chatLog, data]);
    setUsersOnline([...usersOnline, data.username]);
  });

  socket.on("user left", data => {
    setChatLog([...chatLog, data]);
    const filteredUsers = usersOnline.filter(user => user !== data.username);
    setUsersOnline(filteredUsers);
  });

  socket.on("typing", data => {
    setIsTypingMessage(data.message);
  });

  socket.on("stop typing", data => {
    setIsTypingMessage(data.message);
  });

  function handleChange(e) {
    if (e.target.value.length > 0) {
      socket.emit("typing");
    } else {
      socket.emit("stop typing");
    }
    setMessage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("new message", message);
    setMessage("");
  }
  return (
    <Layout>
      <Grid>
        <UsersOnline users={usersOnline} />
        <ChatLog
          chatLog={chatLog}
          isTypingMessage={isTypingMessage}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          message={message}
        />
      </Grid>
    </Layout>
  );
};

export default Chat;
