import React from "react";

const Chat = ({ socket }) => {
  const [message, setMessage] = React.useState("");
  const [chatLog, setChatLog] = React.useState(["Welcome!"]);

  socket.on("chat message", msg => {
    setChatLog([...chatLog, msg]);
  });

  socket.on("user joined", data => {
    setChatLog([...chatLog, `${data.name} has joined!`]);
  });

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("chat message", message);
    setMessage("");
  }

  return (
    <div>
      <h2>AIM Gold</h2>
      <ul>
        {chatLog.map(chatItem => (
          <li>{chatItem}</li>
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
