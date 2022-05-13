import React, { useEffect } from "react";
import styled from "styled-components";
import { Grid, Text, Button } from "../elements";
import Card from "../components/Card";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { getAllGroup } from "../store/slices/PartyListSlice";
import { useAppDispatch, useAppSelector } from "../store/config";

const PartyList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const GruopList = useAppSelector((state) => state.tempList);
  const val = "asdadas";

  useEffect(() => {
    console.log("hello party list");
    dispatch(getAllGroup()).then(() => {
      console.log("party list gruops state is ", GruopList);
    });
    GruopList.map((value: any) => {
      console.log("asdasd => ", value);
    });
  }, []);

  const list: any = GruopList.map((value: any) => {
    console.log(value);
    return (
      <React.Fragment>
        <Card
          isFlex
          title={value.title}
          limit={value.limit}
          headcount={value.join}
          address1={value.placeName}
          startAt={value.startAt}
          endAt={value.endAt}
          src={value.imageUrl}
        ></Card>
      </React.Fragment>
    );
  });
  const reclick = () => {
    navigate("/");
  };
  return (
    <React.Fragment>
      <Header text="파티리스트"></Header>
      <Grid>
        <Text type="title"> party</Text>
        <Button _onClick={reclick}> lunch</Button>
        <Button _onClick={reclick}> 9:00 ~ 16:00</Button>
      </Grid>

      <Grid isFlex>
        {val}
        {list}
        {/* {GruopList.groups.map((value: any) => {
          console.log(value);
          // return (
          //   <React.Fragment>
          //     <Card
          //       isFlex
          //       title={value.title}
          //       limit={value.limit}
          //       headcount={value.join}
          //       address1={value.placeName}
          //       startAt={value.startAt}
          //       endAt={value.endAt}
          //       src={value.imageUrl}
          //     ></Card>
          //   </React.Fragment>
          // );
        })} */}
      </Grid>
    </React.Fragment>
  );
};

export default PartyList;
