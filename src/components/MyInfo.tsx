import React, { useEffect } from "react";
import styled from "styled-components";
import { Grid, Text, Image, Button } from "../elements";
import Card from "../components/Card";
// import { getUserAxios, setFollow } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { authAxios } from "../axios/authAxios";

import cookie from "../utils/cookie";
import axios from "axios";

const MyInfo = ({ user, uid }: any) => {
  const userInfo = user;
  const navigate = useNavigate();
  useEffect(() => {
    console.log(uid);
  });

  // useEffect(() => {
  //   const action = async () => {
  //     await authAxios.auth().then((res) => {
  //       const stateCode = res.statusCode;
  //       if (stateCode) {
  //         switch (stateCode) {
  //           case 401:
  //             return navigate("/login");
  //           case 403:
  //             const token = cookie.get("accessToken");
  //             const token2 = cookie.get("refreshToken");
  //             const url = process.env.REACT_APP_API_URL;
  //             axios({
  //               method: "",
  //               url: `${url}/api/auth/reissue`,
  //               headers: {
  //                 Authorization: `Bearer ${token}`,
  //               },
  //               data: {
  //                 refreshToken: token2,
  //               },
  //             }).then((res) => {
  //               console.log("error 403 is ", res);
  //               return res;
  //             });
  //             return 0;
  //           default:
  //             return null;
  //         }
  //       } else {
  //         dispatch(getUserAxios());
  //       }
  //     });
  //   };
  //   action();
  // }, []);
  // const follow = () => {
  //   try {
  //     dispatch(setFollow(userInfo.userId));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const goToModify = () => {
    navigate("/user/edit");
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
          <Text>follow</Text>
          <Text>{userInfo.following}</Text>
        </Grid>
        <Grid display="flex" flexFlow="column wrap">
          <Text>follower</Text>
          <Text>{userInfo.following}</Text>
        </Grid>

        <Button
          _onClick={goToModify}
          customize="border: 2px solid #F5F5F5; background: none; border-radius: 30px; padding: 15px 30px;"
        >
          내정보 수정
        </Button>
      </Grid>

      <Div style={{ border: "2px solid #F5F5F5", margin: "38px 0px" }}></Div>
      <Text customize="margin: 0px 0px 23px 20px; font-weight: bold;">
        내가 참가한 파티...
      </Text>
      <Grid isFlex padding="20px">
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

const Div = styled.div``;

const Mytxt = styled.text``;
const Position = styled.div``;

export default MyInfo;
