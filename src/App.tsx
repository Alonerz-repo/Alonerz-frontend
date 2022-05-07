import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Test from "./pages/Test";
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
            <Route
              path="/participate"
              element={
                <PartyInfo
                  title="모임장소"
                  menu="맛있는 거"
                  address1="우리집"
                  address2="너희집"
                  locationX={0}
                  locationY={1}
                  limit={4}
                />
              }
            ></Route>
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
