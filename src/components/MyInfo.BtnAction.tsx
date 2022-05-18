import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Image } from "../elements";
import userAxios from "../axios/userAxios";
import chatIcon from "../assets/header/1.svg";

//리덕스의 유저 정보와 url param의 유저 정보를 비교해서 두개가 일치하면 내정보 수정버튼
//일치 하지 않으면 팔로우와 채팅 버튼이 보이게 분기 처리 했습니다.
const BtnAction = (props: any) => {
  const navigate = useNavigate();
  const { myId, yourId } = props;

  const goTochat = () => {
    console.log("hello chat");
  };

  const setFollow = () => {
    userAxios.setFollowUser(yourId).then((res) => {
      window.alert("follow!");
    });
  };

  const setBlock = async () => {
    console.log("hello block!");
    await userAxios.setblockUser(yourId).then((res) => {
      window.alert("block!!");
    });
  };
  if (myId === yourId) {
    return (
      <React.Fragment>
        <Button
          _onClick={() => navigate("/user/edit")}
          customize="border: 2px solid #F5F5F5; background: none; border-radius: 30px; padding: 15px 30px;"
        >
          내정보 수정
        </Button>
      </React.Fragment>
    );
  } else if (myId !== yourId) {
    return (
      <React.Fragment>
        <Grid display="flex">
          <div onClick={goTochat}>
            <Image size="44px" src={chatIcon}></Image>
          </div>
          <Button
            _onClick={setFollow}
            customize="border-radius: 30px; padding: 15px 20px; color: white; background: #355DFA; border: none;"
          >
            팔로우
          </Button>
          <Button
            _onClick={setBlock}
            customize="border-radius: 30px; padding: 15px 20px; color: white; background: #355DFA; border: none;"
          >
            차단
          </Button>
        </Grid>
      </React.Fragment>
    );
  } else {
    window.alert("ERROR!");
    navigate("/");
    return <React.Fragment></React.Fragment>;
  }
};

export default BtnAction;