import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Grid, Text } from "../elements";
import Card from "../components/Card";
import partyList from "../axios/partyList";
import { useAppSelect, useAppDispatch } from "../store/config.hook";
import { authUser } from "../store/slices/userSlice";
import LoginHeader from "../components/LoginHeader";

// 메인 페이지로써 사용자의 오늘 파티목록을 받아와 보여주는 컴포넌트
const Main = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [groups, setGroups] = React.useState<any>([]);

  const user = useAppSelect((state) => state.user);

  // 해당 페이지 접속시 사용자의 오늘의 파티 목록을 받아옴
  // 데이터의 최신화를 위해 redux를 사용하지 않고 페이지 접속 시마다 받아옴
  useEffect(() => {
    //로그인 검사 dispatch 쿠키에 엑세스코드를 찾아서 서버를 통해 인증을 확인한후 유저State에 데이터를 넣습니다.
    dispatch(authUser());

    //get user groups list
    const getParty = async () => {
      const data = await partyList.getPartyList();
      switch (data.statusCode) {
        case 401:
          setGroups([]);
          return;
        default:
          setGroups(data);
      }
    };
    getParty();
  }, [user]);

  // 사용자 인증
  useEffect(() => {
    dispatch(authUser());
  }, []);

  // 받아온 정보가 바뀌었을시 rerendering
  useEffect(() => {}, [groups]);

  const goToLink = (num: number) => {
    // 페이지 이동 함수
    switch (num) {
      case 10:
        return navigate(`/create/partyInfo/${num}`);
      case 4:
        return navigate("/list/lunch");
      case 5:
        return navigate("/list/dinner");
      case 17:
        return navigate(`/create/partyInfo/${num}`);
      default:
        return navigate("/");
    }
  };

  return (
    <React.Fragment>
      <LoginHeader></LoginHeader>
      <Grid padding="20px">
        {groups.length !== 0 && (
          <Text type="title"> 오늘 파티 잊지 마세요! </Text>
        )}
        {/* 유저 정보가 있다면 리스트를 보여줌 */}
        {user.userId &&
          groups.map((value: any, index: number) => {
            return (
              <React.Fragment key={index}>
                <Card
                  title={value.title}
                  limit={value.limit}
                  headcount={value.join}
                  address={value.address}
                  startAt={new Date(value.startAt)}
                  endAt={new Date(value.endAt)}
                  src={value.imageUrl}
                  _onClick={() => {
                    navigate(`/participate/${value.groupId}`);
                  }}
                ></Card>
              </React.Fragment>
            );
          })}
        <h2>🎉 오늘 파티가 열렸어요! </h2>
        {/* 아침 파티 개설 / 조회 박스 */}
        <BoxAM>
          <Grid padding="20px">
            <Text type="title">🍖 아침&점심 파티 </Text>
            <Text>10:00 ~ 16:00</Text>
            <Grid isFlex absolute="margin-top:25px">
              <PartyButton bg="#46a6fe" onClick={() => goToLink(10)}>
                개설하기
              </PartyButton>
              <PartyButton bg="#46a6fe" onClick={() => goToLink(4)}>
                참가하기
              </PartyButton>
            </Grid>
          </Grid>
        </BoxAM>

        {/* 밤 파티 개설 / 조회 박스 */}
        <BoxPM>
          <Grid padding="20px">
            <Text type="title" customize="color: antiquewhite;">
              🍻 저녁&야식 파티{" "}
            </Text>
            <Text customize="color: antiquewhite;">17:00 ~ 00:00</Text>
            <Grid isFlex absolute="margin-top:25px">
              <PartyButton bg="#7F31FF" onClick={() => goToLink(17)}>
                개설하기
              </PartyButton>
              <PartyButton bg="#7F31FF" onClick={() => goToLink(5)}>
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
