import React, { useState, useEffect } from "react";
import userAxios from "../axios/userAxios";
import { Grid, Input, Button, Select, Text } from "../elements";
import { useAppSelect } from "../store/config.hook";
import useUser from "../useCustom/useUser";
import { Career } from "../utils/career";
import { useNavigate } from "react-router-dom";

// 유저 프로필(이름, 직군, 연차 등) 변경할수 있는 페이지 입니다.

const ModifyUser = () => {
  const navigate = useNavigate();
  const userInfo = useAppSelect((state) => state.user);

  //훅을 통해 가져온 유저정보, 유저가 입력한 정보를 저장합니다.
  const [user, setUser] = useState<any>({
    nickname: "",
    profileImageUrl: "",
    careerId: 1,
    year: "",
    description: "",
  });

  //커스텀 훅 함수로 유저 정보를 가져옵니다.
  const info = useUser(userInfo.userId);

  const arr: any = [];
  Career.map((value) => {
    return arr.push({
      value: value.careerId,
      name: `${value.careerGroupName}/${value.careerItemName}`,
    });
  });

  //커스텀훅의 정보가 변경될때마다, 현재 페이지의 스테이트에 저장합니다.
  //페이지의 input 필드에 저장하기 위해 현재 스테이트에 저장합니다
  useEffect(() => {
    const setting = () => {
      const user = {
        nickname: info.nickname,
        profileImageUrl: info.profileImageUrl,
        careerId: info.careerId,
        year: info.year,
        description: info.description,
      };
      setUser(user);
    };
    setting();
  }, [info]);

  //유저가 input필드를 변경할따마다 함수가 호출됩니다.
  const onChangeHandler = (e: any) => {
    setUser((prevState: any) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  //유저가 버튼을 누르면 유저 정보 수정 요청을 보냅니다.
  const clickToSetuser = async () => {
    userAxios.setUser(user).then((res) => {
      window.alert("정보 변경 완료");
      navigate("/");
    });
  };

  return (
    <React.Fragment>
      <Grid>
        <Input
          value={user.nickname}
          name="nickname"
          text="닉네임"
          placeholder="닉네임입력"
          _onChange={(e) => {
            onChangeHandler(e);
          }}
        ></Input>

        <Grid display="flex" flexFlow="columns wrap">
          <Grid>
            <Text>직군</Text>
            <Select
              name="careerId"
              value={user.careerId}
              onChange={(e) => {
                onChangeHandler(e);
              }}
              categories={arr}
            ></Select>
          </Grid>
        </Grid>

        <Input
          _onChange={(e) => {
            onChangeHandler(e);
          }}
          value={user.year}
          name="year"
          text="연차"
          placeholder=""
        ></Input>
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
      <Button _onClick={clickToSetuser}> 내 정보 수정 </Button>
    </React.Fragment>
  );
};

export default ModifyUser;
