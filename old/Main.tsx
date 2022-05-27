import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Grid, Text } from "../elements";
import Card from "../components/Card";
import partyList from "../axios/partyList";
import { useAppSelect } from "../store/config.hook";
import Header from "../components/Header";

// 메인 페이지로써 사용자의 오늘 파티목록을 받아와 보여주는 컴포넌트
const Main = () => {
  const navigate = useNavigate();

  const [groups, setGroups] = React.useState<any>([]);

  const user = useAppSelect((state) => state.user);
  // 해당 페이지 접속시 사용자의 오늘의 파티 목록을 받아옴
  // 데이터의 최신화를 위해 redux를 사용하지 않고 페이지 접속 시마다 받아옴
  useEffect(() => {
    //get user groups list
    const getParty = async () => {
      const data = await partyList.getPartyList();
      switch (data.statusCode) {
        case 401:
          navigate("/login");
          return;
        case 500:
          return alert("서버 에러");
        default:
          setGroups(data);
      }
    };
    getParty();
  }, [user]);

  // 받아온 정보가 바뀌었을시 rerendering
  useEffect(() => {}, [groups]);

  const goToLink = (num: number) => {
    // 페이지 이동 함수
    switch (num) {
      // 아침 & 점심 그룹 생성
      case 10:
        return navigate(`/create/partyInfo/${num}`);
      case 4:
        return navigate("/list/lunch");
      case 5:
        return navigate("/list/dinner");

      // 저녁 & 야식 그룹 생성
      case 17:
        return navigate(`/create/partyInfo/${num}`);
      default:
        return navigate("/");
    }
  };

  return (
    <React.Fragment>
      <Header text="Alonerz" type="main"></Header>

      <Grid padding="20px">
        {groups.length !== 0 && (
          <React.Fragment>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  background: "#814BF5",
                  color: "#fff",
                  padding: "9px 10px",
                  textAlign: "center",
                  borderRadius: "20px",
                  margin: "0px 9px 0px 0px",
                }}
              >
                D-day
              </div>
              <h2> 오늘 파티 잊지 마세요! </h2>
            </div>
          </React.Fragment>
        )}
        {/* 유저 정보가 있다면 리스트를 보여줌 */}
        {user.userId &&
          groups.map((value: any, index: number) => {
            return (
              <React.Fragment key={index}>
                <Card
                  categoryId={value.categoryId}
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
        <BoxAM style={{ backgroundSize: "cover" }}>
          <Grid padding="20px">
            <Text bold>아침&점심 파티 </Text>
            <Text>오전 9시 00분 ~ 오후 4시 59분</Text>
            <div style={{ position: "absolute", width: "100%", top: "16vh" }}>
              <PartyButton
                style={{ margin: "0px 10px 0px 0px" }}
                bg="#F84C40"
                onClick={() => goToLink(10)}
              >
                개설하기
              </PartyButton>
              <PartyButton bg="#F84C40" onClick={() => goToLink(4)}>
                참가하기
              </PartyButton>
            </div>
          </Grid>
        </BoxAM>

        {/* 밤 파티 개설 / 조회 박스 */}
        <BoxPM style={{ backgroundSize: "cover" }}>
          <Grid padding="20px">
            <Text bold customize="color: #FFFFFF;">
              저녁&야식 파티
            </Text>
            <Text customize="color: #FFFFFF;">오후 5시 ~ 오후 11시 59분</Text>
            <div style={{ position: "absolute", width: "100%", top: "16vh" }}>
              <PartyButton
                style={{ margin: "0px 10px 0px 0px" }}
                bg="#5825C8"
                onClick={() => goToLink(17)}
              >
                개설하기
              </PartyButton>
              <PartyButton bg="#5825C8" onClick={() => goToLink(5)}>
                참가하기
              </PartyButton>
            </div>
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
  height: 200px;
  background-image: url("/static/media/3.9eef754780995abf9911.png");
  /* background: linear-gradient(
      291.4deg,
      rgba(255, 255, 255, 0.7) 0.62%,
      rgba(255, 255, 255, 0) 97.95%
    ),
    #beefff; */
  /* border-radius: 15px;
  margin-bottom: 20px; */
`;

const BoxPM = styled.div`
  height: 200px;
  background-image: url("/static/media/4.287b214b87389ab9bb19.png");
  /* background: linear-gradient(
      111.03deg,
      rgba(28, 3, 98, 0.7) 2.61%,
      rgba(28, 3, 98, 0) 98.97%
    ),
    #7424f8; */
  /* box-shadow: 0px 10px 30px rgba(36, 2, 133, 0.3); */
`;

export default Main;
