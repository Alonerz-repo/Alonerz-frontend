import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid, Text, Image } from "../elements";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import useUser from "../useCustom/useUser";
import { Career } from "../utils/career";
import { useAppSelect } from "../store/config.hook";
import BtnAction from "./MyInfo.BtnAction";
import GridTxt from "./MyInfo.GridTxt";

const MyInfo = ({ uid, group }: any) => {
  const navigate = useNavigate();
  const user = useUser(uid);
  const myid = useAppSelect((state) => state.user);
  const [carId, setCarId] = useState<number>(1);
  const b = Career;
  const v = b.map((value) => {
    if (value.careerId === carId) {
      return `${value.careerGroupName} / ${value.careerItemName}`;
    }
  });

  useEffect(() => {
    setCarId(user.careerId);
  }, [user]);

  const goToFollow = (isfollow: string) => {
    navigate(`follow`, { state: { isfollow, uid } });
  };

  return (
    <React.Fragment>
      <Grid>
        <ProfileBG />
        <ImgPosition>
          <Image shape="rectangle"></Image>
        </ImgPosition>

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
