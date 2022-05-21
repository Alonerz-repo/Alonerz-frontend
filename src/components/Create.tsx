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
  // title - 제목, menu - 메뉴, description - 설명, opentime - 시작시간, closetime - 마감 시간, date - 날짜
  // placeName - 장소이름(맵에 표시), address - 주소, locationX Y - 좌표, limit - 인원 제한
  // image - 이미지 파일
  // 하나의 객체로 만들어 state를 관리한다면 하나의 값이 바뀌었을 때에도 전체에 영향을 주게 되는데 현재처럼 일일이 state 관리를 해야할까요?
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
  const [date, setDate] = useState<Date>(new Date());

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
    let groupInfo: any = {
      title,
      menu,
      description,
      placeName,
      startAt: new Date(
        Date.parse(
          `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()} ${opentime}:00`
        )
      ),
      endAt: new Date(
        Date.parse(
          `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()} ${closetime}:00`
        )
      ),
      limit,
      locationX,
      locationY,
      address,
    };
    console.log(groupInfo.startAt);
    console.log(groupInfo.endAt);
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
          width="100%"
          text="모임제목"
          bold
          placeholder="모임 제목을 입력해주세요 :)"
          value={title}
          _onChange={handleTitle}
        ></Input>

        <Input
          width="100%"
          text="메뉴"
          bold
          placeholder="원하시는 음식 메뉴를 적어주세요."
          value={menu}
          _onChange={handleMenu}
        ></Input>

        {/* 달력 컴포넌트 */}
        <DatePickerComponent
          date={date}
          handleDate={setDate}
        ></DatePickerComponent>

        <Grid isFlex width="100%">
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
          width="100%"
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
          <Button
            width="100%"
            bg="#F84C40"
            color="white"
            _onClick={handleCreateParty}
          >
            대충 수정
          </Button>
        ) : (
          <Button
            width="100%"
            bg="#F84C40"
            color="white"
            _onClick={handleCreateParty}
          >
            대충 생성
          </Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default Create;
