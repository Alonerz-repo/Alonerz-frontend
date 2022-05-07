import React from "react";
import { Input, Grid, Text, Button, Image } from "../elements";
import KakaoMap from "../components/KakaoMap";
import Upload from "../components/Upload";

const CreateParty = () => {
  return (
    <React.Fragment>
      <Grid padding="20px">
        <Input
          width="87%"
          text="모임제목"
          bold
          placeholder="모임 제목을 입력해주세요 :)"
        ></Input>
        <Input
          width="87%"
          text="카테고리"
          bold
          placeholder="ex) 개발자, 디자이너, 학생 등"
        ></Input>
        <Input
          width="87%"
          text="메뉴"
          bold
          placeholder="원하시는 음식 메뉴를 적어주세요."
        ></Input>
        <Grid isFlex width="87%">
          <Input width="40%" text="오픈시간" bold placeholder="11 : 00"></Input>
          <Input width="40%" text="마감시간" bold placeholder="12 : 00"></Input>
        </Grid>
        <Text bold titleText="인원수" type="line">
          <Grid> </Grid>
        </Text>
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
        <Text bold titleText="장소" type="line">
          <Grid> </Grid>
        </Text>

        {/* 카카오 맵 */}
        <KakaoMap latitude={37.483782} longitude={126.9003409}></KakaoMap>

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
