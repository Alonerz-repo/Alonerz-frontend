import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "../elements";
import userAxios from "../axios/userAxios";
import AlertModal from "./AlertModal";

const alertInit = {
  message: "",
  closeLabel: "",
  onClose: () => {},
};

//리덕스의 유저 정보와 url param의 유저 정보를 비교해서 두개가 일치하면 내정보 수정버튼
//일치 하지 않으면 팔로우와 채팅 버튼이 보이게 분기 처리 했습니다.
const BtnAction = (props: any) => {
  const navigate = useNavigate();
  const { myId, yourId } = props;
  const [alert, setAlert] = useState(alertInit);

  const setFollow = () => {
    userAxios.setFollowUser(yourId).then((res) => {
      setAlert({
        message: "팔로우하였습니다.",
        closeLabel: "닫기",
        onClose: () => setAlert(alertInit),
      });
    });
  };

  const setBlock = () => {
    try {
      userAxios.setblockUser(yourId).then((res) => {
        setAlert({
          message: "차단되었습니다.",
          closeLabel: "닫기",
          onClose: () => setAlert(alertInit),
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
  if (myId === yourId) {
    return (
      <React.Fragment>
        <button
          style={{
            border: "2px solid #F5F5F5",
            borderRadius: "30px",
            padding: "15px 20px",
            background: "#FFFFFF",
            color: "#BDBDBD",
            cursor: "pointer",
          }}
          onClick={() => navigate("/user/edit")}
        >
          내정보 수정
        </button>
      </React.Fragment>
    );
  } else if (myId !== yourId) {
    return (
      <React.Fragment>
        <AlertModal {...alert} />
        <Grid display="flex">
          <Button
            _onClick={setFollow}
            customize="border-radius: 30px; padding: 15px 20px; color: white; background: #355DFA; border: none;"
            cursor
          >
            팔로우
          </Button>
          <Button
            _onClick={setBlock}
            customize="border-radius: 30px; padding: 15px 20px; color: white; background: #355DFA; border: none;"
            cursor
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
