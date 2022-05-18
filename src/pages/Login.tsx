import React from "react";
import styled from "styled-components";
import { Grid, Button } from "../elements";
import loginAxios from "../axios/loginAxios";

const Login = () => {
  return (
    <React.Fragment>
      <Grid>
        <Position>
          {/* 카카오 로그인 페이지로 이동합니다 */}
          <Button _onClick={loginAxios.kakaoLogin}>카카오 로그인</Button>
        </Position>
      </Grid>
    </React.Fragment>
  );
};

const Position = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  top: 60vh;
`;

export default Login;
