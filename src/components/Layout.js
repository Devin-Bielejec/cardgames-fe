import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Header = styled.header`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin-bottom: 0;
`;

const Footer = styled.footer`
  background-color: #eee;
`;

const Main = styled.main`
  flex: 1;
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <Header>
        <Title>Signal, Bot</Title>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <p>Tomato Pie Coders</p>
      </Footer>
    </Container>
  );
};

export default Layout;
