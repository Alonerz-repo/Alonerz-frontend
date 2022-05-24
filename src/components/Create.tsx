import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import UploadForm from "./UploadForm";

import DatePickerComponent from "./DatePicker";
import {
  Grid,
  Text,
  Button,
  InputForm,
  SelectForm,
  RadioForm,
} from "../elements";
import Header from "./Header";
import { transformCreate } from "../utils/transformData";
import NewKakaoMap from "./NewKakaoMap";
import { partyAxios, CreateForm } from "../axios/partyAxios";
import times from "../utils/partyTimes";
import useLoginCheck from "../useCustom/useLoginCheck";

interface CreateProps {
  group?: CreateForm;
  time?: number | undefined;
  groupId?: string;
  imageUrl?: string;
}

const Create = ({ group, time, groupId, imageUrl }: CreateProps) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateForm>();

  const [address, setAddress] = useState<string>("a");
  const [placeName, setPlaceName] = useState<string>("b");
  const [locationX, setLocationX] = useState<number>(33.450701);
  const [locationY, setLocationY] = useState<number>(126.570667);

  const navigate = useNavigate();

  // group 정보를 받아와서 초기 상태값을 세팅
  useEffect(() => {
    reset({
      startAt: time ?? 10,
      endAt: time ? time + 1 : 11,
      limit: 4,
      address,
      locationX,
      locationY,
      placeName,
      ...group,
    });
  }, [group]);

  const onSubmit = handleSubmit(async (data: CreateForm) => {
    console.log(transformCreate(data));
    try {
      if (!group) {
        const result = await partyAxios.createParty(transformCreate(data));
        switch (result.statusCode) {
          case 400:
            return alert(result.message);
          case 401:
            return alert(result.message);
          case 403:
            return alert(result.message);
          case 404:
            return alert(result.message);
          default:
            navigate("/");
        }
      } else {
        const result = await partyAxios.editParty(
          transformCreate(data),
          groupId ?? ""
        );
        switch (result.statusCode) {
          case 400:
            return alert(result.message);
          case 401:
            return alert(result.message);
          case 403:
            return alert(result.message);
          case 404:
            return alert(result.message);
          default:
            console.log("완료");
            navigate("/");
        }
      }
    } catch {}
  });

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <Header text="파티개설"></Header>
        <Grid padding="0 30px 0 30px">
          <Text bold type="line" titleText="제목" margin="5px 0 5px 0" />
          <InputForm width="100%" name="title" control={control} />
          {errors.title?.type === "required" && (
            <ErrorBox>제목은 필수 입력사항입니다.</ErrorBox>
          )}

          <Text bold type="line" titleText="달력" margin="5px 0 5px 0"></Text>
          <DatePickerComponent
            name="date"
            control={control}
          ></DatePickerComponent>

          <Grid isFlex>
            <Grid width="40%">
              <Text
                bold
                type="line"
                titleText="오픈시간"
                margin="5px 0 5px 0"
              />
              <SelectForm
                width="100%"
                categories={times.openTimes}
                name="startAt"
                control={control}
              />
            </Grid>

            <Grid width="40%">
              <Text
                bold
                type="line"
                titleText="마감시간"
                margin="5px 0 5px 0"
              />
              <SelectForm
                width="100%"
                categories={times.closeTimes}
                name="endAt"
                control={control}
              />
            </Grid>
          </Grid>

          <Text bold type="line" titleText="인원" margin="5px 0 5px 0" />
          <Grid isFlex>
            <RadioForm control={control} name="limit" v={2} />
            <RadioForm control={control} name="limit" v={3} />
            <RadioForm control={control} name="limit" v={4} />
          </Grid>

          <Text bold type="line" titleText="상세 정보" margin="5px 0 5px 0" />
          <InputForm width="100%" name="description" control={control} />
          {errors.title?.type === "required" && (
            <ErrorBox>상세 내용을 입력해주세요.</ErrorBox>
          )}

          <UploadForm
            control={control}
            name="image"
            imageUrl={imageUrl}
            margin="0px 10px 0px 20px"
          ></UploadForm>

          <NewKakaoMap></NewKakaoMap>
        </Grid>
        <Grid absolute="position:sticky; bottom:0px; width:inherit;">
          {group ? (
            <Button width="100%" bg="#F84C40" color="white" _onClick={() => {}}>
              수정하기
            </Button>
          ) : (
            <Button width="100%" bg="#F84C40" color="white" _onClick={() => {}}>
              생성하기
            </Button>
          )}
        </Grid>
      </form>
    </React.Fragment>
  );
};

const ErrorBox = styled.div`
  font-size: 12px;
  color: red;
`;

export default Create;
