import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, Text, Image, Button } from "../elements";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import chatIcon from "../assets/header/1.svg";
import userAxios from "../axios/userAxios";
import useUser from "../useCustom/useUser";
import { Career2, Career } from "../utils/career";

const MyInfo = ({ uid, group }: any) => {
  const navigate = useNavigate();
  const user = useUser(uid);
  const [carId, setCarId] = useState<number>(1);
  const b = Career;
  const v = b.map((value) => {
    if (value.careerId === carId) {
      return `${value.careerGroupName} / ${value.careerItemName}`;
    }
  });

  useEffect(() => {
    setCarId(user.careerId);
  }, [user]);
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

  const goToFollow = (isfollow: string) => {
    navigate(`follow`, { state: { isfollow, uid } });
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
              {b.map((value) => {
                if (value.careerId === carId) {
                  return `${value.careerGroupName} / ${value.careerItemName}`;
                }
              })}
            </Mytxt>
            <Mytxt style={{ fontSize: "20px", color: "#F24141" }}>
              {v} {user.year}
            </Mytxt>
            <Mytxt style={{ margin: "0px 30px" }}>
              {user.nickname} 입니다.
            </Mytxt>
          </Grid>
        </Position>
      </Grid>
      <Grid isFlex>
        <Grid display="flex" flexFlow="column wrap">
          <Text>참가회수</Text>
          <Text>{user.point}</Text>
        </Grid>
        <Grid>
          <div onClick={() => goToFollow("following")}>
            <Text>follow</Text>
            <Text>{user.following}</Text>
          </div>
        </Grid>
        <Grid display="flex" flexFlow="column wrap">
          <div onClick={() => goToFollow("follower")}>
            <Text>follower</Text>
            <Text>{user.follower}</Text>
          </div>
        </Grid>
        {user.userId.toString() === uid && (
          <Button
            _onClick={() => navigate("/user/edit")}
            customize="border: 2px solid #F5F5F5; background: none; border-radius: 30px; padding: 15px 30px;"
          >
            내정보 수정
          </Button>
        )}

        {user.userId.toString() !== uid && (
          <div onClick={goTochat}>
            <Image size="44px" src={chatIcon}></Image>
          </div>
        )}
        {user.userId.toString() !== uid && (
          <Button
            _onClick={setFollow}
            customize="border-radius: 30px; padding: 15px 20px; color: white; background: #355DFA; border: none;"
          >
            팔로우
          </Button>
        )}
        {user.userId.toString() !== uid && (
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
