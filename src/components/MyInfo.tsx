import React from "react";
import styled from "styled-components";
import { Grid, Text, Image } from "../elements";
import { useNavigate } from "react-router-dom";
import useUser from "../useCustom/useUser";
import { useAppSelect } from "../store/config.hook";
import BtnAction from "./MyInfo.BtnAction";
import GridTxt from "./MyInfo.GridTxt";
import BackgroundModule from "../assets/background";
import CharacterModule from "../assets/characters";
import CareerModule from "../assets/career";
import YearModule from "../assets/year";
import StickerModule from "../assets/sticker";
import GroupCard from "../pages/GroupListPage/GroupCard";

interface Props {
  bg?: string;
}

const BG = styled.div`
  width: 183px;
  height: 336px;
  border-radius: 20px 0px 0px 20px;
  position: relative;
  right: -53%;
`;

const Line = styled.div`
  border: 2px solid #f5f5f5;
  margin: 38px 0px;
`;

const Position = styled.div``;
const ImgPosition = styled(Position)`
  position: absolute;
  top: 14vh;
  left: 40%;
`;

const CareerGroupDiv = styled.div`
  font-size: 13px;
  margin: 0px 20px;
`;

const CareerItemDiv = styled.div`
  font-size: 13px;
  color: #f24141;
  font-weight: 800;
  margin: 5px 20px;
`;

const NicknameDiv = styled.div`
  margin: 0 54px;
  display: flex;
`;

const Nickname = styled.p`
  margin: auto 10px auto auto;
  font-weight: 800;
`;

const NicknameIs = styled.p`
  margin: auto;
`;

const StickerBG = styled.div`
  position: absolute;
  width: 172px;
  height: 254px;
  top: 79px;
  left: 20px;
`;

const StickerImg = styled.img`
  position: absolute;
  width: 78px;
  height: 78px;
`;

interface Props {
  uid?: string;
  groups: any[];
}

const MyInfo = (props: Props) => {
  const { uid, groups } = props;
  const user = useAppSelect((state) => state.user);
  const navigate = useNavigate();

  //엑시오스로 유저정보를 받아옵니다.
  const {
    careerId,
    yearId,
    nickname,
    followingUserCount,
    followerUserCount,
    description,
    backgroundColorId,
    characterImageId,
    stickers,
  } = useUser(uid);

  //커리어 정보를 불러옵니다.
  const char = CharacterModule.findById(characterImageId);
  const career = CareerModule.findById(careerId);
  const years = YearModule.findById(yearId);
  const bgColor = BackgroundModule.findById(backgroundColorId);

  const getSticker = (index: number) => {
    const mySticker = stickers.map((value: any) => {
      const image = StickerModule.findById(value.stickerImageId);
      const order = value.stickerOrder;
      return { order, ...image };
    });
    const findSticker = mySticker.find((value) => value.order === index);
    return findSticker;
  };

  getSticker(1);
  //팔로우 페이지에 넘어가기전 props로 팔로잉/팔로우, 유저아이디를 전달합니다.
  const goToFollowings = () => navigate(`/users/followings/${uid}`);
  const goToFollowers = () => navigate(`/users/followers/${uid}`);

  // 내 커리어 정보
  const renderCareerAndNickname = () => {
    return (
      <Position style={{ position: "absolute", top: "1px" }}>
        <Grid display="flex" flexFlow="column wrap">
          <CareerGroupDiv>{description}</CareerGroupDiv>
          <CareerItemDiv>
            {career?.item} {years?.item}
          </CareerItemDiv>
          <NicknameDiv>
            <Nickname>{nickname}</Nickname>
            <NicknameIs>입니다.</NicknameIs>
          </NicknameDiv>
        </Grid>
      </Position>
    );
  };

  // 팔로우, 내정보수정, 개인톡 렌더링
  const renderFollows = () => {
    return (
      <>
        <Grid isFlex customize="margin: 39px 20px 33px 20px;">
          <GridTxt
            text="팔로워"
            point={followerUserCount}
            _onClick={goToFollowers}
          />
          <GridTxt
            text="팔로잉"
            point={followingUserCount}
            _onClick={goToFollowings}
          />
          <BtnAction myId={user.userId} yourId={uid} />
        </Grid>
      </>
    );
  };

  // 내 참여 그룹 목록
  const gridProps = { padding: "20px", isFlex: true };

  const renderGroups = () => {
    return (
      <>
        {groups.map((group, index) => {
          const { groupId } = group;
          const groupCardProps = {
            key: `${groupId}-${index}`,
            group,
            navigate,
          };
          return <GroupCard {...groupCardProps} />;
        })}
      </>
    );
  };

  return (
    <React.Fragment>
      <Grid>
        {/* 프로필 백그라운드 */}
        <BG style={{ background: `${bgColor?.color}` }} />

        <StickerBG>
          <StickerImg
            style={{
              top: "47px",
              left: "4px",
            }}
            src={getSticker(0)?.image}
            alt=""
          />

          <StickerImg
            style={{
              top: "9px",
              right: "4px",
            }}
            src={getSticker(1)?.image}
          />
          <StickerImg
            style={{
              bottom: "22px",
              left: "16px",
            }}
            src={getSticker(2)?.image}
          />
          <StickerImg
            style={{
              top: "121px",
              right: "-8px",
            }}
            src={getSticker(3)?.image}
          />
        </StickerBG>

        {/* 프로필 이미지 */}
        <ImgPosition>
          <Image shape="rectangle" src={char?.image} size="100px"></Image>
        </ImgPosition>
        {renderCareerAndNickname()}
      </Grid>
      {renderFollows()}
      <Line />
      <Text customize="margin: 0px 0px 23px 20px; font-weight: bold;">
        내가 참가한 파티...
      </Text>
      <Grid {...gridProps}>{renderGroups()}</Grid>
    </React.Fragment>
  );
};

export default MyInfo;
