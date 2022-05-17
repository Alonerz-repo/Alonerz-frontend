import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Image, Grid, Text, Button } from "../elements";
import PartyMember from "../components/PartyMember";
import KakaoMap from "../components/KakaoMap";
import Header from "../components/Header";
import { partyAxios, GroupInfo } from "../axios/partyAxios";
import { useAppSelector } from "../store/config";
import useGetparty from "../useCustom/useGetparty";

const PartyInfo = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const group = useGetparty(groupId);

  const handleJoin = (action: string) => {
    const join = async () => {
      if (groupId) {
        await partyAxios
          .joinParty(parseInt(groupId), action)
          .then((response) => {
            navigate("/");
          })
          .catch((err) => {
            alert(err);
          });
      }
      join();
    };
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

        {group.guests.map((guest: any, i: number) => {
          return (
            <PartyMember
              key={i}
              nickname={guest.nickname}
              src={guest.profileImageUrl}
            ></PartyMember>
          );
        })}
      </Grid>
      <Grid absolute="position:sticky; bottom:0; z-index:2;">
        {user.userId === group.host.userId ? (
          <Grid isFlex>
            <Button
              width="50%"
              _onClick={() => {
                navigate(`/edit/partyInfo/${group.groupId}`);
              }}
            >
              수정하기
            </Button>
            <Button
              width="50%"
              _onClick={() => {
                if (group.groupId) {
                  partyAxios.deleteParty(group.groupId);
                  navigate("/");
                }
              }}
            >
              대충 삭제
            </Button>
          </Grid>
        ) : group.guests.findIndex((v: any) => v.userId === user.userId) ? (
          <Button
            _onClick={() => {
              handleJoin("join");
            }}
            width="100%"
          >
            파티 나가기
          </Button>
        ) : (
          <Button
            width="100%"
            _onClick={() => {
              handleJoin("exit");
            }}
          >
            참가하기
          </Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default PartyInfo;
