import React, { useEffect } from "react";

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
    <main>
      <h2>Donuts by Devin</h2>
      <ul>
        {chatLog.map((data, i) => (
          <li key={i}>
            {data.username}: {data.message}
          </li>
        ))}
        {isTypingMessage.length > 0 && <li>{isTypingMessage}</li>}
      </ul>
      <form onSubmit={handleSubmit}>
        <label name="message">
          <input type="message" value={message} onChange={handleChange} />
        </label>
        <button>Submit</button>
      </form>
      <ul>
        {usersOnline.map((username, i) => (
          <li key={i}>{username}</li>
        ))}
      </ul>
    </main>
  );
};

export default Chat;
