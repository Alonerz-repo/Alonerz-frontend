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

  const setBlock = (userId: any) => {
    window.alert("차단이 해제됨");
    userAxios.setblockUser(userId).then((res) => console.log(res));
  };
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
                <button
                  style={{
                    border: "2px solid #F5F5F5",
                    borderRadius: "30px",
                    padding: "15px 20px",
                    background: "#FFFFFF",
                    color: "#BDBDBD",
                  }}
                  onClick={() => setBlock(userId)}
                >
                  차단해제
                </button>
              </Position>
            </Grid>
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default BlockList;
