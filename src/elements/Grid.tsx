import styled from "styled-components";

interface Props {
  children?: any;
  isFlex?: boolean;
  padding?: string;
  width?: string;
  display?: string;
  justifyContent?: string;
  alignItems?: string;
  flexFlow?: string;
  absolute?: string;
  customize?: string;
}

const Grid = ({
  children,
  isFlex,
  padding,
  width,
  display,
  justifyContent,
  alignItems,
  flexFlow,
  absolute,
  customize,
}: Props) => {
  return (
    <MyGrid
      isFlex={isFlex}
      padding={padding}
      width={width}
      display={display}
      justifyContent={justifyContent}
      alignItems={alignItems}
      flexFlow={flexFlow}
      absolute={absolute}
      customize={customize}
    >
      {children}
    </MyGrid>
  );
};

interface MyGridProps {
  isFlex?: boolean;
  padding?: string;
  width?: string;
  style?: string;
  display?: string;
  justifyContent?: string;
  alignItems?: string;
  flexFlow?: string;
  absolute?: string;
  customize?: string;
}

const MyGrid = styled.div<MyGridProps>`
  ${(props) => (props.customize ? props.customize : "")}
  flex-flow: ${(props) => (props.flexFlow ? props.flexFlow : "row wrap")};
  justify-content: ${(props) => props.justifyContent ?? ""};
  align-items: ${(props) => props.alignItems ?? ""};
  display: ${(props) => props.display ?? ""};
  ${(props) => props.style ?? ""};
  ${(props) =>
    props.isFlex ? `display: flex; justify-content: space-between;` : ""};
  padding: ${(props) => props.padding ?? "0px"};
  width: ${(props) => props.width ?? ""};
  box-sizing: border-box;
  position: relative;
  ${(props) => props.absolute ?? ""}
`;

export default Grid;
