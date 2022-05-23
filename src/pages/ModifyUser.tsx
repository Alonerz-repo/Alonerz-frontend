import React, { useState, useEffect } from "react";
import styled from "styled-components";
import userAxios from "../axios/userAxios";
import { Grid, Input, Select, Text } from "../elements";
import useUser from "../useCustom/useUser";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { yearUtils, careerUtils } from "../utils/asset";

// 유저 프로필(이름, 직군, 연차 등) 변경할수 있는 페이지 입니다.
interface myProfile {
  nickname: string;
  imageUrl: string | null;
  careerId: number;
  yearId: number;
  description: string;
}

let initialState: myProfile = {
  nickname: "",
  imageUrl: "",
  careerId: 0,
  yearId: 0,
  description: "",
};

const ModifyUser = () => {
  const navigate = useNavigate();
  //연차
  // console.log(yearUtils.getYearsByCareerId(1));
  //

  //리덕스에서 현재 유저의 정보를 가져옵니다.

  //훅을 통해 가져온 유저정보, 유저가 입력한 정보를 저장합니다.
  const [user, setUser] = useState<myProfile>(initialState);
  const [myCareerGroup, setMyCareerGroup] = useState<any>("무직");
  const [typeYear, setTypeYear] = useState(0);
  const [err, setErr] = useState(false);

  //커스텀 훅 함수로 유저 정보를 가져옵니다.
  const info = useUser();
  //직군 리스트
  const groups = careerUtils.getGroups().map((value) => {
    return { value: value, name: value };
  });

  //저장된 직군 정보를 토대로 직업을 보여줍니다.
  const items = careerUtils.getItems(myCareerGroup).map((value) => {
    // console.log(value.id);
    return { value: value.id, name: value.item };
  });

  const years = yearUtils.getYearsByCareerId(typeYear).map((value) => {
    return { value: value.id, name: value.item };
  });

  const typeCheck = (e: any) => {
    const {
      target: { name, value },
    } = e;
    switch (name) {
      case "nickname":
        if (value.length < 3) {
          return setErr(true);
        } else {
          return setErr(false);
        }
    }
  };

  //커스텀훅의 정보가 변경될때마다, 현재 페이지의 스테이트에 저장합니다.
  //페이지의 input 필드에 저장하기 위해 현재 스테이트에 저장합니다
  useEffect(() => {
    initialState = {
      nickname: info.nickname,
      imageUrl: info.profileImageUrl,
      careerId: info.careerId,
      yearId: info.yearId,
      description: info.description,
    };
    setUser(initialState);
  }, [info]);

  //유저가 input필드를 변경할따마다 함수가 호출됩니다.
  const onChangeHandler = (e: any) => {
    const {
      target: { name, value },
    } = e;
    setUser({ ...user, [name]: value });
  };

  // 직군 정보를 갱신합니다.
  const onChangeHandlerCareer = (e: any) => {
    if (e.target.name === "careerId") {
      setMyCareerGroup(e.target.value);
      switch (e.target.value) {
        case "무직":
          return setTypeYear(1);
        case "개발직":
          return setTypeYear(3);
        case "디자인":
          return setTypeYear(3);
        default:
          setTypeYear(1);
      }
    }
  };

  //유저가 버튼을 누르면 유저 정보 수정 요청을 보냅니다.
  const clickToSetuser = async () => {
    const initialState = {
      nickname: user.nickname,
      careerId: user.careerId,
      yearId: user.yearId,
      description: user.description,
    };
    try {
      await userAxios.setUser(initialState).then((res) => {
        window.alert("수정완료");
        navigate("/");
      });
    } catch (error) {
      const { message, name } = error as Error;
    }
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
            err={err}
            value={user.nickname}
            name="nickname"
            text="닉네임"
            placeholder="닉네임입력"
            _onChange={(e) => {
              typeCheck(e);
              onChangeHandler(e);
            }}
          />
        </Position>

        <Grid display="flex" flexFlow="columns wrap">
          <div style={{ width: "100%", margin: "0px 20px 0px 0px" }}>
            <Text>직군</Text>
            <Select
              type="user"
              placeholder="직군"
              width="100%"
              name="careerId"
              margin="0px 20px 32px 0px"
              onChange={onChangeHandlerCareer}
              categories={groups}
            ></Select>
          </div>
          <div style={{ width: "100%" }}>
            <Text>직업</Text>
            <Select
              placeholder="직업"
              type="user"
              width="100%"
              name="careerId"
              onChange={(e) => {
                onChangeHandler(e);
              }}
              categories={items}
            ></Select>
          </div>
        </Grid>
        <Position>
          <Text>연차</Text>
          <Select
            type="user"
            placeholder="연차"
            name="yearId"
            onChange={(e) => onChangeHandler(e)}
            categories={years}
          ></Select>
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
