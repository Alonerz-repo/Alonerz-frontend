import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Image, Grid, Text, Button } from "../elements";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import GetFollowList from "../components/GetFollowList";

const FollowList = () => {
  const { state }: any = useLocation();
  const list = GetFollowList(state.uid, state.isfollow);

  useEffect(() => {
    console.log("list", list);
  }, [list]);
  return (
    <React.Fragment>
      <Header text={state.isfollow}></Header>
      {list.map((value: any, index: number) => {
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
