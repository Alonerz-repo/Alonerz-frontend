import React, { useEffect } from "react";
import { Grid, Text, Button } from "../elements";
import Card from "../components/Card";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import partyList, { initialState } from "../axios/partyList";

const PartyList = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = React.useState<any>(initialState);
  const reclick = () => {
    navigate("/");
  };

  useEffect(() => {
    const getParty = async () => {
      setGroups(await partyList.getLunchList());
    };
    getParty();
  }, []);

  return (
    <React.Fragment>
      <Header text="파티리스트"></Header>
      <Grid>
        <Text type="title"> party</Text>
        <Button _onClick={reclick}> lunch</Button>
        <Button _onClick={reclick}> 9:00 ~ 16:00</Button>
      </Grid>

      <Grid isFlex>
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
