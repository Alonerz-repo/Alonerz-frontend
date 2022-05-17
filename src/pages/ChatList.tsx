import React from "react";
import styled from "styled-components";
import { Grid, Text, Button, Image } from "../elements";

const ChatList = () => {
  return (
    <React.Fragment>
      <div
        style={{
          position: "relative",
          alignItems: "center",
          margin: "20px",
          display: "flex",
        }}
      >
        <Image size="60px"></Image>
        <Grid display="relative">
          <Grid display="flex">
            <Text>닉네임</Text>
            <Text>직종/경력</Text>
          </Grid>
          <Grid>
            <Text>내용 ㅠㅠ;</Text>
          </Grid>
        </Grid>
        <Position>
          <Text>오늘</Text>
        </Position>
      </div>
    </React.Fragment>
  );
};

const Position = styled.div`
  position: absolute;
  right: 1px;
`;

export default ChatList;
