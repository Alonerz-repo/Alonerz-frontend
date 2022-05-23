import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import DatePickerComponent from "./DatePicker";
import {
  Input,
  Grid,
  Text,
  Button,
  Select,
  InputForm,
  SelectForm,
} from "../elements";
import Upload from "./Upload";
import Header from "./Header";
import SearchKakaoMap from "./SearchKakaoMap";
import { partyAxios, GroupInfo } from "../axios/partyAxios";
import times from "../utils/partyTimes";
import useLoginCheck from "../useCustom/useLoginCheck";

interface CreateProps {
  group: GroupInfo;
  time?: number | undefined;
}

const Create = ({ group, time }: CreateProps) => {
  // 사용자가 로그인 상태인지 확인하고 아닐 시 로그인 페이지로 보내주는 훅
  useLoginCheck();
  // title - 제목, menu - 메뉴, description - 설명, opentime - 시작시간, closetime - 마감 시간, date - 날짜
  // placeName - 장소이름(맵에 표시), address - 주소, locationX Y - 좌표, limit - 인원 제한
  // image - 이미지 파일
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<GroupInfo>();

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
  useEffect(() => {}, [group]);

  const handleImageUrl = (file: any) => {
    setImageUrl(file);
  };

  const handleOpentime = (e: any) => {
    setOpentime(e.target.value);
  };

  const handleClosetime = (e: any) => {
    setClosetime(e.target.value);
  };

  // 버튼 클릭시 파티 생성, 수정 이벤트
  const handleCreateParty = async () => {
    let groupInfo: any = {
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

  const onSubmit = handleSubmit((data) => console.log(data));

  type Option = {
    name: string;
    value: string | number;
  };

  const options: Option[] = [
    { name: "11:00", value: 11 },
    { name: "12:00", value: 12 },
  ];

  return (
    <React.Fragment>
      <Header text="파티개설"></Header>
      <Grid padding="0 30px 0 30px">
        <form onSubmit={onSubmit}>
          <Text bold type="line" titleText="제목" margin="5px 0 5px 0" />
          <InputForm width="100%" name="title" control={control} />

          <Text bold type="line" titleText="메뉴" margin="5px 0 5px 0" />
          <InputForm width="100%" name="menu" control={control} />
          <SelectForm
            width="40%"
            categories={options}
            name="startAt"
            control={control}
          ></SelectForm>

          <SelectForm
            width="40%"
            categories={options}
            name="endAt"
            control={control}
          ></SelectForm>

          <Text bold type="line" titleText="상세 정보" margin="5px 0 5px 0" />
          <InputForm width="100%" name="description" control={control} />
          <input type="submit" value="제출" />
        </form>

        {/* 달력 컴포넌트 */}
        <Text bold type="line" titleText="달력" margin="5px 0 5px 0"></Text>
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
            수정하기
          </Button>
        ) : (
          <Button
            width="100%"
            bg="#F84C40"
            color="white"
            _onClick={handleCreateParty}
          >
            생성하기
          </Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default Create;
