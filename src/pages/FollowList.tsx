import React from "react";
import Header from "../components/Header";
import useFollow from "../useCustom/useFollow";
import { useLocation } from "react-router-dom";
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
  const { state }: any = useLocation();
  const { uid, isfollow } = state;
  const users = useFollow(uid, isfollow);

  const renderUsers = () => {
    return users.map((user: User, key: number) => {
      const { imageUrl, nickname, careerId } = user;
      return (
        <Grid key={key}>
          <Grid display="flex" padding="20px 20px">
            <Image size="44px" src={imageUrl ? imageUrl : defaultImage}></Image>
            <Grid padding="3px 14px">
              <Text>{nickname}</Text>
              <Text>{careerId}</Text>
            </Grid>
          </Grid>
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
