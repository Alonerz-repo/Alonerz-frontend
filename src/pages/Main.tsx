import React from "react";
import styled from "styled-components";
import { Grid, Button } from "../elements";
import Card from "../components/Card";
import Image from "../elements/Image";
import PartyMembers from "../components/PartyMembers";

const Main = () => {
  return (
    <React.Fragment>
      <GRID style={{ flexDirection: "column" }}>
        {/* 상단 헤드 */}
        <Image shape="rectangle"></Image>
        <Image shape="circle" size="200px"></Image>
        <PartyMembers></PartyMembers>
        <Grid isFlex>
          {/* <Grid>
            <Button>햄버거</Button>
          </Grid>
          <Grid>
            <Button>검색</Button>
            <Button>내정보</Button>
          </Grid> */}
        </Grid>

        {/* 오늘 참여중인 파티  */}

        <TEXT>오늘의 참여중인 파티</TEXT>
        <Grid padding="20px">
          <Grid>
            <Card title="BHC" address1="남구로" headcount={2} limit={4}></Card>
          </Grid>
        </Grid>

        {/* 전체, 점심, 저녁 버튼 */}

        <Grid>
          {/* <Button isCategory>전체</Button>
          <Button isCategory>점심</Button>
          <Button isCategory>저녁</Button> */}
        </Grid>

        {/* 주변에서 진행중인 파티 */}

        <Grid>
          <DIV>
            <TEXT>주변에서 진행중인 파티</TEXT>
          </DIV>
          <Grid isFlex>
            <Grid isFlex>
              <DIV
                style={{
                  width: "70px",
                  height: "30px",
                  padding: "6px 10px",
                  background: "#EEEEEE",
                  borderRadius: "100px",
                  textAlign: "center",
                }}
              >
                12 : 00
              </DIV>
              <DIV style={{ margin: "0px 10px" }}>-</DIV>
              <DIV
                style={{
                  width: "70px",
                  height: "30px",
                  padding: "6px 10px",
                  background: "#EEEEEE",
                  borderRadius: "100px",
                  textAlign: "center",
                }}
              >
                13 : 00
              </DIV>
            </Grid>

            <DIV style={{ position: "absolute", margin: "6px", right: "5vw" }}>
              정렬순
            </DIV>
          </Grid>
        </Grid>

        {/* 모임 리스트 뷰 */}

        <Grid>
          <Grid isFlex padding="10px">
            <Card
              isFlex
              title="모임1"
              address1="장소1"
              headcount={3}
              limit={4}
            ></Card>
            <Card
              isFlex
              title="모임2"
              address1="장소2"
              headcount={1}
              limit={4}
            ></Card>
            <Card
              isFlex
              title="모임3"
              address1="장소3"
              headcount={4}
              limit={4}
            ></Card>
            <Card
              isFlex
              title="모임4"
              address1="장소4"
              headcount={2}
              limit={4}
            ></Card>
          </Grid>
        </Grid>
      </GRID>
    </React.Fragment>
  );
};

const GRID = styled.div`
  border: 2px solid;
  display: flex;
  width: 100%;
  box-sizing: border-box;
`;

const DIV = styled.div`
  box-sizing: border-box;
`;
const TEXT = styled.div``;
export default Main;
