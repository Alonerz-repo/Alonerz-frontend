import React, { useRef } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../store/config";
import { Input, Grid, Text, Button, Select } from "../elements";
import KakaoMap from "../components/KakaoMap";
import Upload from "../components/Upload";
import Header from "../components/Header";

const CreateParty = () => {
  const { groupId } = useParams();
  const title = useRef(null);
  const [category, setCategory] = React.useState(1);
  const menu = useRef(null);
  const handleChangeSelect = (e: any) => {
    setCategory(e.target.value);
  };

  if (groupId !== undefined) {
  }

  return (
    <React.Fragment>
      <Header text="파티개설"></Header>
      <Grid padding="20px">
        <Input
          width="87%"
          text="모임제목"
          bold
          placeholder="모임 제목을 입력해주세요 :)"
          ref={title}
        ></Input>

        <Text bold titleText="카테고리" type="line"></Text>

        <Select onChange={handleChangeSelect}></Select>

        <Input
          width="87%"
          text="메뉴"
          bold
          placeholder="원하시는 음식 메뉴를 적어주세요."
          ref={menu}
        ></Input>

        <Grid isFlex width="87%">
          <Input width="40%" text="오픈시간" bold placeholder="11 : 00"></Input>
          <Input width="40%" text="마감시간" bold placeholder="12 : 00"></Input>
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
        ></Input>
        <Upload></Upload>
      </Grid>
    </React.Fragment>
  );
};

export default CreateParty;
