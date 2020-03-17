import React from "react";
import styled from "styled-components";

const ChatBox = ({ handleSubmit, handleChange, message }) => {
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label name="message">
          <input type="message" value={message} onChange={handleChange} />
        </label>
        <button>Submit</button>
      </form>
    </section>
  );
};

export default ChatBox;
