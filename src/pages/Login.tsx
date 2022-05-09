import React from "react";
import styled from "styled-components";
import { Grid, Input, Button } from "../elements";
import { useAppDispatch, useAppSelect } from "../redux/configureStore.hook";

import { User, addUser } from "../redux/slices/TestSlices";
import { thunkTest } from "../redux/thunkAction/thunk";

import { kakaoRedirectUrl } from "../utils/config";

const Login = () => {
  const users = useAppSelect((state) => state.testSlices);
  const dispatch = useAppDispatch();
  const kakaoLogin = () => {
    console.log("hello kakao");
    dispatch(thunkTest.fetchUserById());
    window.location.href = kakaoRedirectUrl;
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
