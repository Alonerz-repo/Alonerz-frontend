import React, { useEffect } from "react";
import styled from "styled-components";
import { Grid, Text, Image, Button } from "../elements";
import Card from "../components/Card";
import { useAppSelect, useAppDispatch } from "../store/config.hook";
import { getUserAxios } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const User = () => {
  const userInfo = useAppSelect((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserAxios()).then((res) => {
      console.log("userinfopage is ", res);
    });
  }, []);
  const click = () => {
    console.log("hello UserInfo");
  };
  const goToModify = () => {
    navigate("/edit/user");
  };
  return (
    <React.Fragment>
      <Grid>
        <A></A>
        <Position
          style={{
            position: "absolute",
            width: "100%",
            top: "50px",
            left: "50px",
          }}
        >
          <Image shape="rectangle"></Image>
        </Position>
        <Position style={{ position: "absolute", top: "1px" }}>
          <Grid display="flex" flexFlow="column wrap">
            <Mytxt style={{ fontSize: "13px", fontWeight: "bold" }}>
              UIUX디자인&개발
            </Mytxt>
            <Mytxt style={{ fontSize: "20px", color: "#F24141" }}>
              디자이너 5년차
            </Mytxt>
            <Mytxt style={{ margin: "0px 30px" }}>룰루랄라입니다.</Mytxt>
          </Grid>
        </Position>
      </Grid>
      <Grid isFlex>
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
        <Button _onClick={click}> 팔로우 </Button>
      </Grid>
      <Button _onClick={goToModify}>내정보 수정</Button>

      <Div></Div>
      <Text>내가 참가한 파티...</Text>
      <Grid isFlex>
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
const Position = styled.div``;

export default User;
