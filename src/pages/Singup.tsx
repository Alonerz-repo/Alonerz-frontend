import React, { useEffect } from "react";
import styled from "styled-components";
import { Grid, Input, Button } from "../elements";
import { useAppDispatch, useAppSelector } from "../store/config";
import { getUser } from "../store/slices/userSlice";

const Signup = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user);

  const click = () => {
    console.log("hello signup!");
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <React.Fragment>
      <Grid>
        <Input
          value={userInfo.nickname}
          text="닉네임"
          placeholder="닉네임입력"
        ></Input>

        <Grid display="flex" flexFlow="columns wrap">
          <Div>
            <Input width="80%" text="직군" placeholder=""></Input>
          </Div>
          <Div>
            <Input width="80%" text="직업" placeholder=""></Input>
          </Div>
        </Grid>

        <Input
          value={userInfo.year ? userInfo.year : "year is not init"}
          text="연차"
          placeholder=""
        ></Input>
        <Input
          value={
            userInfo.description
              ? userInfo.description
              : " description is not init "
          }
          text="나를 표현하는 한마디"
          placeholder=""
        ></Input>
      </Grid>
      <Button _onClick={click}> 회원 가입 </Button>
    </React.Fragment>
  );
};

const Div = styled.div`
  display: flex;
  margin: 10px 10px 10px 10px;
`;

export default Signup;
