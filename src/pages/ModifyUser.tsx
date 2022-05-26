import React, { useState, useEffect } from "react";
import styled from "styled-components";
import userAxios from "../axios/userAxios";
import { Grid, Text } from "../elements";
import useUser from "../useCustom/useUser";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { yearUtils, careerUtils } from "../utils/asset";
import { useAppSelect } from "../store/config.hook";
import AlertModal from "../components/AlertModal";
import { useForm } from "react-hook-form";

// 유저 프로필(이름, 직군, 연차 등) 변경할수 있는 페이지 입니다.
interface myProfile {
  nickname: string;
  careerId: number;
  yearId: number;
  description: string;
}

let initialState: myProfile = {
  nickname: "",
  careerId: 0,
  yearId: 0,
  description: "",
};

//모달창 프롭스
const initAlertProps = {
  message: "",
  onClose: () => {},
  closeLabel: "",
};

const MyInput = styled.input`
  background: #eeeeee;
  border-radius: 15px;
  border: none;
  width: 100%;
  height: 44px;
  padding: 0px 20px;
  box-sizing: border-box;
`;

const MyPtag = styled.p`
  margin: 0px;
`;

const MySelectTag = styled.select`
  background: #eeeeee;
  border-radius: 20px;
  border: none;
  width: 100%;
  height: 44px;
  padding: 0px 20px;
  margin: 0px 0px 32px 0px;
`;
const ModifyUser = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  //리덕스에서 현재 유저의 정보를 가져옵니다.
  const userInfo = useAppSelect((state) => state.user);
  //훅을 통해 가져온 유저정보, 유저가 입력한 정보를 저장합니다.
  const [user, setUser] = useState(initialState);

  const [myCareerGroup, setMyCareerGroup] = useState<any>("무직");
  const [typeYear, setTypeYear] = useState(0);
  //모달창 스테이트
  const [alertProps, setAlertProps] = useState(initAlertProps);
  const groups = watch("groups");
  const sumit = watch();

  //커스텀 훅 함수로 유저 정보를 가져옵니다.
  const info = useUser(userInfo.userId);

  //커스텀훅의 정보가 변경될때마다, 현재 페이지의 스테이트에 저장합니다.
  //페이지의 input 필드에 저장하기 위해 현재 스테이트에 저장합니다
  useEffect(() => {
    const career = careerUtils.findById(info.careerId);
    setValue("nickname", info.nickname);
    setValue("groups", career?.group);
    setValue("items", career?.id);
    setValue("years", info.yearId);
    setValue("description", info.description);
  }, [info]);

  useEffect(() => {
    setMyCareerGroup(groups);
    switch (groups) {
      case "무직":
        return setTypeYear(1);
      case "개발직":
        return setTypeYear(3);
      case "디자인":
        return setTypeYear(3);
      default:
        setTypeYear(1);
    }
  }, [groups]);

  //유저가 버튼을 누르면 유저 정보 수정 요청을 보냅니다.
  const clickToSetuser = async (data: any) => {
    setUser({
      ...user,
      nickname: data.nickname,
      description: data.description,
      yearId: data.years,
      careerId: data.items,
    });
    try {
      await userAxios.setUser(user);
      setAlertProps({
        message: "저장되었어요.",
        closeLabel: "확인했어요!",
        onClose: () => navigate("/"),
      });
    } catch (error) {
      const { message } = error as Error;
      setAlertProps({
        message,
        closeLabel: "닫기!",
        onClose: () => setAlertProps(initAlertProps),
      });
    }
  };

  return (
    <React.Fragment>
      <AlertModal {...alertProps} />
      <Header
        type="userEdit"
        text="내 정보"
        setting={() => clickToSetuser(sumit)}
        btnName="수정"
      />
      <Grid padding="20px" customize="margin: 10px;">
        <Position>
          <form onSubmit={handleSubmit(clickToSetuser)}>
            <MyPtag>닉네임</MyPtag>
            <MyInput
              {...register("nickname", {
                required: "필수로 입력해야됩니다.",
                minLength: {
                  value: 2,
                  message: "2자 이상은 입력해야됩니다.",
                },
                maxLength: {
                  value: 10,
                  message: "10자까지 입력할수있습니다.",
                },
                max: 10,
              })}
            />
            {errors.nickname && <p>{errors.nickname.message}</p>}
          </form>
        </Position>

        <Grid display="flex" flexFlow="columns wrap">
          <div style={{ width: "100%", margin: "0px 20px 0px 0px" }}>
            <MyPtag>직군</MyPtag>
            <form onSubmit={handleSubmit(clickToSetuser)}>
              <MySelectTag
                {...register("groups", { required: "필수로 입력해야 합니다." })}
              >
                {careerUtils.getGroups().map((value) => {
                  return (
                    <>
                      <option value={value}>{value}</option>
                    </>
                  );
                })}
              </MySelectTag>
              {errors.nickname && <p>{errors.groups?.message}</p>}
            </form>
          </div>
          <div style={{ width: "100%" }}>
            <MyPtag>직업</MyPtag>
            <form onSubmit={handleSubmit(clickToSetuser)}>
              <MySelectTag
                {...register("items", {
                  required: "필수로 입력해야 합니다.",
                })}
              >
                {careerUtils.getItems(myCareerGroup).map((value) => {
                  return (
                    <>
                      <option value={value.id}>{value.item}</option>
                    </>
                  );
                })}
              </MySelectTag>
              {errors.nickname && <p>{errors.items?.message}</p>}
            </form>
          </div>
        </Grid>
        <Position>
          <Text>연차</Text>
          {/* @TODO : 현재 사용자의 yearId로 기본값 설정 필요 */}
          <form onSubmit={handleSubmit(clickToSetuser)}>
            <MySelectTag
              {...register("years", { required: "필수로 입력해야 합니다." })}
            >
              {yearUtils.getYearsByCareerId(typeYear).map((value) => {
                return (
                  <>
                    <option value={value.id}>{value.item}</option>
                  </>
                );
              })}
            </MySelectTag>
            {errors.nickname && <p>{errors.years?.message}</p>}
          </form>
        </Position>

        <form onSubmit={handleSubmit(clickToSetuser)}>
          <MyPtag>나를 표현하는 한마디</MyPtag>
          <MyInput
            {...register("description", {
              maxLength: {
                value: 10,
                message: "10자까지 입력할수있습니다.",
              },
              max: 10,
            })}
          />
        </form>
      </Grid>
    </React.Fragment>
  );
};

const Position = styled.div`
  margin: 0px 0px 32px 0px;
`;

export default ModifyUser;
