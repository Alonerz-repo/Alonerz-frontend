import React from "react";
import { Image, Text } from "../elements";
import styled from "styled-components";

const Header = () => {
  return (
    <React.Fragment>
      <Wrap>
        <GoBack>대충 아이콘</GoBack>
        <Text bold fontSize="20px" padding="10px">
          파티참가
        </Text>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  position: relative;
  text-align: center;
  top: 0;
`;

const GoBack = styled.div`
  position: absolute;
  left: 15px;
  top: 13px;
`;

export default Header;
