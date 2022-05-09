import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Test from "./pages/Test";
import User from "./pages/User";
import Login from "./pages/Login";
import CreateParty from "./pages/CreateParty";
import PartyInfo from "./pages/PartyInfo";
import Redirect from "./pages/KakaoRedirectPage";
import Signup from "./pages/Singup";
import PartyList from "./pages/PartyList";

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
            <Route path="/list" element={<PartyList />} />
            <Route path="/test" element={<Test />} />
            <Route path="/user" element={<User />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/redirect" element={<Redirect />} />
            <Route path="/participate" element={<PartyInfo />}></Route>
            <Route path="/create" element={<CreateParty />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

const Container = styled.div<ContainerProps>`
  width: ${(props) => props.width ?? "390px"};
  height: ${(props) => props.height ?? "1010px"};
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

interface ContainerProps {
  width?: string;
  height?: string;
}

export default App;
