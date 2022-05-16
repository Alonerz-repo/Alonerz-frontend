import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Image, Grid, Text, Button } from "../elements";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

const initUser = [
  {
    careerId: null,
    description: null,
    nickname: "asd",
    point: 0,
    profileImageUrl: "",
    userId: -1,
    year: null,
  },
];

const FollowList = () => {
  const { state }: any = useLocation();
  const [list, setList] = useState(initUser);
  useEffect(() => {
    console.log(state);
    // const test = async () => {
    //   await userAxios.getBlockList().then((res) => {
    //     console.log(res.data);
    //   });
    // };
    // test();
    switch (state.isfollow) {
      case "follower":
        return setList(state.follower);
      case "following":
        return setList(state.following);
    }
  }, []);
  return (
    <React.Fragment>
      <Header text="팔로우"></Header>
      <Grid>
        <Grid display="flex" padding="20px 20px">
          <Image
            size="44px"
            src={list[0].profileImageUrl ? list[0].profileImageUrl : ""}
          ></Image>
          <Grid padding="3px 14px">
            <Text>{list[0].nickname}</Text>
            <Text>{list[0].careerId}</Text>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Position = styled.div`
  position: absolute;
  right: 20px;
`;

export default FollowList;
