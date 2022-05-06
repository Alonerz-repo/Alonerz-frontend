import styled from "styled-components";

interface Props {
  children: any;
  isFlex?: boolean;
  padding?: string;
  width?: string;
}

const Grid = ({ children, isFlex, padding, width }: Props) => {
  return (
    <MyGrid isFlex={isFlex} padding={padding} width={width}>
      {children}
    </MyGrid>
  );
};

interface MyGridProps {
  isFlex?: boolean;
  padding?: string;
  width?: string;
  style?: string;
}

const MyGrid = styled.div<MyGridProps>`
  ${(props) => props.style ?? ""};
  ${(props) =>
    props.isFlex ? `display: flex; justify-content: space-between;` : ""};
  padding: ${(props) => props.padding ?? "0px"};
  width: ${(props) => props.width ?? ""};
  box-sizing: border-box;
  position: relative;
  flex-wrap: wrap;
`;

export default Grid;
