import React from "react";
import Header from "../components/Header";
import useFollow from "../useCustom/useFollow";
import { useNavigate, useLocation } from "react-router-dom";
import { Image, Grid, Text } from "../elements";
import assets from "../assets/assets.json";

const defaultImage = assets.characters[0];

interface User {
  userId: string;
  imageUrl: string | null;
  nickname: string;
  careerId: number | null;
}

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
    return users.map((user: User, key: number) => {
      const { imageUrl, nickname, careerId, userId } = user;
      return (
        <Grid key={key}>
          <div onClick={() => goToUser(userId)}>
            <Grid display="flex" padding="20px 20px">
              <Image
                size="44px"
                src={imageUrl ? imageUrl : defaultImage}
              ></Image>
              <Grid padding="3px 14px">
                <Text>{nickname}</Text>
                <Text>{careerId}</Text>
              </Grid>
            </Grid>
          </div>
        </Grid>
      );
    });
  };

  return (
    <React.Fragment>
      <Header text={isfollow}></Header>
      {renderUsers()}
    </React.Fragment>
  );
};

export default FollowList;
