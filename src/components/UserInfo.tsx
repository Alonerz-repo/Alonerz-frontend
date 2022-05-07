import React from "react";
import styled from "styled-components";
import { Grid, Text, Image } from "../elements";

const UserInfo = () => {
  return (
    <React.Fragment>
      <Div>
        <A></A>
        <TextDiv>
          <Mytxt style={{ fontSize: "13px" }}>UIUX디자인&개발</Mytxt>
          <Mytxt style={{ fontSize: "20px", color: "#F24141" }}>
            디자이너 5년차
          </Mytxt>
          <Mytxt>룰루랄라입니다.</Mytxt>
        </TextDiv>
      </Div>
    </React.Fragment>
  );
};

const A = styled.div`
  width: 183px;
  height: 336px;
  background: #ffd9d9;
  border-radius: 20px 0px 0px 20px;
  position: relative;
  right: -27%;
`;

const Div = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  background: skyblue;
`;

const Mytxt = styled.text``;
const TextDiv = styled(Div)`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 20px;
`;

export default UserInfo;
