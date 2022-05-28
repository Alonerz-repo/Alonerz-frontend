import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import UploadForm from "../../components/UploadForm";
import { EditGroupException, EditStatusCode } from "./exception";
import data from "../../assets/category";
import { Available } from "./available";
import Select from "./Select";

import DatePickerComponent from "../../components/DatePicker";
import {
  Grid,
  Text,
  Button,
  InputForm,
  SelectForm,
  RadioForm,
} from "../../elements";
import Header from "../../components/Header";
import { transformCreate } from "../../utils/transformData";
import SearchKakaoMap from "../../components/SearchKakaoMap";
import { partyAxios, CreateForm } from "../../axios/partyAxios";
import times from "../../utils/partyTimes";
import ConfirmModal, {
  ConfirmModalProps,
  initConfirmModalProps,
} from "../../components/ConfirmModal";
import AlertModal, {
  AlertModalProps,
  initAlertModalProps,
} from "../../components/AlertModal";

interface CreateProps {
  group?: CreateForm;
  time?: number | undefined;
  groupId?: string;
  imageUrl?: string;
}

const Create = ({ group, time, groupId, imageUrl }: CreateProps) => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<CreateForm>();

  const navigate = useNavigate();

  const [address, setAddress] = useState<string>();
  const [placeName, setPlaceName] = useState<string>();
  const [locationX, setLocationX] = useState<number>();
  const [locationY, setLocationY] = useState<number>();
  const [confirmModalProps, setConfirmMoalProps] = useState<ConfirmModalProps>(
    initConfirmModalProps
  );
  const [alertModalProps, setAlertModalProps] =
    useState<AlertModalProps>(initAlertModalProps);

  const categories = data.findCategories().map((value, _) => {
    return { name: value.item, value: value.id };
  });

  // group 정보를 받아와서 초기 상태값을 세팅
  useEffect(() => {
    reset({
      startAt: time ?? 10,
      endAt: time ? time + 1 : 11,
      limit: 4,
      ...group,
    });
    setLocationX(group?.locationX ?? 33.450701);
    setLocationY(group?.locationY ?? 126.570667);
    setPlaceName(group?.placeName ?? "");
    setAddress(group?.address ?? "");
  }, [group]);

  // 데이터를 입력받아 제출버튼을 누르면 유효성 확인 후 서버와 통신
  const onSubmit = handleSubmit((data: CreateForm) => {
    if (new Date(data.date.setHours(data.startAt ?? 0, 0, 0)) < new Date()) {
      setError("startAt", {
        type: "time",
        message: "현재 날짜, 시간 이전에는 그룹을 생성할 수 없습니다.",
      });
      return;
    }

    if (placeName === "") {
      setError("placeName", {
        type: "place",
        message: "검색을 통해 장소를 선택해주세요.",
      });
      return;
    }

    if (data.image?.name !== undefined) {
      const file = data.image.name.split(".");
      if (Available.checkImage(file[file.length - 1])) {
        setError("image", {
          type: "type",
          message: "jpg, jpeg, png 형식의 이미지만 가능합니다",
        });
        return;
      }
    }

    const newData = transformCreate({
      ...data,
      locationX,
      locationY,
      address,
      placeName,
    });
    if (!group) {
      onCreate(newData);
    } else {
      onEdit(newData, groupId ?? "");
    }
  });

  const onCloseConfirmModal = () => setConfirmMoalProps(initConfirmModalProps);
  const onCreate = async (group: CreateForm) => {
    setConfirmMoalProps({
      message: "그룹을 생성하시겠습니까?",
      yesLabel: "생성",
      noLabel: "취소",
      onOk: async () => {
        try {
          await partyAxios.createParty(group);
          onCloseConfirmModal();
          navigate("/", { replace: true });
        } catch (error) {
          const { statusCode } = error as EditStatusCode;
          onCloseConfirmModal();
          EditGroupException(navigate, setAlertModalProps)[statusCode]();
        }
      },
      onClose: onCloseConfirmModal,
    });
  };

  const onEdit = (group: CreateForm, groupId: string) => {
    setConfirmMoalProps({
      message: "그룹을 수정하시겠습니까?",
      yesLabel: "수정",
      noLabel: "취소",
      onOk: async () => {
        try {
          await partyAxios.editParty(group, groupId);
          onCloseConfirmModal();
          navigate("/", { replace: true });
        } catch (error) {
          const { statusCode } = error as EditStatusCode;
          onCloseConfirmModal();
          EditGroupException(navigate, setAlertModalProps)[statusCode]();
        }
      },
      onClose: onCloseConfirmModal,
    });
  };

  const handleMap = (
    locationX: number,
    locationY: number,
    address: string,
    placeName: string
  ) => {
    setLocationX(locationX);
    setLocationY(locationY);
    setAddress(address);
    setPlaceName(placeName);
  };

  return (
    <React.Fragment>
      <AlertModal {...alertModalProps} />
      <ConfirmModal {...confirmModalProps} />
      <form onSubmit={onSubmit}>
        <Header text="파티개설"></Header>
        <Grid padding="0 30px 0 30px">
          <Text bold type="line" titleText="제목" margin="5px 0 5px 0" />
          <InputForm width="100%" name="title" control={control} />
          {errors.title?.type === "required" && (
            <ErrorBox>제목은 필수 입력사항입니다.</ErrorBox>
          )}

          <Text bold type="line" titleText="카테고리" margin="5px 0 5px 0" />
          <SelectForm
            name="categoryId"
            control={control}
            categories={categories}
          ></SelectForm>

          <Text bold type="line" titleText="날짜" margin="5px 0 5px 0" />
          <DatePickerComponent
            name="date"
            control={control}
          ></DatePickerComponent>

          <Select
            setValue={setValue}
            register={register}
            getValues={getValues}
          ></Select>

          {errors.startAt?.type === "time" && (
            <ErrorBox>{errors.startAt.message}</ErrorBox>
          )}

          <Text bold type="line" titleText="인원" margin="5px 0 5px 0" />
          <Grid isFlex>
            <RadioForm control={control} name="limit" v={2} />
            <RadioForm control={control} name="limit" v={3} />
            <RadioForm control={control} name="limit" v={4} />
          </Grid>

          <Text bold type="line" titleText="장소" margin="5px 0 5px 0" />
          {placeName ?? null}
          <SearchKakaoMap handleMap={handleMap}></SearchKakaoMap>
          {errors.placeName?.type === "place" && placeName === "" && (
            <ErrorBox>{errors.placeName?.message}</ErrorBox>
          )}

          <Text bold type="line" titleText="상세 정보" margin="5px 0 5px 0" />
          <InputForm width="100%" name="description" control={control} />
          {errors.description?.type === "required" && (
            <ErrorBox>상세 내용을 입력해주세요.</ErrorBox>
          )}

          <Text bold type="line" titleText="이미지 업로드" margin="15px 0 0 0">
            (png, jpg, jpeg)
          </Text>
          {errors.image?.type === "type" && (
            <ErrorBox>{errors.image?.message}</ErrorBox>
          )}
          <UploadForm
            control={control}
            name="image"
            imageUrl={imageUrl}
            margin="0px 10px 0px 20px"
          ></UploadForm>
        </Grid>
        {/* 컨텐츠가 버튼과 겹치지 않기 위한 area */}
      </form>
      <div style={{ height: "70px" }}></div>
      <Grid absolute="position:fixed; bottom:0px; width:inherit;">
        <Button
          _onClick={onSubmit}
          width="100%"
          bg="#F84C40"
          color="white"
          cursor={true}
        >
          수정하기
        </Button>
      </Grid>
    </React.Fragment>
  );
};

const ErrorBox = styled.div`
  font-size: 12px;
  color: red;
`;

export default Create;
