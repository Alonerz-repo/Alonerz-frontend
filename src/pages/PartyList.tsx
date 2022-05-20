import React, { useEffect } from "react";
import { Grid, Text, Select } from "../elements";
import Card from "../components/Card";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import partyList, { initialState } from "../axios/partyList";
import { useAppSelector } from "../store/config";
import { useParams } from "react-router-dom";
import partyTimes from "../utils/partyTimes";

// 전체 파티목록 조회 페이지
const PartyList = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = React.useState<any>(initialState);
  // time = lunch 또는 dinner 를 받아옴
  const { time } = useParams();
  const [partyTime, setPartyTime] = React.useState<string>();
  // 사용자가 로그인했는지 확인하기 위한 상태값을 받아옴
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    setPartyTime(time);
  }, []);

  // 파티타임 변화에 따라 파티 정보를 받아옴
  useEffect(() => {
    if (user.userId) {
      const getParty = async () => {
        // 시간에 따른 파티 정보 조회
        // 현재위치 좌표를 받아옴
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async function (position) {
            const x = position.coords.latitude;
            const y = position.coords.longitude;
            setGroups(await partyList.getTimeList(partyTime, x, y));
          });
        } else {
          setGroups(await partyList.getTimeList(partyTime, 1, 1));
        }
      };
      if (partyTime) {
        getParty();
      }
    }
  }, [partyTime]);
  useEffect(() => {
    console.log(groups);
  }, [groups]);

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
                menu={value.menu}
                limit={value.limit}
                headcount={value.join}
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
