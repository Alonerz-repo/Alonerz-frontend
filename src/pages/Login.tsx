import React from "react";
import styled from "styled-components";
import { Grid, Input, Button } from "../elements";

const Login = () => {
  const kakaoLogin = () => {
    console.log("hello kakao");
  };
  return (
    <React.Fragment>
      <Grid>
        <Button _onClick={kakaoLogin}>카카오 로그인</Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
