import React from "react";
import { Image, Grid, Text } from "../elements";
import styled from "styled-components";
import PartyMembers from "../components/PartyMembers";
import KakaoMap from "../components/KakaoMap";

interface PartyInfoProps {
  title: string;
  menu: string;
  address1: string;
  address2: string;
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
  return (
    <React.Fragment>
      <Image shape="rectangle"></Image>
      <Grid padding="20px">
        <h2>{title}</h2>
        <text style={{ fontWeight: "700" }}>장소 </text>
        <text>{address1} </text>
        <text>{address2} </text>
        <KakaoMap
          latitude={37.56851724054563}
          longitude={126.9744523105797}
        ></KakaoMap>
        <p>{menu}</p>
        <Text bold>
          시간 {startAt}~{endAt}
        </Text>
        <Text bold>상세내용</Text>
        <PartyMembers></PartyMembers>
      </Grid>
    </React.Fragment>
  );
};

interface Map {
  children: any;
}

const MapDiv = styled.div<Map>`
  border: 1px solid black;
`;

export default PartyInfo;
