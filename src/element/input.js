import React from "react";
import styled from "styled-components";

const Input = () => {
  return (
    <GRID style={{ justifyContent: "center" }}>
      <GRID style={{ flexDirection: "column", width: "80%" }}>
        <TEXT> 모임 제목 </TEXT>
        <INPUTBOX></INPUTBOX>
      </GRID>
    </GRID>
  );
};
const GRID = styled.div`
  border: 2px solid;
  display: flex;
  /* width: 100%; */
`;
const INPUTDIV = styled.div`
  border: 2px solid green;
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const INPUTBOX = styled.input`
  border-radius: 15px;
  max-width: 100%;
  height: 51px;
`;

const INPUTAREA = styled.textarea`
  border-radius: 15px;
  max-width: 100%;
  height: 100px;
`;

const TEXT = styled.div``;

export default Input;
