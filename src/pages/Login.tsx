import React from 'react';
import styled from 'styled-components';
import { Grid, Input, Button } from '../elements';
import { kakaoRedirectUrl } from '../utils/config';
import { useAppDispatch, useAppSelect } from '../store/config.hook';

const Login = () => {
  const user = useAppSelect((state) => state.user);

  const heykakao = () => {
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
