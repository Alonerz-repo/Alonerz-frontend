import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Image, Grid, Text, Button } from "../elements";
import userAxios from "../axios/userAxios";
import Header from "../components/Header";

const Position = styled.div`
  position: absolute;
  right: 20px;
`;

const BlockList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const test = async () => {
      await userAxios.getBlockList().then((response) => {
        setUsers(response.data.users);
      });
    };
    test();
  }, []);

  return (
    <React.Fragment>
      <Header text="차단목록"></Header>
      {users.map((user, key) => {
        const { userId, nickname, imageUrl, careerId } = user;
        return (
          <Grid key={key}>
            <Grid display="flex" padding="20px 20px">
              <Image size="44px" src={imageUrl}></Image>
              <Grid padding="3px 14px">
                <Text>{nickname}</Text>
                <Text>{careerId}</Text>
              </Grid>
              <Position>
                <Button _onClick={() => userId}>차단 해제</Button>
              </Position>
            </Grid>
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default BlockList;
