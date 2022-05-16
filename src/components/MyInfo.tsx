import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, Text, Image, Button } from "../elements";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import chatIcon from "../assets/header/1.svg";
import userAxios from "../axios/userAxios";

const MyInfo = ({ auth, user, uid, group, following, follower }: any) => {
  const userInfo = user;
  const [myauth, setMyauth] = useState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    setMyauth(auth);
  }, [auth]);

  useEffect(() => {
    console.log("hello follow");
  }, []);

  const goToModify = () => {
    navigate("/user/edit");
  };

  const goTochat = () => {
    console.log("hello chat");
  };

  const setFollow = () => {
    userAxios.setFollowUser(uid).then((res) => {
      window.alert("follow!");
    });
  };

  const setBlock = async () => {
    console.log("hello block!");
    await userAxios.blockUser(uid).then((res) => {
      window.alert("block!!");
    });
  };

  const viewfollow = (isfollow: string) => {
    navigate("follow", { state: { following, isfollow, follower } });
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
        <Grid display="flex" flexFlow="column wrap">
          <Text>참가회수</Text>
          <Text>{userInfo.point}</Text>
        </Grid>
        <Grid>
          <div onClick={() => viewfollow("following")}>
            <Text>follow</Text>
            <Text>{userInfo.follower}</Text>
          </div>
        </Grid>
        <Grid display="flex" flexFlow="column wrap">
          <div onClick={() => viewfollow("follower")}>
            <Text>follower</Text>
            <Text>{userInfo.following}</Text>
          </div>
        </Grid>
        {myauth.userId.toString() === uid && (
          <Button
            _onClick={goToModify}
            customize="border: 2px solid #F5F5F5; background: none; border-radius: 30px; padding: 15px 30px;"
          >
            내정보 수정
          </Button>
        )}

        {myauth.userId.toString() !== uid && (
          <div onClick={goTochat}>
            <Image size="44px" src={chatIcon}></Image>
          </div>
        )}
        {myauth.userId.toString() !== uid && (
          <Button
            _onClick={setFollow}
            customize="border-radius: 30px; padding: 15px 20px; color: white; background: #355DFA; border: none;"
          >
            팔로우
          </Button>
        )}
        {myauth.userId.toString() !== uid && (
          <Button
            _onClick={setBlock}
            customize="border-radius: 30px; padding: 15px 20px; color: white; background: #355DFA; border: none;"
          >
            차단
          </Button>
        )}
      </Grid>

      <Div style={{ border: "2px solid #F5F5F5", margin: "38px 0px" }}></Div>
      <Text customize="margin: 0px 0px 23px 20px; font-weight: bold;">
        내가 참가한 파티...
      </Text>
      <Grid isFlex padding="20px">
        {group.map((value: any, index: number) => {
          return (
            <Card
              key={index}
              src={value.imageUrl}
              title={value.title}
              address={value.placeName}
              limit={value.limit}
              headcount={value.join}
              isFlex
            ></Card>
          );
        })}
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

const Div = styled.div``;

const Mytxt = styled.p``;
const Position = styled.div``;

export default MyInfo;
