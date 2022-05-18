import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DatePickerComponent from "./DatePicker";
import { Input, Grid, Text, Button, Select } from "../elements";
import Upload from "./Upload";
import Header from "./Header";
import SearchKakaoMap from "./SearchKakaoMap";
import { partyAxios } from "../axios/partyAxios";
import times from "../utils/partyTimes";
import useLoginCheck from "../useCustom/useLoginCheck";

interface CreateProps {
  group: any;
  time?: number | undefined;
}

const Create = ({ group, time }: CreateProps) => {
  // 사용자가 로그인 상태인지 확인하고 아닐 시 로그인 페이지로 보내주는 훅
  useLoginCheck();
  const [title, setTitle] = useState<string>("");
  const [menu, setMenu] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [opentime, setOpentime] = useState<number>(0);
  const [closetime, setClosetime] = useState<number>(0);
  const [placeName, setPlacename] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [locationX, setLocationX] = useState<number>(33.450701);
  const [locationY, setLocationY] = useState<number>(126.570667);
  const [limit, setLimit] = useState<number>(4);
  const [image, setImageUrl] = useState<File>();

  const navigate = useNavigate();

  // group 정보를 받아와서 초기 상태값을 세팅
  useEffect(() => {
    setTitle(group.title);
    setMenu(group.menu);
    setDescription(group.description);
    setPlacename(group.placeName);
    setAddress(group.address);
    setLocationX(group.locationX);
    setLocationY(group.locationY);
    setLimit(group.limit);
    setOpentime(new Date(group.startAt).getHours());
    setClosetime(new Date(group.endAt).getHours());
    if (time === 10 || time === 17) {
      setOpentime(time);
      setClosetime(time + 1);
    }
  }, [group]);

  const handleImageUrl = (file: any) => {
    setImageUrl(file);
  };

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleMenu = (e: any) => {
    setMenu(e.target.value);
  };

  const handleDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const handleOpentime = (e: any) => {
    setOpentime(e.target.value);
  };

  const handleClosetime = (e: any) => {
    setClosetime(e.target.value);
  };

  // 버튼 클릭시 파티 생성, 수정 이벤트
  const handleCreateParty = async () => {
    if (title === "") {
      alert("제목을 입력해주세요.");
      return;
    } else if (menu === "") {
      alert("메뉴를 입력해주세요.");
      return;
    } else if (
      opentime !== undefined &&
      closetime !== undefined &&
      opentime >= closetime
    ) {
      alert("오픈 시간은 마감 시간보다 빨라야합니다.");
      return;
    }
    // number의 시간 정보를 Date 타입으로 바꾸기 위한 변수
    const d = new Date();
    let groupInfo: any = {
      title,
      menu,
      description,
      placeName,
      startAt: new Date(
        Date.parse(
          `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${opentime}:00`
        )
      ),
      endAt: new Date(
        Date.parse(
          `${d.getFullYear()}-${
            d.getMonth() + 1
          }-${d.getDate()} ${closetime}:00`
        )
      ),
      limit,
      locationX,
      locationY,
      address,
    };
    // 이미지 정보의 입력이 없는 경우 image를 제외한 정보만 서버와 통신
    if (image) {
      groupInfo = { ...groupInfo, image };
    }

    // 내가 받아온 그룹 정보가 없다면 create이고 있다면 edit
    if (!group.groupId) {
      const data = await partyAxios.createParty(groupInfo);
      switch (data.statusCode) {
        case 400:
          return alert(data.message);
        case 401:
          return alert(data.message);
        default:
          navigate("/");
      }
    } else {
      const data = await partyAxios.editParty(groupInfo, group.groupId);
      switch (data.statusCode) {
        case 400:
          return alert(data.message);
        case 401:
          return alert(data.message);
        default:
          navigate("/");
      }
    }
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

        <Input
          width="87%"
          text="메뉴"
          bold
          placeholder="원하시는 음식 메뉴를 적어주세요."
          value={menu}
          _onChange={handleMenu}
        ></Input>

        {/* 달력 컴포넌트 */}
        <DatePickerComponent></DatePickerComponent>

        <Grid isFlex width="87%">
          <Grid width="40%">
            <Text
              bold
              type="line"
              titleText="오픈 시간"
              margin="5px 0 5px 0"
            ></Text>
            <Select
              categories={times.openTimes}
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
              categories={times.closeTimes}
              width="100%"
              value={closetime}
              onChange={handleClosetime}
            ></Select>
          </Grid>
        </Grid>
        <Text bold titleText="인원수" type="line"></Text>

        <Grid isFlex>
          {limit === 2 ? (
            <Button isLimit width="27%" bg="#c4c4c4">
              2명
            </Button>
          ) : (
            <Button
              isLimit
              width="27%"
              _onClick={() => {
                setLimit(2);
              }}
            >
              2명
            </Button>
          )}
          {limit === 3 ? (
            <Button isLimit width="27%" bg="#c4c4c4">
              3명
            </Button>
          ) : (
            <Button
              isLimit
              width="27%"
              _onClick={() => {
                setLimit(3);
              }}
            >
              3명
            </Button>
          )}
          {limit === 4 ? (
            <Button isLimit width="27%" bg="#c4c4c4">
              4명
            </Button>
          ) : (
            <Button
              isLimit
              width="27%"
              _onClick={() => {
                setLimit(4);
              }}
            >
              4명
            </Button>
          )}
        </Grid>

        {/* 카카오 맵 */}
        <Text bold titleText="장소" type="line">
          {address}
        </Text>
        <SearchKakaoMap
          locationX={group.locationX}
          locationY={group.locationY}
          handleAddress={setAddress}
          handleLocationX={setLocationX}
          handleLocationY={setLocationY}
          handlePlacename={setPlacename}
        ></SearchKakaoMap>

        <Input
          width="87%"
          text="목적"
          bold
          placeholder="파티를 통해 이루고자하는 목적을 간략히 적어주세요."
          value={description}
          _onChange={handleDescription}
        ></Input>
        <Upload
          handleImageUrl={handleImageUrl}
          imageUrl={group.imageUrl}
        ></Upload>
      </Grid>
      <Grid absolute="position:sticky; bottom:0px; width:inherit;">
        {group.groupId ? (
          <Button width="100%" _onClick={handleCreateParty}>
            대충 수정
          </Button>
        ) : (
          <Button width="100%" _onClick={handleCreateParty}>
            대충 생성
          </Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default Create;
