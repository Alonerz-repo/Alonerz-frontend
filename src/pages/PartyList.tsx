import React from "react";
import styled from "styled-components";
import { Grid, Text, Button } from "../elements";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

const PartyList = () => {
  const navigate = useNavigate();
  const click = () => {
    console.log("hello partylist !");
  };
  const reclick = () => {
    navigate("/");
  };
  return (
    <React.Fragment>
      <Grid>
        <Text type="title"> party</Text>
        <Button _onClick={reclick}> lunch</Button>
        <Button _onClick={reclick}> 9:00 ~ 16:00</Button>
      </Grid>
      <Grid isFlex>
        <Card isFlex title="asd" limit={4} headcount={2} address1="asdf"></Card>
        <Card isFlex title="asd" limit={4} headcount={2} address1="asdf"></Card>
        <Card isFlex title="asd" limit={4} headcount={2} address1="asdf"></Card>
        <Card isFlex title="asd" limit={4} headcount={2} address1="asdf"></Card>
      </Grid>
    </React.Fragment>
  );
};

export default PartyList;
