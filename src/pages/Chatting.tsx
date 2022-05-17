import React from "react";
import styled from "styled-components";
import { Grid, Text, Image, Button, Input } from "../elements";

const ChatRoom = () => {
  return (
    <React.Fragment>
      <div style={{ background: "#eeeeee", height: "100%" }}>
        {/* 상대방 메시지 */}
        <Grid display="flex" padding="20px 20px">
          <Image size="38px"></Image>
          <Grid>
            <Grid display="flex">
              <Text>hello?</Text>
              <Text>time</Text>
            </Grid>
            <div
              style={{
                display: "block",
                borderRadius: "15px",
                padding: "15px 12px",
                background: "#ffffff",
              }}
            >
              <Text>????</Text>
            </div>
          </Grid>
        </Grid>

        {/* 나의 메시지  */}

        <Grid display="flex" padding="20px 20px" justifyContent="end">
          <Grid customize="text-align: end;">
            <Text>name</Text>
            <Text>time</Text>
          </Grid>
          <Grid>
            <div
              style={{
                display: "block",
                borderRadius: "15px",
                padding: "15px 12px",
                background: "#F84C40",
                color: "white",
              }}
            >
              <Text>????</Text>
            </div>
          </Grid>
        </Grid>
        {/* 입력폼 */}
        <Position>
          <Grid>
            <input></input>
            <Button>입력</Button>
          </Grid>
        </Position>
      </div>
    </React.Fragment>
  );
};

const Position = styled.div`
  background: red;
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

export default ChatRoom;
