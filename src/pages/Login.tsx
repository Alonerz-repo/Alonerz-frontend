import React from "react";
import styled from "styled-components";
import { Grid, Button } from "../elements";
import userAxios from "../axios/userAxios";

const Login = () => {
  return (
    <React.Fragment>
      <Grid>
        <Position>
          <Button _onClick={userAxios.login}>카카오 로그인</Button>
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
