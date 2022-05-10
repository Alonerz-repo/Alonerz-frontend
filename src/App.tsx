import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Test from "./pages/Test";
import User from "./pages/User";
import Login from "./pages/Login";
import CreateParty from "./pages/CreateParty";
import PartyInfo from "./pages/PartyInfo";

declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/test" element={<Test />} />
            <Route path="/user" element={<User />} />
            <Route path="/login" element={<Login />} />
            <Route path="/participate" element={<PartyInfo />}></Route>
            <Route path="/edit/partyInfo" element={<CreateParty />}></Route>
            <Route
              path="/edit/partyInfo/:groupId"
              element={<CreateParty />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

const Container = styled.div<ContainerProps>`
  width: ${(props) => props.width ?? "390px"};
  height: ${(props) => props.height ?? "100vh"};
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  position: relative;
  overflow: scroll;
`;

interface ContainerProps {
  width?: string;
  height?: string;
}

export default App;
