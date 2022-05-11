import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Grid, Input, Button } from "../elements";
import { useAppDispatch, useAppSelector } from "../store/config";
import { setUserAxios } from "../store/slices/userSlice";

const ModifyUser = () => {
  const userInfo = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<any>();
  const [year, setYear] = useState<any>();
  const [desc, setDesc] = useState<any>();
  const [careerGroupName, setCareerGroupName] = useState<any>();
  const [careerItemName, setCareerItemName] = useState<any>();
  useEffect(() => {
    console.log(userInfo);
    if (userInfo.userId === null) {
      window.alert("유저정보를 확인할수 없습니다.");
      navigate("/user");
    }
    setNickname(userInfo.nickname);
    setYear(userInfo.year);
    setDesc(userInfo.description);
    setCareerGroupName(userInfo.careerGroupName);
    setCareerItemName(userInfo.careerItemName);
  }, []);

  const clickToSetuser = async () => {
    try {
      const setUserInfo = {
        nickname: nickname,
        profileImageUrl: "",
        description: desc,
        year: year,
        careerGroupName: careerGroupName,
        careerItemName: careerItemName,
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
          <Div>
            <Input
              _onChange={(e) => {
                setCareerGroupName(e.target.value);
              }}
              value={careerGroupName}
              width="80%"
              text="직군"
              placeholder=""
            ></Input>
          </Div>
          <Div>
            <Input
              _onChange={(e) => {
                setCareerItemName(e.target.value);
              }}
              value={careerItemName}
              width="80%"
              text="직업"
              placeholder=""
            ></Input>
          </Div>
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

const Div = styled.div`
  display: flex;
  margin: 10px 10px 10px 10px;
`;

export default ModifyUser;
