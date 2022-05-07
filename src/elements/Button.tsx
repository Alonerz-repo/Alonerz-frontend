import React from "react";
import styled from "styled-components";

interface Props {
  _onClick?: () => {};
  children?: string;
  isCategory?: boolean;
  width?: string;
}

const Button = ({ children, isCategory, width }: Props) => {
  if (isCategory) {
    return (
      <React.Fragment>
        <CategoryButton>{children}</CategoryButton>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <CommonButton width={width}>{children}</CommonButton>
    </React.Fragment>
  );
};

const CategoryButton = styled.button`
  width: 56px;
  height: 30px;
  background-color: #c4c4c4;
  border: none;
  border-radius: 15px;
  margin: 0px 10px 0px 10px;
`;

interface CommonButtonProps {
  width?: string;
}

const CommonButton = styled.button<CommonButtonProps>`
  width: ${(props) => props.width ?? ""};
  outline: none;
  background: yellow;
  padding: 20px;
  box-sizing: border-box;
  :hover {
    background: red;
  }
`;
export default Button;
