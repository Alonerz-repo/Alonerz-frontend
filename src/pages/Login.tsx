import React from "react";
import styled from "styled-components";
import loginAxios from "../axios/loginAxios";
import { Grid } from "../elements";
import HeaderModule from "../assets/header";

const Login = () => {
  const a = HeaderModule.findById(1);
  return (
    <React.Fragment>
      <Grid>
        <Position style={{ top: "20vh" }}>
          <img src={a?.image} alt="Alonerz" />
        </Position>
        <Position
          style={{
            flexFlow: "column wrap",
            top: "60vh",
          }}
        >
          <img src={a?.image} alt="noti" />
          <img
            onClick={loginAxios.kakaoLogin}
            src={a?.image}
            alt="kakaologin"
            style={{
              cursor: "pointer",
            }}
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
