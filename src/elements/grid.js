import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    flexDIR,
    flex,
    children,
    margin,
    alignItems,
    justifyContent,
    width,
    padding,
  } = props;

  const style = {
    flexDIR: flexDIR,
    flex: flex,
    children: children,
    margin: margin,
    alignItems: alignItems,
    justifyContent: justifyContent,
    width: width,
    padding: padding,
  };
  return (
    <>
      <GRID {...style}>{children}</GRID>
    </>
  );
};
Grid.defaultProps = {
  flexDIR: false,
  flex: false,
  margin: "0px",
  alignItems: null,
  justifyContent: null,
  width: "100%",
  padding: "0px",
};

const GRID = styled.div`
  /* border: 2px solid; */
  display: ${(props) => props.flex};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};

  ${(props) => (props.flexDIR ? "flex-direction: 'column';" : "")}
  margin: ${(props) => props.margin};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};

  /* width: 100%; */
`;
export default Grid;
