import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Image, Grid, Text, Button } from "../elements";
import userAxios from "../axios/userAxios";
import Header from "../components/Header";

const initUser = [
  {
    careerId: null,
    description: null,
    nickname: "1652270551546",
    point: 0,
    profileImageUrl: "",
    userId: -1,
    year: null,
  },
];

const BlockList = () => {
  const [list, setList] = useState(initUser);
  useEffect(() => {
    const test = async () => {
      await userAxios.getBlockList().then((res) => {
        console.log(res.data);
      });
    };

    test();
    console.log(list[0]);
  }, []);
  return (
    <React.Fragment>
      <Header text="차단목록"></Header>
      <Grid>
        <Grid display="flex" padding="20px 20px">
          <Image size="44px" src={list[0].profileImageUrl}></Image>
          <Grid padding="3px 14px">
            <Text>{list[0].nickname}</Text>
            <Text>{list[0].careerId}</Text>
          </Grid>
          <Position>
            <Button>차단 해제</Button>
          </Position>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Position = styled.div`
  position: absolute;
  right: 20px;
`;

export default BlockList;
