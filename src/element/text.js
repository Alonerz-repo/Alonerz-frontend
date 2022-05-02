import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { children, bold, size, margin } = props;
  const style = {
    bold: bold,
    size: size,
    margin: margin,
  };
  return (
    <>
      <P {...style}>{children}</P>
    </>
  );
};

Text.defaultProps = {
  children: "text값이 비어있음",
  bold: false,
  size: "14px",
};
const P = styled.p`
  font-weight: ${(props) => props.bold};
  font-size: ${(props) => props.size};
  ${(props) => (props.margin ? `margin: ${props.margin}` : "")};
`;
export default Text;
