import React from "react";
import styled from "styled-components";
import ChatBox from "./ChatBox";

const Section = styled.section`
  border: 1px solid blue;
`;

const ChatBoxContainer = styled.div`
  height: 10%;
`;

const ChatList = styled.ul`
  height: 90%;
  padding: 0px;
`;

const Message = styled.li`
  list-style-type: none;
  padding: 5px;
`;

const ChatLog = ({
  chatLog,
  isTypingMessage,
  handleChange,
  handleSubmit,
  message
}) => {
  return (
    <Section>
      <ChatList>
        {chatLog.map((data, i) => (
          <Message key={i}>
            {data.username}: {data.message}
          </Message>
        ))}
        {isTypingMessage.length > 0 && <Message>{isTypingMessage}</Message>}
      </ChatList>
      <ChatBoxContainer>
        <ChatBox
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          message={message}
        />
      </ChatBoxContainer>
    </Section>
  );
};

export default ChatLog;
