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

  useEffect(() => {
    dispatch(getAllGroup());
  }, []);

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
        {GruopList.groups.map((value: any) => {
          return (
            <React.Fragment>
              <Card
                isFlex
                title={value.title}
                limit={value.limit}
                headcount={value.join}
                address={value.address}
                startAt={value.startAt}
                endAt={value.endAt}
                src={value.imageUrl}
              ></Card>
            </React.Fragment>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default PartyList;
