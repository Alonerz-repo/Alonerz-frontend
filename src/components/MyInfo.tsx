import React, { useEffect } from "react";
import styled from "styled-components";
import { Grid, Text, Image, Button } from "../elements";
import Card from "../components/Card";
import { useAppSelect, useAppDispatch } from "../store/config.hook";
import { getUserAxios, setFollow } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { authAxios } from "../axios/authAxios";

import { getCookie } from "../utils/cookie";
import axios from "axios";

const MyInfo = () => {
  const userInfo = useAppSelect((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const action = async () => {
      await authAxios.auth().then((res) => {
        const stateCode = res.statusCode;
        if (stateCode) {
          switch (stateCode) {
            case 401:
              return navigate("/login");
            case 403:
              const token = getCookie("accessToken");
              const token2 = getCookie("refreshToken");
              const url = process.env.REACT_APP_API_URL;
              axios({
                method: "",
                url: `${url}/api/auth/reissue`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                data: {
                  refreshToken: token2,
                },
              }).then((res) => {
                console.log("error 403 is ", res);
                return res;
              });
              return 0;
            default:
              return null;
          }
        } else {
          dispatch(getUserAxios(userInfo.userId));
        }
      });
    };
    action();
  }, []);
  const follow = () => {
    try {
      dispatch(setFollow(userInfo.userId));
    } catch (err) {
      console.log(err);
    }
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
          <Mytxt style={{ padding: "10px" }}>10</Mytxt>
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
      <Button _onClick={goToModify}>내정보 수정</Button>

      <Div></Div>
      <Text>내가 참가한 파티...</Text>
      <Grid isFlex>
        <Card title="s" address="asd" limit={4} headcount={4} isFlex></Card>
        <Card title="s" address="asd" limit={4} headcount={4} isFlex></Card>
        <Card title="s" address="asd" limit={4} headcount={4} isFlex></Card>
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

export default MyInfo;
