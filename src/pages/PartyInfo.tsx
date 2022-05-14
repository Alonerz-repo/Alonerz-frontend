import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Image, Grid, Text } from "../elements";
import PartyMember from "../components/PartyMember";
import KakaoMap from "../components/KakaoMap";
import Header from "../components/Header";
import { partyAxios, GroupInfo } from "../axios/partyAxios";

const PartyInfo = () => {
  const [group, setGroup] = useState<GroupInfo>(partyAxios.initialState.group);
  const { groupId } = useParams();

  useEffect(() => {
    const t = async () => {
      try {
        if (groupId) {
          const result = await partyAxios.getPartyInfo(parseInt(groupId));
          setGroup(result);
        }
      } catch (err) {
        console.log(err);
      }
    };
    t();
  }, []);

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
          {group.address}
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
          {`${new Date(group.startAt).getHours()}:00 ~ ${new Date(
            group.endAt
          ).getHours()}:00`}
        </Text>

        <Text bold type="area" titleText="상세내용" margin="5px 0 5px 0">
          {group.description}
        </Text>

        <Text
          bold
          type="line"
          titleText={headCount}
          margin="10px 0 5px 0"
        ></Text>

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

        {/* <button onClick={test}>test</button> */}
      </Grid>
      <Grid isFlex>
        {/* <Button width="100%">참가....해야겠지?</Button> */}
      </Grid>
    </React.Fragment>
  );
};

export default PartyInfo;
