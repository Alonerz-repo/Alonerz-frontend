import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Grid, Text, Image } from "../elements";
import userAxios from "../axios/userAxios";
import AlertModal from "../components/AlertModal";
import { useNavigate } from "react-router-dom";

const FollowerBtn = styled.button`
  position: absolute;
  right: 0px;
  background: #f84c40;
  padding: 15px 12px;
  border: none;
  border-radius: 30px;
  width: 80px;
  height: 44px;
  color: #ffffff;
`;

const FollowingBtn = styled.button`
  position: absolute;
  right: 1px;
  background: #ffffff;
  padding: 15px 12px;
  border: 1px solid #f84c40;
  border-radius: 30px;
  width: 80px;
  height: 44px;
  color: #f84c40;
`;
const initAlertProps = {
  message: "",
  onClose: () => {},
  closeLabel: "",
};

const Follow = (props: any) => {
  const { user, groupItem, uid, isfolo } = props;
  const { nickname, userId } = user;
  const navigate = useNavigate();

  //모달 상태
  const [alert, setAlert] = useState(initAlertProps);
  //버튼 상태
  const [btnState, setBtnState] = useState<boolean>(isfolo);

  useEffect(() => {
    setBtnState(isfolo);
  }, [isfolo]);

  //리스트를 클릭했을떄, 상대방 유저프로필로 이동합니다.
  const goToUser = (userId: string) => {
    navigate(`/user/${userId}`);
  };

  //상대방을 팔로우/언팔로우 합니다.
  const setFollow = (userId: string, msg: string) => {
    try {
      userAxios.setFollowUser(userId).then((res) => console.log("sucess"));
      setAlert({
        message: msg,
        closeLabel: "닫기",
        onClose: () => setAlert(initAlertProps),
      });
      setBtnState(!btnState);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid key={userId}>
      <AlertModal {...alert} />
      <Grid display="flex" padding="20px 20px">
        <Image size="44px"></Image>
        <Grid padding="3px 14px">
          <div onClick={() => goToUser(userId)}>
            <Text>{nickname}</Text>
            <Text>
              {groupItem?.group} / {groupItem?.item}
            </Text>
          </div>
        </Grid>
        {/* 버튼 */}
        {btnState ? (
          <FollowingBtn
            onClick={() => setFollow(userId, "팔로우를 취소했습니다.")}
          >
            팔로잉
          </FollowingBtn>
        ) : (
          <FollowerBtn onClick={() => setFollow(userId, "팔로우를 했습니다")}>
            팔로우 +
          </FollowerBtn>
        )}
      </Grid>
    </Grid>
  );
};

export default Follow;
