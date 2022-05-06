import React from "react";

import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Test from "./pages/Test";

function App() {
  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

const Container = styled.div<ContainerProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;

interface ContainerProps {
  width?: string;
  height?: string;
}

export default App;
