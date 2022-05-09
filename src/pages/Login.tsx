import React from "react";
import styled from "styled-components";
import { Grid, Input, Button } from "../elements";
import { kakaoRedirectUrl } from "../utils/config";
import { useAppDispatch, useAppSelect } from "../store/config.hook";
import { kakaoLogin } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const users = useAppSelect((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const heykakao = () => {
    console.log("hello kakao");
    window.location.href = kakaoRedirectUrl;
  };
  return (
    <React.Fragment>
      <Grid>
        <Button _onClick={heykakao}>카카오 로그인</Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
