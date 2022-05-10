import React, { useEffect } from "react";
import styled from "styled-components";
import { Grid, Button, Text } from "../elements";
import Card from "../components/Card";
import Image from "../elements/Image";
import PartyMembers from "../components/PartyMembers";
import { useNavigate } from "react-router-dom";
import { useAppSelect } from "../store/config.hook";
import { getCookie } from "../utils/cookie";

const Main = () => {
  const navigate = useNavigate();
  const user = useAppSelect((state) => state.user);
  useEffect(() => {
    const cookie = getCookie("accessToken");
    console.log(user);
    if (cookie) {
      console.log("getCookie");
    } else {
      console.log("not getCookie");
      navigate("/login");
    }
  }, []);
  const click = () => {
    console.log("hello main AM/PM button!");
    navigate("/list");
  };
  return (
    <React.Fragment>
      <Grid>
        <Text type="title"> 오늘 점심 파티 잊지 마세요! </Text>
        <Card title="asd" limit={4} headcount={2} address1="asdf"></Card>
        <Text> 오늘 파티가 열렸어요! </Text>
        <BoxAM>
          <Text type="title"> 안녕하세요? </Text>
          <Text>time</Text>
          <Button _onClick={click}>1</Button>
          <Button _onClick={click}>2</Button>
        </BoxAM>
        <BoxPM>
          <Text type="title"> 안녕하세요? </Text>
          <Text>time</Text>
          <Button _onClick={click}>1</Button>
          <Button _onClick={click}>2</Button>
        </BoxPM>
      </Grid>
    </React.Fragment>
  );
};

const BoxAM = styled.div`
  width: 350px;
  height: 200px;
  background: linear-gradient(
      291.4deg,
      rgba(255, 255, 255, 0.7) 0.62%,
      rgba(255, 255, 255, 0) 97.95%
    ),
    #beefff;
  border-radius: 15px;
`;
const BoxPM = styled(BoxAM)`
  background: linear-gradient(
      111.03deg,
      rgba(28, 3, 98, 0.7) 2.61%,
      rgba(28, 3, 98, 0) 98.97%
    ),
    #7424f8;
  box-shadow: 0px 10px 30px rgba(36, 2, 133, 0.3);
`;

export default Main;
