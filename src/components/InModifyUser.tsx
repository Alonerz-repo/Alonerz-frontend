import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Grid, Input, Button, Select, Text } from "../elements";
import { useAppDispatch, useAppSelector } from "../store/config";
import { setUserAxios } from "../store/slices/userSlice";
import Career from "../utils/career";

const ModifyUser = (props: any) => {
  const userInfo = props.user;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<any>();
  const [year, setYear] = useState<any>();
  const [desc, setDesc] = useState<any>();
  const [careerGroupName, setCareerGroupName] = useState<any>();
  const [careerItemName, setCareerItemName] = useState<any>();

  const joblist = [
    { value: "무직", name: "무직" },
    { value: "개발직군", name: "개발직군" },
  ];
  const moo = [
    { value: "무직", name: "대학생" },
    { value: "무직", name: "취준생" },
  ];

  const gea = [
    { value: "개발직군", name: "웹개발" },
    { value: "개발직군", name: "응용프로그램" },
    { value: "개발직군", name: "서버" },
    { value: "개발직군", name: "인프라" },
    { value: "개발직군", name: "안드로이드" },
    { value: "개발직군", name: "IOS" },
  ];

  useEffect(() => {
    // if (userInfo.userId === null) {
    //   window.alert("유저정보를 확인할수 없습니다.");
    //   navigate("/user");
    // }
    setNickname(userInfo.nickname);
    setYear(userInfo.year);
    setDesc(userInfo.description);
  }, [userInfo]);

  const clickToSetuser = async () => {
    try {
      const setUserInfo = {
        nickname: nickname,
        profileImageUrl: "",
        description: desc,
        year: year,
      };

      await dispatch(setUserAxios(setUserInfo)).then((res) => {
        navigate("/user");
      });
    } catch (err) {
      console.log(err);
      window.alert(err);
      navigate("/");
    }
  };

  const handleJob = (e: any) => {
    console.log(e.target.value);
    setCareerGroupName(e.target.value);
  };

  const handlejjob = (e: any) => {
    console.log(e.target.value);
    setCareerItemName(e.target.value);
  };

  return (
    <React.Fragment>
      <Grid>
        <Input
          value={nickname}
          text="닉네임"
          placeholder="닉네임입력"
          _onChange={(e) => {
            setNickname(e.target.value);
          }}
        ></Input>

        <Grid display="flex" flexFlow="columns wrap">
          <Grid>
            <Text>직군</Text>
            <Select onChange={handleJob} categories={joblist}></Select>
          </Grid>
          <Grid>
            <Text>직업</Text>
            <Select onChange={handlejjob} categories={gea}></Select>
          </Grid>
        </Grid>

        <Input
          _onChange={(e) => {
            setYear(e.target.value);
          }}
          value={year}
          text="연차"
          placeholder=""
        ></Input>
        <Input
          _onChange={(e) => {
            setDesc(e.target.value);
          }}
          value={desc}
          text="나를 표현하는 한마디"
          placeholder=""
        ></Input>
      </Grid>
      <Button _onClick={clickToSetuser}> 내 정보 수정 </Button>
    </React.Fragment>
  );
};

export default ModifyUser;
