import React, { useEffect } from "react";
import styled from "styled-components";
import { Grid, Button, Text } from "../elements";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { useAppSelect, useAppDispatch } from "../store/config.hook";
import { getCookie } from "../utils/cookie";
import { getTodayList } from "../store/slices/PartyListSlice";
import { authAxios } from "../axios/authAxios";
import partyList from "../axios/partyList";
import { initialState } from "../axios/partyList";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelect((state) => state.user);
  const [groups, setGroups] = React.useState<any>(initialState);

  // useEffect(() => {
  //   const getParty = async () => {
  //     setGroups(await partyList.getPartyList());
  //   };
  //   getParty();
  //   console.log(groups);
  // }, []);

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
      <Grid padding="20px">
        <Button _onClick={() => goToLink(1)}>로그인</Button>
        <Button _onClick={() => goToLink(2)}>프로필</Button>
        <Text type="title"> 오늘 점심 파티 잊지 마세요! </Text>
        {groups.map((value: any, index: number) => {
          return (
            <React.Fragment key={index}>
              <Card
                title={value.title}
                limit={value.limit}
                headcount={value.join}
                address={value.address}
                startAt={value.startAt}
                endAt={value.endAt}
                src={value.imageUrl}
              ></Card>
            </React.Fragment>
          );
        })}

        <h2>🎉 오늘 파티가 열렸어요! </h2>
        <BoxAM>
          <Grid padding="20px">
            <Text type="title">🍖 아침&점심 파티 </Text>
            <Text>10:00 ~ 16:00</Text>
            <Grid isFlex absolute="margin-top:25px">
              <PartyButton bg="#46a6fe" onClick={() => goToLink(3)}>
                개설하기
              </PartyButton>
              <PartyButton bg="#46a6fe" onClick={() => goToLink(4)}>
                참가하기
              </PartyButton>
            </Grid>
          </Grid>
        </BoxAM>
        <BoxPM>
          <Grid padding="20px">
            <Text type="title" customize="color: antiquewhite;">
              🍻 저녁&야식 파티{" "}
            </Text>
            <Text customize="color: antiquewhite;">17:00 ~ 00:00</Text>
            <Grid isFlex absolute="margin-top:25px">
              <PartyButton bg="#7F31FF" onClick={() => goToLink(3)}>
                개설하기
              </PartyButton>
              <PartyButton bg="#7F31FF" onClick={() => goToLink(4)}>
                참가하기
              </PartyButton>
            </Grid>
          </Grid>
        </BoxPM>
      </Grid>
    </React.Fragment>
  );
};
// #7F31FF  #46a6fe
interface buttonProps {
  bg: string;
}
const PartyButton = styled.button<buttonProps>`
  margin: auto;
  width: 40%;
  height: 40px;
  border-radius: 15px;
  border: 0px;
  background-color: ${(props) => props.bg};
  color: white;
`;

const BoxAM = styled.div`
  height: 170px;
  background: linear-gradient(
      291.4deg,
      rgba(255, 255, 255, 0.7) 0.62%,
      rgba(255, 255, 255, 0) 97.95%
    ),
    #beefff;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const BoxPM = styled(BoxAM)`
  height: 170px;
  background: linear-gradient(
      111.03deg,
      rgba(28, 3, 98, 0.7) 2.61%,
      rgba(28, 3, 98, 0) 98.97%
    ),
    #7424f8;
  box-shadow: 0px 10px 30px rgba(36, 2, 133, 0.3);
`;

export default Main;
