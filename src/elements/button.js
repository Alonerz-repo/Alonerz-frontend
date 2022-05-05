import React, { useState } from "react";
import styled from "styled-components";

const Button = (props) => {
  const { children, _onClick, isCheck } = props;

  if (props.type === "checkbox") {
    return (
      <>
        <ELBTNCheck check={isCheck} onClick={_onClick}>
          {children}
        </ELBTNCheck>
      </>
    );
  }
  return (
    <>
      <ELBTN onClick={_onClick}>{children}</ELBTN>
    </>
  );
};

Button.defaultProps = {
  _onClick: () => {},
};

const ELBTNCheck = styled.div`
  ${(props) => (props.check ? `border: 2px solid;` : "")}
  outline: none;
  width: 100%;
  background: #eee;
  background-color: ${(props) => (props.check ? `#fff` : "")};
  border-radius: 15px;
  padding: 14px;
  text-align: center;
  color: ${(props) => (props.check ? "#000" : "#ccc")};
`;
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
  :hover {
    background: red;
  }
`;

export default Button;
