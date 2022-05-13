import React, { useState, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Grid, Text, Button } from "../elements";
import MyProfileBox from "../components/ProfileBox";

const ProfileEdit = ({ type }: any) => {
  const [state, setState] = useState(1);
  const test = useRef<any>();

  const click = () => {
    console.log("hello click!");
    console.log(test.current);
  };

  return (
    <React.Fragment>
      <Header text="프로필 편집"></Header>
      <h1>hello world</h1>
      <Grid isFlex>
        <Box style={{ width: "220px", height: "288px" }}></Box>
        <Box style={{ width: "158px", height: "288px" }}></Box>
      </Grid>
      <Grid display="flex" justifyContent="flex-start">
        <Button _onClick={() => setState(1)}>캐릭터</Button>
        <Button _onClick={() => setState(2)}>스티커</Button>
        <Button _onClick={() => setState(3)}>배경색상</Button>
      </Grid>
      <Grid isFlex>
        <MyProfileBox ref={test} index={state} _onClick={click}></MyProfileBox>
      </Grid>
    </React.Fragment>
  );
};

ProfileEdit.defaultProps = {
  type: "color",
};

const Box = styled.div`
  background: #eeeeee;
  border-radius: 20px;
`;
export default ProfileEdit;
