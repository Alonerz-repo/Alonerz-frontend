import React from "react";
import { Image, Grid, Text } from "../elements";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import useFollow from "../useCustom/useFollow";

const FollowList = () => {
  const { state }: any = useLocation();
  const { uid, isfollow } = state;
  const list = useFollow(uid, isfollow);
  return (
    <React.Fragment>
      <Header text={state.isfollow}></Header>
      {list !== undefined &&
        list.users.map((value: any, index: number) => {
          return (
            <Grid key={index}>
              <Grid display="flex" padding="20px 20px">
                <Image
                  size="44px"
                  src={value.profileImageUrl ? value.profileImageUrl : ""}
                ></Image>
                <Grid padding="3px 14px">
                  <Text>{value.nickname}</Text>
                  <Text>{value.careerId}</Text>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
    </React.Fragment>
  );
};

export default FollowList;
