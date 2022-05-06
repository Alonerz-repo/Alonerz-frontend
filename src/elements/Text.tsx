import React from "react";
import styled from "styled-components";

type Props = {
  children: any;
  bold?: boolean;
};
const Text = ({ children, bold }: Props) => {
  return (
    <>
      <P bold={bold}>{children}</P>
    </>
  );
};

interface MyPProps {
  bold?: boolean;
}

const P = styled.p<MyPProps>`
  font-size: 15px;
  ${(props) => (props.bold ? `font-weight: bold;` : "")}
`;
export default Text;
