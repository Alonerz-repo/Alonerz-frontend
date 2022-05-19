import React from "react";
import styled from "styled-components";

interface Props {
  _onClick?(): void;
  children?: string;
  isCategory?: boolean;
  isLimit?: boolean;
  width?: string;
  bg?: string;
  customize?: string;
  color?: string;
}

const Button = ({
  children,
  isCategory,
  width,
  isLimit,
  _onClick,
  bg,
  color,
  customize,
}: Props) => {
  if (isCategory) {
    return (
      <React.Fragment>
        <CategoryButton onClick={_onClick}>{children}</CategoryButton>
      </React.Fragment>
    );
  }

  if (isLimit) {
    return (
      <React.Fragment>
        <LimitButton width={width} onClick={_onClick} bg={bg}>
          {children}
        </LimitButton>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <CommonButton
        onClick={_onClick}
        width={width}
        customize={customize}
        bg={bg}
        color={color}
      >
        {children}
      </CommonButton>
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
  bg?: string;
  customize?: string;
  color?: string;
}

const LimitButton = styled.button<CommonButtonProps>`
  width: ${(props) => props.width ?? "56px"};
  height: 30px;
  background-color: ${(props) => props.bg ?? "#eeeeee"};
  border-radius: 15px;
  margin: 0px 10px 0px 10px;
`;

const CommonButton = styled.button<CommonButtonProps>`
  ${(props) =>
    props.customize ??
    "outline: none; background: yellow; padding: 20px; box-sizing: border-box;"}
  width: ${(props) => props.width ?? ""};
  z-index: 998;
  border: none;
  background-color: ${(props) => props.bg ?? "#BDBDBD"};
  color: ${(props) => props.color ?? "black"};
`;
export default Button;
