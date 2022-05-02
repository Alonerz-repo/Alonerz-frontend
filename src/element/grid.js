import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { flexDIR, flex, children, margin, alignItems, justifyContent } = props;
  const style = {
    flexDIR: flexDIR,
    flex: flex,
    children: children,
    margin: margin,
    alignItems: alignItems,
    justifyContent: justifyContent,
  };
  return (
    <>
      <GRID {...style}>{children}</GRID>
    </>
  );
};
Grid.defaultProps = {
  flexDIR: false,
  flex: null,
  margin: "0px",
  alignItems: null,
  justifyContent: null,
};

const GRID = styled.div`
  /* border: 2px solid; */
  display: ${(props) => props.flex};

  ${(props) => (props.flexDIR ? "flex-direction: 'column';" : "")}
  margin: ${(props) => props.margin};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContentifyContent};
  /* width: 100%; */
`;
export default Grid;
