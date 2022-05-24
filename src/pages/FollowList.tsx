import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import useFollow from "../useCustom/useFollow";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Image, Text } from "../elements";
import { careerUtils } from "../utils/asset";

interface user {
  careerId: number;
  characterImageId: number;
  description: string;
  nickname: string;
  point: number;
  profileImageUrl: string | null;
  userId: string;
  yearId: number;
}

const MyBtn = styled.button``;

const FollowList = () => {
  //상위 연결된 컴포넌트에서 navigate 옵션값으로 들어온 데이터를 uselocation함수로 받습니다.
  const { state }: any = useLocation();
  const navigate = useNavigate();
  const { uid, isfollow } = state;
  //유저의 팔로우/팔로잉 리스트를 커스텀 훅으로 받습니다.
  const users = useFollow(uid, isfollow);

  //리스트를 클릭했을떄, 상대방 유저프로필로 이동합니다.
  const goToUser = (userId: string) => {
    navigate(`/user/${userId}`);
  };

  const renderUsers = () => {
    if (users !== undefined) {
      const results = users.map((value: user, key: number) => {
        const { nickname, careerId, userId } = value;
        const groupItem = careerUtils.findById(careerId);

        return (
          <Grid key={key}>
            <div onClick={() => goToUser(userId)}>
              <Grid display="flex" padding="20px 20px">
                <Image size="44px"></Image>
                <Grid padding="3px 14px">
                  <Text>{nickname}</Text>
                  <Text>
                    {groupItem?.group} / {groupItem?.item}
                  </Text>
                </Grid>
                <MyBtn>버튼</MyBtn>
              </Grid>
            </div>
          </Grid>
        );
      });
      return results;
    } else {
      return <React.Fragment></React.Fragment>;
    }
  };

  return (
    <React.Fragment>
      <Header text={isfollow}></Header>
      {renderUsers()}
    </React.Fragment>
  );
};

export default FollowList;
