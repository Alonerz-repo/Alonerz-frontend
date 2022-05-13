import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Grid, Text, Button } from "../elements";

const ConsentForm = (porps: any) => {
  return (
    <React.Fragment>
      <Header text="파티개설"></Header>
      <Grid>
        <Box> 안녕하세요 이건 공지사항입니다. </Box>
        <Button width="100%">동의하기</Button>
      </Grid>
    </React.Fragment>
  );
};

const Box = styled.div`
  text-align: center;
  width: 350px;
  height: 622px;
  padding: 10px;
  border: 1px solid #eeeeee;
  border-radius: 10px;
`;

export default ConsentForm;
