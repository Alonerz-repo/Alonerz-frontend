import React from 'react';
import './App.css';
import styled from 'styled-components'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Main from './Main';

function App() {
  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main/>}/>
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

const Container = styled.div<ContainerProps>`
  width: ${(props) => props.width?? "390px"};
  height: ${(props) => props.height?? "1010px"};
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`

interface ContainerProps {
  width? : string;
  height? : string;
}

export default App;
