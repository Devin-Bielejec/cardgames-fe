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

  socket.on("new message", data => {
    console.log(data);
    setChatLog([...chatLog, data]);
  });

  socket.on("user joined", data => {
    setChatLog([...chatLog, data]);
  });

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("new message", message);
    setMessage("");
  }

  return (
    <div>
      <h2>AIM Gold</h2>
      <ul>
        {chatLog.map((data, i) => (
          <li key={i}>
            {data.username}: {data.message}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label name="message">
          <input type="message" value={message} onChange={handleChange} />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Chat;
