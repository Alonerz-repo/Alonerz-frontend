import React, { useEffect } from "react";
import { Grid, Text, Select } from "../elements";
import Card from "../components/Card";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import partyList, { initialState } from "../axios/partyList";
import { useParams } from "react-router-dom";
import partyTimes from "../utils/partyTimes";

const PartyList = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = React.useState<any>(initialState);
  const time = useParams().time;
  const [partyTime, setPartyTime] = React.useState<string>();

  useEffect(() => {
    setPartyTime(time);
  }, []);

  useEffect(() => {
    const getParty = async () => {
      setGroups(await partyList.getTimeList(partyTime));
    };
    if (partyTime) {
      getParty();
    }
  }, [partyTime]);

  const handleSelect = (e: any) => {
    setPartyTime(e.target.value);
  };

  return (
    <React.Fragment>
      <Header text="파티리스트"></Header>
      <Grid padding="20px">
        <Text type="title"> party</Text>
        <Select
          width="90px"
          onChange={handleSelect}
          categories={partyTimes.listTimes}
          value={partyTime}
          time={partyTime}
        ></Select>
      </Grid>

      <Grid isFlex padding="20px">
        <React.Fragment>
          {groups.map((value: any, i: number) => {
            return (
              <Card
                key={i}
                isFlex
                title={value.title}
                limit={value.limit}
                headcount={1}
                address={value.address}
                startAt={new Date(value.startAt)}
                endAt={new Date(value.endAt)}
                src={value.imageUrl}
                _onClick={() => {
                  navigate(`/participate/${value.groupId}`);
                }}
              ></Card>
            );
          })}
        </React.Fragment>
      </Grid>
    </React.Fragment>
  );
};

export default PartyList;
