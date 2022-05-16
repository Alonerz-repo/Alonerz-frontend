import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../elements";
import { useNavigate } from "react-router-dom";

const ConfigList = () => {
  const margin = "20px";
  const navigate = useNavigate();
  const click = (id: number) => {
    switch (id) {
      case 1:
        return navigate("edit");
      case 5:
        return navigate("blocklist");
      default:
        return navigate("/");
    }
  };
  return (
    <React.Fragment>
      <Grid>
        <Position onClick={() => click(1)}>
          <Text margin={margin}>내정보 수정</Text>
          <Line></Line>
        </Position>
        <Position onClick={() => click(2)}>
          <Text margin={margin}>내정보</Text>
          <Line></Line>
        </Position>
        <Position onClick={() => click(3)}>
          <Text margin={margin}>푸시알림</Text>
          <Line></Line>
        </Position>
        <Position onClick={() => click(4)}>
          <Text margin={margin}>리뷰관리</Text>
          <Line></Line>
        </Position>
        <Position onClick={() => click(5)}>
          <Text margin={margin}>차단정보</Text>
          <Line></Line>
        </Position>
        <Position onClick={() => click(6)}>
          <Text margin={margin}>공지사항</Text>
          <Line></Line>
        </Position>
        <Position onClick={() => click(7)}>
          <Text margin={margin}>버전정보</Text>
          <Line></Line>
        </Position>
      </Grid>
    </React.Fragment>
  );
};

const Position = styled.div`
  padding: 20px 20px 0px 20px;
`;
const Line = styled.div`
  border: 1px solid #757575;
`;

export default ConfigList;
