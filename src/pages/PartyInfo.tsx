import React from "react";
import { Image, Grid, Text, Button } from "../elements";
import PartyMembers from "../components/PartyMembers";
import KakaoMap from "../components/KakaoMap";
import { getGroupInfo } from "../store/slices/groupDetailPage";
import { useAppSelector, useAppDispatch } from "../store/config";

interface PartyInfoProps {
  title: string;
  menu: string;
  address1?: string;
  address2?: string;
  startAt?: Date;
  endAt?: Date;
  locationX: Number;
  locationY: Number;
  limit: Number;
}

const PartyInfo = ({
  title,
  menu,
  address1,
  address2,
  locationX,
  locationY,
  startAt,
  endAt,
  limit,
}: PartyInfoProps) => {
  const dispatch = useAppDispatch();
  const test = () => {
    dispatch(getGroupInfo());
  };
  return (
    <React.Fragment>
      <button onClick={test}>test</button>
      <Image shape="rectangle"></Image>
      <Grid padding="20px">
        <Text bold type="title" titleText={title}>
          asd
        </Text>
        <Text type="line" titleText="장소" margin="5px 0 5px 0">
          {address1 ?? address2}
        </Text>

        {/* 카카오 맵 */}
        <KakaoMap latitude={37.483782} longitude={126.9003409}></KakaoMap>

        <Text type="line" titleText="메뉴" margin="5px 0 5px 0">
          {menu}
        </Text>
        <Text bold type="line" titleText="시간" margin="5px 0 5px 0">
          {startAt}~{endAt}
        </Text>
        <Text bold type="area" titleText="상세내용" margin="5px 0 5px 0">
          ???
        </Text>
        <PartyMembers></PartyMembers>
      </Grid>
      <Grid isFlex>
        {/* <Button width="100%">참가....해야겠지?</Button> */}
      </Grid>
    </React.Fragment>
  );
};

export default PartyInfo;
