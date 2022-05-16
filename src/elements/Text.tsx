import React from "react";
import styled from "styled-components";

interface Props {
  children?: any;
  bold?: boolean;
  margin?: string;
  padding?: string;
  fontSize?: string;
  type?: string;
  titleText?: string;
  customize?: string;
}
const Text = ({
  children,
  bold,
  margin,
  padding,
  fontSize,
  type,
  titleText,
  customize,
}: Props) => {
  switch (type) {
    case "line":
      return (
        <React.Fragment>
          <Div
            style={{ display: "flex" }}
            padding={padding}
            margin={margin}
            customize={customize}
          >
            <P bold={true} margin="0px 14px 0px 0px">
              {titleText}
            </P>
            <P>{children}</P>
          </Div>
        </React.Fragment>
      );
    case "area":
      return (
        <Div margin={margin} padding={padding} customize={customize}>
          <P bold>상세 내용</P>
          <Box>
            <P>{children}</P>
          </Box>
        </Div>
      );
    case "title":
      return (
        <Div margin={margin} padding={padding} customize={customize}>
          <P bold fontSize="20px">
            {children}
          </P>
        </Div>
      );
  }
  return (
    <React.Fragment>
      <Div customize={customize}>
        <P bold={bold} margin={margin} padding={padding} fontSize={fontSize}>
          {children}
        </P>
      </Div>
    </React.Fragment>
  );
};

Text.defaultProps = {
  titleText: "제목",
};

const Div = styled.div<Props>`
  ${(props) => (props.padding ? `padding: ${props.padding};` : "0px")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "0px")};
  ${(props) => props.customize ?? ""}
`;

const Box = styled.div`
  border: 1px solid #eeeeee;
  padding: 18px 17px;
  margin: 18px 0px 0px 0px;
  border-radius: 15px;
`;

const P = styled.p<Props>`
  ${(props) =>
    props.fontSize ? `font-size: ${props.fontSize}` : "font-size: 15px"};
  ${(props) => (props.margin ? `margin: ${props.margin}` : "margin: 0px;")};
  ${(props) => (props.padding ? `padding: ${props.padding}` : "padding: 0px;")};
  ${(props) => (props.bold ? `font-weight: bold;` : "")}
`;
export default Text;
