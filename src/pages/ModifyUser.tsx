import React, { useState, useEffect } from "react";
import styled from "styled-components";
import userAxios from "../axios/userAxios";
import { Grid, Input, Select, Text } from "../elements";
import { useAppSelect } from "../store/config.hook";
import useUser from "../useCustom/useUser";
import { useNavigate } from "react-router-dom";
import { careerGroups, careerItems } from "../utils/career";
import Header from "../components/Header";

// 유저 프로필(이름, 직군, 연차 등) 변경할수 있는 페이지 입니다.

const ModifyUser = () => {
  const navigate = useNavigate();
  //리덕스에서 현재 유저의 정보를 가져옵니다.
  const userInfo = useAppSelect((state) => state.user);
  //훅을 통해 가져온 유저정보, 유저가 입력한 정보를 저장합니다.
  const [user, setUser] = useState<any>({
    nickname: "",
    imageUrl: null,
    careerId: 1,
    careerGroupName: "",
    careerItemName: "",
    year: "",
    description: "",
  });
  const [myCareerGroup, setMyCareerGroup] = useState();

  //커스텀 훅 함수로 유저 정보를 가져옵니다.
  const info = useUser(userInfo.userId);
  const group = careerGroups();
  const groupList: any = [];
  group.forEach((value) => {
    groupList.push({
      value: value,
      name: value,
    });
  });

  const item = careerItems(myCareerGroup);
  const items: any = [];
  item.forEach((value: any) => {
    items.push({ value: value.careerId, name: value.careerItemName });
  });

  //커스텀훅의 정보가 변경될때마다, 현재 페이지의 스테이트에 저장합니다.
  //페이지의 input 필드에 저장하기 위해 현재 스테이트에 저장합니다
  useEffect(() => {
    setUser(info);
  }, [info]);

  //유저가 input필드를 변경할따마다 함수가 호출됩니다.
  const onChangeHandler = (e: any) => {
    const {
      target: { name, value },
    } = e;
    setUser({ ...user, [name]: value });
  };
  const onChangeHandlerCareer = (e: any) => {
    if (e.target.name === "careerId") {
      setMyCareerGroup(e.target.value);
    }
  };

  //유저가 버튼을 누르면 유저 정보 수정 요청을 보냅니다.
  const clickToSetuser = async () => {
    const data = {
      nickname: user.nickname,
      careerId: user.careerId,
      year: user.year,
      description: user.description,
    };
    userAxios.setUser(data).then((res) => {
      window.alert("정보 변경 완료");
      navigate("/");
    });
  };

  return (
    <React.Fragment>
      <Header
        type="userEdit"
        text="내 정보"
        setting={clickToSetuser}
        btnName="수정"
      />
      <Grid padding="20px" customize="margin: 10px;">
        <Position>
          <Input
            value={user.nickname}
            name="nickname"
            text="닉네임"
            placeholder="닉네임입력"
            _onChange={onChangeHandler}
          />
        </Position>

        <Grid display="flex" flexFlow="columns wrap">
          <div style={{ width: "100%", margin: "0px 20px 0px 0px" }}>
            <Text>직군</Text>
            <Select
              type="user"
              placeholder="직군"
              careerId={info.careerId}
              width="100%"
              name="careerId"
              margin="0px 20px 32px 0px"
              value={user.careerGroupName}
              onChange={onChangeHandlerCareer}
              categories={직군리스트}
            ></Select>
          </div>
          <div style={{ width: "100%" }}>
            <Text>직업</Text>
            <Select
              careerId={info.careerId}
              placeholder="직업"
              type="user"
              width="100%"
              name="careerId"
              onChange={(e) => {
                onChangeHandler(e);
              }}
              categories={직업리스트}
            ></Select>
          </div>
        </Grid>
        <Position>
          <Input
            _onChange={(e) => {
              onChangeHandler(e);
            }}
            value={user.year}
            name="year"
            text="연차"
            placeholder=""
          ></Input>
        </Position>

        <Input
          _onChange={(e) => {
            onChangeHandler(e);
          }}
          value={user.description}
          name="description"
          text="나를 표현하는 한마디"
          placeholder=""
        ></Input>
      </Grid>
    </React.Fragment>
  );
};

const Position = styled.div`
  margin: 0px 0px 32px 0px;
`;

export default ModifyUser;
