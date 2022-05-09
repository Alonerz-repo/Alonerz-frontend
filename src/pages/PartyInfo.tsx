import React from "react";
import { Image, Grid, Text, Button } from "../elements";
import PartyMembers from "../components/PartyMembers";
import KakaoMap from "../components/KakaoMap";
import { getPartyInfo } from "../store/slices/partyInfoSlice";
import { useAppSelector, useAppDispatch } from "../store/config";

const PartyInfo = () => {
  const { group } = useAppSelector((state) => state.party);
  const dispatch = useAppDispatch();
  const test = () => {
    dispatch(getPartyInfo());
  };
  console.log(group);
  return (
    <React.Fragment>
      <button onClick={test}>test</button>
      <Image shape="rectangle" src={group.imageUrl}></Image>
      <Grid padding="20px">
        <Text bold type="title" titleText={group.title}>
          asd
        </Text>
        <Text type="line" titleText="장소" margin="5px 0 5px 0">
          {group.address1 ?? group.address2}
        </Text>

        {/* 카카오 맵 */}
        <KakaoMap
          latitude={group.locationX}
          longitude={group.locationY}
        ></KakaoMap>

        <Text type="line" titleText="메뉴" margin="5px 0 5px 0">
          {group.menu}
        </Text>
        <Text bold type="line" titleText="시간" margin="5px 0 5px 0">
          {group.startAt}~{group.endAt}
        </Text>
        <Text bold type="area" titleText="상세내용" margin="5px 0 5px 0">
          {group.description}
        </Text>
      </Grid>
      <Grid isFlex>
        {/* <Button width="100%">참가....해야겠지?</Button> */}
      </Grid>
    </React.Fragment>
  );
};

export default PartyInfo;
