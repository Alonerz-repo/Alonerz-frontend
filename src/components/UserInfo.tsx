import React from "react";
import styled from "styled-components";
import { Grid, Text, Image, Button } from "../elements";
import Card from "../components/Card";

const UserInfo = () => {
  return (
    <React.Fragment>
      <Grid>
        <A></A>
        <GridPosi>
          <Grid flexFlow="column wrap">
            <Mytxt style={{ fontSize: "13px", fontWeight: "bold" }}>
              UIUX디자인&개발
            </Mytxt>
            <Mytxt style={{ fontSize: "20px", color: "#F24141" }}>
              디자이너 5년차
            </Mytxt>
            <Mytxt style={{ margin: "0px 30px" }}>룰루랄라입니다.</Mytxt>
          </Grid>
        </GridPosi>
      </Grid>
      <Grid>
        <Div>
          <Mytxt>참사횟수</Mytxt>
          <Mytxt style={{ padding: "10px" }}>10</Mytxt>
        </Div>
        <Div>
          <Mytxt>참사횟수</Mytxt>
          <Mytxt style={{ padding: "10px" }}>10</Mytxt>
        </Div>
        <Div>
          <Mytxt>참사횟수</Mytxt>
          <Mytxt style={{ padding: "10px" }}>10</Mytxt>
        </Div>
        {/* <Button> 팔로우 </Button> */}
      </Grid>
      <Div></Div>
      <Grid>
        <Card title="s" address1="asd" limit={4} headcount={4} isFlex></Card>
        <Card title="s" address1="asd" limit={4} headcount={4} isFlex></Card>
        <Card title="s" address1="asd" limit={4} headcount={4} isFlex></Card>
      </Grid>
    </React.Fragment>
  );
};

const A = styled.div`
  width: 183px;
  height: 336px;
  background: #ffd9d9;
  border-radius: 20px 0px 0px 20px;
  position: relative;
  right: -53%;
`;

const Div = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  background: skyblue;
`;

const Mytxt = styled.text``;
const GridPosi = styled.div`
  position: absolute;
`;

export default UserInfo;
