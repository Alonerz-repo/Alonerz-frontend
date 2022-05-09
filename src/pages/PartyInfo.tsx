import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Image, Grid, Text, Button } from "../elements";
import PartyMember from "../components/PartyMember";
import KakaoMap from "../components/KakaoMap";
import { getPartyInfo } from "../store/slices/partyInfoSlice";
import { useAppSelector, useAppDispatch } from "../store/config";
import Header from "../components/Header";

const PartyInfo = () => {
  const { group } = useAppSelector((state) => state.party);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const test = async () => {
    try {
      await dispatch(getPartyInfo(1));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const headCount = `참여인원(${group.guests.length + 1}/${group.limit})`;
  return (
    <React.Fragment>
      <Header text="파티참가"></Header>

      <Image shape="rectangle" src={group.imageUrl}></Image>
      <Grid padding="20px">
        <Text
          bold
          type="title"
          titleText={group.title}
          margin="0 0 5px 0"
        ></Text>
        <Text type="line" titleText="장소" margin="5px 0 5px 0">
          {group.address1 ?? group.address2}
        </Text>

        {/* 카카오 맵 */}
        <KakaoMap
          latitude={group.locationX}
          longitude={group.locationY}
          placeName={group.placeName}
        ></KakaoMap>

        <Text type="line" titleText="메뉴" margin="5px 0 5px 0">
          {group.menu}
        </Text>

        <Text bold type="line" titleText="시간" margin="5px 0 5px 0">
          {group.startAt} ~ {group.endAt}
        </Text>

        <Text bold type="area" titleText="상세내용" margin="5px 0 5px 0">
          {group.description}
        </Text>

        <Text bold type="line" titleText={headCount} margin="10px 0 5px 0">
          {}
        </Text>

        <PartyMember
          captain
          nickname={group.host.nickname}
          src={group.host.profileImageUrl}
        ></PartyMember>

        {group.guests.map((guest, i) => {
          return (
            <PartyMember
              key={i}
              nickname={guest.nickname}
              src={guest.profileImageUrl}
            ></PartyMember>
          );
        })}

        <button onClick={test}>test</button>
      </Grid>
      <Grid isFlex>
        {/* <Button width="100%">참가....해야겠지?</Button> */}
      </Grid>
    </React.Fragment>
  );
};

export default PartyInfo;
