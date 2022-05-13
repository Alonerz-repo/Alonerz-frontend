import React, { useEffect } from "react";
import styled from "styled-components";
import { Grid, Button, Text } from "../elements";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { useAppSelect, useAppDispatch } from "../store/config.hook";
import { getCookie } from "../utils/cookie";
import { getTodayList } from "../store/slices/PartyListSlice";
import { authAxios } from "../axios/authAxios";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelect((state) => state.user);
  const gruops = useAppSelect((state) => state.tempList);
  const click = () => {
    console.log("hello main AM/PM button!");
    navigate("/list");
  };

  useEffect(() => {
    authAxios.auth();
    dispatch(getTodayList());
    console.log();
  }, []);
  const goToLink = (num: number) => {
    switch (num) {
      case 1:
        return navigate("/login");
      case 2:
        return navigate("/user");
      case 3:
        return navigate("/edit/partyInfo");
      case 4:
        return navigate("/list");
      default:
        return navigate("/");
    }
  };

  return (
    <React.Fragment>
      <Grid>
        <Button _onClick={() => goToLink(1)}>로그인</Button>
        <Button _onClick={() => goToLink(2)}>프로필</Button>
        <Text type="title"> 오늘 점심 파티 잊지 마세요! </Text>
        {gruops.groups.map((value: any, index) => {
          return (
            <React.Fragment>
              <Card
                title={value.title}
                limit={value.limit}
                headcount={value.join}
                address1={value.placeName}
                startAt={value.startAt}
                endAt={value.endAt}
                src={value.imageUrl}
              ></Card>
            </React.Fragment>
          );
        })}

        <Text> 오늘 파티가 열렸어요! </Text>
        <BoxAM>
          <Text type="title"> 아침 점심 입니다! </Text>
          <Text>time</Text>
          <Button _onClick={() => goToLink(3)}>1</Button>
          <Button _onClick={() => goToLink(4)}>2</Button>
        </BoxAM>
        <BoxPM>
          <Text type="title"> 저녁입니다! </Text>
          <Text>time</Text>
          <Button _onClick={() => goToLink(3)}>1</Button>
          <Button _onClick={() => goToLink(4)}>2</Button>
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
