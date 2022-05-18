import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, Text, Image } from "../elements";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import useUser from "../useCustom/useUser";
import { useAppSelect } from "../store/config.hook";
import BtnAction from "./MyInfo.BtnAction";
import GridTxt from "./MyInfo.GridTxt";

import { Career } from "../utils/career";

const MyInfo = ({ uid, group }: any) => {
  const navigate = useNavigate();
  //엑시오스로 유저정보를 받아옵니다.
  const user = useUser(uid);
  const myid = useAppSelect((state) => state.user);

  const [carId, setCarId] = useState<number>(1);
  const b = Career;
  const v = b.map((value) => {
    if (value.careerId === carId) {
      return `${value.careerGroupName} / ${value.careerItemName}`;
    }
  });

  // const findCareer = (careerId: any) =>
  //   Career.find((career) => career.careerId === careerId);
  // const careerGroups = () =>
  //   Career.reduce(
  //     (arr: any[], row: any) =>
  //       arr.includes(row.careerGroupName) ? arr : [...arr, row.careerGroupName],
  //     []
  //   );
  // const careerItems = (groupName: any) =>
  //   Career.filter((career) => career.careerGroupName === groupName);

  // const test = () => {
  //   const result = findCareer(1);
  //   const result2 = careerGroups();
  //   const result3 = careerItems("개발직군");
  //   console.log(result);
  //   console.log(result2);
  //   console.log(result3);
  // };
  // useEffect(() => {
  //   test();
  // }, []);

  //엑시오스로 받아온 유저정보를 스테이트에 저장합니다.
  useEffect(() => {
    setCarId(user.careerId);
  }, [user]);

  //팔로우 페이지에 넘어가기전 props로 팔로잉/팔로우, 유저아이디를 전달합니다.
  const goToFollow = (isfollow: string) => {
    navigate(`follow`, { state: { isfollow, uid } });
  };

  return (
    <React.Fragment>
      <Grid>
        {/* 프로필 백그라운드 */}
        <ProfileBG />
        {/* 프로필 이미지 */}
        <ImgPosition>
          <Image shape="rectangle"></Image>
        </ImgPosition>
        {/* 프로필 글씨 */}
        <Position style={{ position: "absolute", top: "1px" }}>
          <Grid display="flex" flexFlow="column wrap">
            <Mytxt style={{ fontSize: "13px", fontWeight: "bold" }}>
              {b.map((value) => {
                if (value.careerId === carId) {
                  return `${value.careerGroupName} / ${value.careerItemName}`;
                }
              })}
            </Mytxt>
            <Mytxt style={{ fontSize: "20px", color: "#F24141" }}>
              {v} {user.year}
            </Mytxt>
            <Mytxt style={{ margin: "0px 30px" }}>
              {user.nickname} 입니다.
            </Mytxt>
          </Grid>
        </Position>
      </Grid>

      {/* 유저 정보(팔로우, 팔로잉) */}
      <Grid isFlex>
        <GridTxt text="참가회수" point={user.point} />
        <GridTxt
          text="follow"
          point={user.following}
          _onClick={() => goToFollow("following")}
        />
        <GridTxt
          _onClick={() => goToFollow("follower")}
          text="follower"
          point={user.follower}
        />
        {/* 유저 정보(팔로우, 내정보수정, 개인톡) */}
        <BtnAction myId={myid.userId} yourId={uid} />
      </Grid>

      <Line />

      <Text customize="margin: 0px 0px 23px 20px; font-weight: bold;">
        내가 참가한 파티...
      </Text>

      <Grid isFlex padding="20px">
        {group.map((value: any, index: number) => {
          return (
            <Card
              key={index}
              src={value.imageUrl}
              title={value.title}
              address={value.placeName}
              limit={value.limit}
              headcount={value.join}
              isFlex
            />
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

const ProfileBG = styled.div`
  width: 183px;
  height: 336px;
  background: #ffd9d9;
  border-radius: 20px 0px 0px 20px;
  position: relative;
  right: -53%;
`;

const Line = styled.div`
  border: 2px solid #f5f5f5;
  margin: 38px 0px;
`;

const Mytxt = styled.p``;
const Position = styled.div``;
const ImgPosition = styled(Position)`
  position: absolute;
  width: 100%;
  top: 50px;
  left: 50px;
`;

export default MyInfo;
