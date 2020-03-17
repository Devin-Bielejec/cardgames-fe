import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 250px;
  max-width: 100%;
  border: 1px solid blue;
  height: 30vw;
`;

const SideBar = styled.ul`
  padding: 0;
`;

const User = styled.li`
  list-style-type: none;
  font-size: 3rem;
  color: red;
  border: 1px solid black;
  border-radius: 100px;
  padding: 0 10px;
  margin: 10px auto;
`;

export default function UsersOnline({ users }) {
  return (
    <Container>
      <SideBar>
        {users.map((username, i) => (
          <User key={i}>
            {username.length > 8 ? `${username.slice(0, 6)}...` : username}
          </User>
        ))}
      </SideBar>
    </Container>
  );
}
