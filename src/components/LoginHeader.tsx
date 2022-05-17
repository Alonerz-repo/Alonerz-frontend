import React from "react";
import { Grid, Button } from "../elements";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/config";
import { kakaoLogout } from "../store/slices/userSlice";

const LoginHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const onLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      dispatch(kakaoLogout());
    }
  };
  if (!user.userId) {
    return (
      <React.Fragment>
        <Wrap>
          <Grid isFlex>
            <Grid></Grid>
            <Button
              _onClick={() => {
                navigate(`/login`);
              }}
            >
              로그인
            </Button>
          </Grid>
        </Wrap>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Wrap>
        <Grid isFlex>
          <Grid></Grid>
          <Grid>
            <Button
              _onClick={() => {
                navigate(`/user/${user.userId}`);
              }}
            >
              프로필
            </Button>
            <Button _onClick={onLogout}>로그아웃</Button>
          </Grid>
        </Grid>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  position: sticky;
  text-align: center;
  top: 0px;
  z-index: 2;
  background-color: white;
`;

interface GoBackProps {
  src: string;
  size: string;
}
const Icon = styled.div<GoBackProps>`
  --size: ${(props) => props.size};
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

export default LoginHeader;
