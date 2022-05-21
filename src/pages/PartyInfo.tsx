import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Image, Grid, Text, Button } from "../elements";
import PartyMember from "../components/PartyMember";
import KakaoMap from "../components/KakaoMap";
import Header from "../components/Header";
import { partyAxios, GroupInfo } from "../axios/partyAxios";
import { useAppSelector } from "../store/config";
import { findCareer } from "../utils/career";
import useGetparty from "../useCustom/useGetparty";
import Comment from "../components/Comment";

// 파티 정보 상세 페이지
const PartyInfo = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const group = useGetparty(groupId);

  // 사용자가 참여,나가기 버튼 클릭시 발생하는 event
  const handleJoin = async (action: string) => {
    if (groupId) {
      const data = await partyAxios.joinParty(groupId, action);
      switch (data.statusCode) {
        case 400:
          return alert(data.message);
        case 401:
          return alert(data.message);
        case 404:
          return alert(data.message);
        default:
          if (action === "exit") {
            alert("파티에서 나가셨습니다.");
          } else if (action === "join") {
            alert("파티에 참가하셨습니다.");
          }
          navigate("/");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit/partyInfo/${group.groupId}`);
  };

  const handleDelete = async () => {
    if (group.groupId) {
      const data = await partyAxios.deleteParty(group.groupId);
      switch (data.statusCode) {
        case 401:
          return alert(data.message);
        case 404:
          return alert(data.message);
        default:
          alert("파티를 삭제하셨습니다.");
          navigate("/");
      }
    }
  };
  const getCareer = (careerId: any) => {
    const car = findCareer(careerId);
    return `${car?.careerGroupName} / ${car?.careerItemName}`;
  };

  // 참여인원 정보 string
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
          {`${new Date(group.startAt).getMonth() + 1}월 ${new Date(
            group.startAt
          ).getDate()}일 ${new Date(group.startAt).getHours()}:00 ~ ${new Date(
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
          src={group.host.imageUrl}
          part={getCareer(group.host.careerId)}
          year={group.host.year}
        ></PartyMember>

        {group.guests.map((guest: any, i: number) => {
          return (
            <PartyMember
              key={i}
              nickname={guest.nickname}
              src={guest.imageUrl}
              part={getCareer(guest.careerId)}
              year={guest.year}
            ></PartyMember>
          );
        })}
      </Grid>
      {/* 코멘트 리스트 */}
      <Comment groupId={groupId} />

      <Grid absolute="position:sticky; bottom:0; z-index:2;">
        {user.userId === group.host.userId ? (
          <Grid isFlex>
            <Button
              width="50%"
              bg="#F84C40"
              color="white"
              _onClick={handleEdit}
            >
              수정하기
            </Button>
            <Button width="50%" _onClick={handleDelete}>
              삭제하기
            </Button>
          </Grid>
        ) : group.guests.findIndex((v: any) => v.userId === user.userId) !==
          -1 ? (
          <Button
            _onClick={() => {
              handleJoin("exit");
            }}
            width="100%"
          >
            파티 나가기
          </Button>
        ) : (
          <Button
            width="100%"
            _onClick={() => {
              handleJoin("join");
            }}
            bg="#F84C40"
            color="white"
          >
            참가하기
          </Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default PartyInfo;
