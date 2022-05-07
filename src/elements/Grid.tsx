import styled from "styled-components";

interface Props {
  children: any;
  isFlex?: boolean;
  padding?: string;
  width?: string;
  display?: string;
  justifyContent?: string;
  alignItems?: string;
  flow?: string;
}

const Grid = ({
  children,
  isFlex,
  padding,
  width,
  display,
  justifyContent,
  alignItems,
  flow,
}: Props) => {
  return (
    <MyGrid
      isFlex={isFlex}
      padding={padding}
      width={width}
      display={display}
      justifyContent={justifyContent}
      alignItems={alignItems}
      flow={flow}
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
  flow?: string;
}

const MyGrid = styled.div<MyGridProps>`
  justify-content: ${(props) => props.justifyContent ?? ""};
  align-items: ${(props) => props.alignItems ?? ""};
  display: ${(props) => props.display ?? "flex"};
  ${(props) => props.style ?? ""};
  ${(props) =>
    props.isFlex ? `display: flex; justify-content: space-between;` : ""};
  padding: ${(props) => props.padding ?? "0px"};
  width: ${(props) => props.width ?? ""};
  box-sizing: border-box;
  position: relative;
  flex-flow: ${(props) => (props.flow ? `${props.flow}` : "row wrap")};
`;

export default Grid;
