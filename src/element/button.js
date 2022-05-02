import React from "react";
import styled from "styled-components";

const Button = (props) => {
  if (props.type === "line") {
    return (
      <>
        <ELBTN>나는 버튼이다</ELBTN>
      </>
    );
  }
  return (
    <>
      <ELBTN2 type="checkbox"></ELBTN2>
      <ELBTN style={{ borderRadius: "14px" }}> 4명 </ELBTN>
    </>
  );
};
const ELBTN2 = styled.input``;
const ELBTN = styled.button`
  border: none;
  outline: none;
  background: #c4c4c4;
  padding: 20px;
  width: 100%;
  height: 70px;
  :checked {
    background: #c4c4c4;
  }
  :active {
  }
  /* :hover {
    background: red;
  } */
`;

export default Button;
