import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../store/config";
import { Input, Grid, Text, Button, Select } from "../elements";
import KakaoMap from "./KakaoMap";
import Upload from "./Upload";
import Header from "./Header";

const categories = [
  { value: 1, name: "developer" },
  { value: 2, name: "designer" },
  { value: 3, name: "??" },
];

const times = [
  { value: 1, name: "11:00" },
  { value: 2, name: "12:00" },
  { value: 3, name: "13:00" },
  { value: 4, name: "14:00" },
  { value: 5, name: "15:00" },
];

const Create = () => {
  const { group } = useAppSelector((state) => state.party);
  const [title, setTitle] = useState<string>();
  const [menu, setMenu] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [category, setCategory] = useState<number>(1);
  const [opentime, setOpentime] = useState<number>(1);
  const [closetime, setClosetime] = useState<number>(1);

  useEffect(() => {
    setTitle(group.title);
    setMenu(group.menu);
    setDescription(group.description);
  }, [group]);

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleMenu = (e: any) => {
    setMenu(e.target.value);
  };

  const handleDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const handleCategory = (e: any) => {
    setCategory(e.target.value);
  };

  const handleOpentime = (e: any) => {
    setOpentime(e.target.value);
  };
  const handleClosetime = (e: any) => {
    setClosetime(e.target.value);
  };

  return (
    <React.Fragment>
      <Header text="파티개설"></Header>
      <Grid padding="20px">
        <Input
          width="87%"
          text="모임제목"
          bold
          placeholder="모임 제목을 입력해주세요 :)"
          value={title}
          _onChange={handleTitle}
        ></Input>
        <Text bold titleText="카테고리" type="line"></Text>

        <Select
          categories={categories}
          onChange={handleCategory}
          value={category}
        ></Select>

        <Input
          width="87%"
          text="메뉴"
          bold
          placeholder="원하시는 음식 메뉴를 적어주세요."
          value={menu}
          _onChange={handleMenu}
        ></Input>

        <Grid isFlex width="87%">
          <Grid width="40%">
            <Text
              bold
              type="line"
              titleText="오픈 시간"
              margin="5px 0 5px 0"
            ></Text>
            <Select
              categories={times}
              width="100%"
              value={opentime}
              onChange={handleOpentime}
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
              categories={times}
              width="100%"
              value={closetime}
              onChange={handleClosetime}
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
          placeholder="파티를 통해 이루고자하는 목적을 간략히 적어주세요."
          value={description}
          _onChange={handleDescription}
        ></Input>
        <Upload></Upload>
      </Grid>
      <Grid absolute="position:sticky; bottom:0px; width:inherit;">
        {group.groupId !== -1 ? (
          <Button width="100%">대충 수정</Button>
        ) : (
          <Button width="100%">대충 생성</Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default Create;
