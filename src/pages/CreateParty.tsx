import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../store/config";
import { Input, Grid, Text, Button, Select } from "../elements";
import KakaoMap from "../components/KakaoMap";
import Upload from "../components/Upload";
import Header from "../components/Header";
import { getPartyInfo } from "../store/slices/partyInfoSlice";

const CreateParty = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { group } = useAppSelector((state) => state.party);
  const [title, setTitle] = React.useState("");

  if (groupId !== undefined && group.groupId !== parseInt(groupId)) {
    const getInfo = async () => {
      try {
        await dispatch(getPartyInfo(parseInt(groupId)));
      } catch (err) {
        console.log(err);
      }
    };
    getInfo();
  }

  const [category, setCategory] = React.useState(1);
  const menu = useRef<string>("");
  const desc = useRef<string>("");
  const handleChangeSelect = (e: any) => {
    setCategory(e.target.value);
  };
  const categories = [
    { value: 1, name: "개발자" },
    { value: 2, name: "디자이너" },
    { value: 3, name: "??" },
  ];

  const openTime = [
    { value: 1, name: "11:00" },
    { value: 2, name: "12:00" },
    { value: 3, name: "13:00" },
    { value: 4, name: "14:00" },
  ];
  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleEdit = () => {};

  return (
    <React.Fragment>
      <Grid absolute="position:sticky;">
        <Header text="파티개설"></Header>
      </Grid>
      <Grid padding="20px">
        <Input
          width="87%"
          text="모임제목"
          bold
          placeholder="모임 제목을 입력해주세요 :)"
        >
          {group.title}
        </Input>
        <Text bold titleText="카테고리" type="line"></Text>

        <Select
          categories={categories}
          onChange={handleChangeSelect}
          value={category}
        ></Select>

        <Input
          width="87%"
          text="메뉴"
          bold
          placeholder="원하시는 음식 메뉴를 적어주세요."
          ref={menu}
        >
          {group.menu}
        </Input>

        <Grid isFlex width="87%">
          <Grid width="40%">
            <Text
              bold
              type="line"
              titleText="오픈 시간"
              margin="5px 0 5px 0"
            ></Text>
            <Select
              categories={openTime}
              width="100%"
              onChange={() => {}}
            ></Select>
          </Grid>
          <Grid width="40%">
            <Text
              bold
              type="line"
              titleText="마감 시간"
              margin="5px 0 5px 0"
            ></Text>
            <Select
              categories={openTime}
              width="100%"
              onChange={() => {}}
            ></Select>
          </Grid>
        </Grid>
        <Text bold titleText="인원수" type="line"></Text>

        <Grid isFlex>
          <Button isLimit width="27%">
            2명
          </Button>
          <Button isLimit width="27%">
            3명
          </Button>
          <Button isLimit width="27%">
            4명
          </Button>
        </Grid>

        <Text bold titleText="장소" type="line"></Text>

        {/* 카카오 맵 */}
        <KakaoMap
          latitude={37.483782}
          longitude={126.9003409}
          placeName="a"
        ></KakaoMap>

        <Input
          width="87%"
          text="목적"
          bold
          ref={desc}
          placeholder="파티를 통해 이루고자하는 목적을 간략히 적어주세요."
        ></Input>
        <Upload></Upload>
      </Grid>
      <Grid absolute="position:sticky; bottom:0px; width:inherit;">
        {groupId ? (
          <Button width="100%">대충 수정</Button>
        ) : (
          <Button width="100%">대충 생성</Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default CreateParty;
