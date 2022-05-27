import React from "react";
import styled from "styled-components";
import loginAxios from "../axios/loginAxios";
import { Grid } from "../elements";
import LoginModule from "../assets/login";

const Login = () => {
  return (
    <React.Fragment>
      <Grid>
        <Position style={{ top: "20vh" }}>
          <img src={LoginModule.rows[0].image} alt="Alonerz" />
        </Position>
        <Position
          style={{
            flexFlow: "column wrap",
            top: "60vh",
          }}
        >
          <img src={LoginModule.rows[2].image} alt="noti" />
          <img
            onClick={loginAxios.kakaoLogin}
            src={LoginModule.rows[1].image}
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
