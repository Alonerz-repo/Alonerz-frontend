import React from "react";
import styled from "styled-components";
import loginAxios from "../axios/loginAxios";
import { Grid } from "../elements";
import { kakaoImg, noti, logo } from "../assets/header";

const Login = () => {
  return (
    <React.Fragment>
      <Grid>
        <Position style={{ top: "20vh" }}>
          <img src={logo} alt="Alonerz" />
        </Position>
        <Position
          style={{
            flexFlow: "column wrap",
            top: "60vh",
          }}
        >
          <img src={noti} alt="noti" />
          {/* 카카오 로그인 페이지로 이동합니다 */}
          <img
            onClick={loginAxios.kakaoLogin}
            src={kakaoImg}
            alt="kakaologin"
          />
        </Position>
      </Grid>
    </React.Fragment>
  );
};
const Position = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;
export default Login;
