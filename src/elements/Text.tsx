import React from "react";
import styled from "styled-components";

interface Props {
  children: any;
  bold?: boolean;
  margin?: string;
  padding?: string;
}
const Text = ({ children, bold, margin, padding }: Props) => {
  return (
    <>
      <P bold={bold} margin={margin} padding={padding}>
        {children}
      </P>
    </>
  );
};

const P = styled.p<Props>`
  font-size: 15px;
  ${(props) => (props.margin ? `margin: ${props.margin}` : "margin: 0px;")};
  ${(props) => (props.padding ? `padding: ${props.padding}` : "padding: 0px;")};
  ${(props) => (props.bold ? `font-weight: bold;` : "")}
`;
export default Text;
