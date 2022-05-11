import React, { useEffect } from "react";
import styled from "styled-components";
import { Grid, Text, Image, Button } from "../elements";
import Card from "../components/Card";
import { useAppSelect, useAppDispatch } from "../store/config.hook";
import { getOUserAxios } from "../store/slices/getUserSlice";
import { setFollow } from "../store/slices/userSlice";
import { useNavigate, useParams } from "react-router-dom";

const OtherInfo = () => {
  const params = useParams();
  console.log("params is ", typeof params.userId);
  const userId = params.userId;

  const userInfo = useAppSelect((state) => state.otherUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOUserAxios(userId));
  }, []);
  const follow = () => {
    console.log("hello follow btn");
    dispatch(setFollow(params.userId));
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
              {userInfo.careerGroupName}&{userInfo.careerItemName}
            </Mytxt>
            <Mytxt style={{ fontSize: "20px", color: "#F24141" }}>
              {userInfo.careerItemName} {userInfo.year}
            </Mytxt>
            <Mytxt style={{ margin: "0px 30px" }}>
              {userInfo.nickname}입니다.
            </Mytxt>
          </Grid>
        </Position>
      </Grid>
      <Grid isFlex>
        <Div>
          <Mytxt>참가횟수</Mytxt>
          <Mytxt style={{ padding: "10px" }}>{userInfo.point}</Mytxt>
        </Div>
        <Div>
          <Mytxt>팔로우</Mytxt>
          <Mytxt style={{ padding: "10px" }}>{userInfo.following}</Mytxt>
        </Div>
        <Div>
          <Mytxt>팔로워</Mytxt>
          <Mytxt style={{ padding: "10px" }}>{userInfo.follower}</Mytxt>
        </Div>
        <Button _onClick={follow}> 팔로우 </Button>
      </Grid>
      <Button
        _onClick={() => {
          window.alert("개발중~");
        }}
      >
        채팅
      </Button>

      <Div></Div>
      <Text>이유저가 참가한 파티...</Text>
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

export default OtherInfo;
