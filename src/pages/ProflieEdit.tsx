import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Grid } from "../elements";
import MyProfileBoxBottom from "../components/ProfileBox.bottom";
import MyProfileBoxTop from "../components/ProfileBox.top";
import { useAppSelect, useAppDispatch } from "../store/config.hook";
import { setCharacter } from "../store/slices/characterSlice";
import { useNavigate } from "react-router-dom";
import boardAxios from "../axios/boardAxios";
import AlertModal from "../components/AlertModal";
import ConfirmModal from "../components/ConfirmModal";

//유저 프로필(캐릭터, 배경색상, 스티커)를 변경하는 페이지 입니다.
interface Character {
  characterImageId: number;
  color: number;
  stickerOrder: number;
  stickerImageId: number;
  stickers: [];
}
const initChar: Character = {
  characterImageId: 0,
  color: 0,
  stickerOrder: 0,
  stickerImageId: 0,
  stickers: [],
};

const initAlertProps = {
  message: "",
  onClose: () => {},
  closeLabel: "",
};

const ProfileEdit = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 스티커 / 배경색상 탭을 바꾸는 스테이트 입니다.
  const [state, setState] = useState(false);
  // 리덕스에서 사용자의 프로필을 불러옵니다.
  const userChar: Character = useAppSelect((state) => state.char);
  const curBool = useAppSelect((state) => state.bool);
  const userInfo = useAppSelect((state) => state.user);
  // 유저의 프로필 정보를 변경하는 스테이트 입니다.
  const [curChar, setCurChar] = useState<Character>(initChar);
  const [alert, setAlert] = useState(initAlertProps);
  const [getBoard, setBoard] = useState<Character>(initChar);
  const [myOrder, setMyOrder] = useState<number | undefined>(undefined);
  const [selectedST, setSelectedST] = useState<any>();

  const STorderFN = (index: any) => {
    setMyOrder(index);
  };
  const STBottomChange = (index: number) => {
    console.log("탑 박스 버튼 체인지 함수", index);
    setSelectedST(index);
  };

  // 유저의 프로필 정보가 변경될때마다, 리덕스의 정보를 업데이트 합니다.
  useEffect(() => {
    boardAxios.getSticker(userInfo.userId).then((res) => {
      setCurChar({ ...initChar, ...userChar, ...res });
    });
    setBoard({ ...userChar });
  }, [userChar]);

  //스티커 정보와 캐릭터 정보를 가져옵니다.
  useEffect(() => {
    const getBoardAxois = () => {
      boardAxios.getBoard(userInfo.userId).then((res) => {
        setBoard({ ...res.user });
        dispatch(setCharacter({ ...res.user }));
      });
    };
    getBoardAxois();
  }, [curBool]);

  const saveProfile = () => {
    const data = {
      characterImageId: userChar.characterImageId,
      backgroundColorId: userChar.color,
    };
    try {
      boardAxios.setBoard(data);
      setAlert({
        message: "저장",
        closeLabel: "확인",
        onClose: () => navigate(`/user/${userInfo.userId}`),
      });
    } catch (error) {
      const { message } = error as Error;
      setAlert({
        message,
        closeLabel: "닫기",
        onClose: () => setAlert(initAlertProps),
      });
    }
  };

  return (
    <React.Fragment>
      {state ? (
        <Header text="프로필 편집" type="userEdit" />
      ) : (
        <Header
          text="프로필 편집"
          type="userEdit"
          btnName="완료"
          setting={() => saveProfile()}
        />
      )}
      <AlertModal {...alert} />
      <Grid isFlex>
        <MyProfileBoxTop
          state={state}
          sticker={curChar}
          board={getBoard}
          STorderFN={STorderFN}
          myOrder={myOrder}
        />
      </Grid>
      <Grid display="flex" justifyContent="flex-start">
        <div style={{ display: "flex" }}>
          <div
            style={{ margin: "20px", cursor: "pointer" }}
            onClick={() => setState(true)}
          >
            스티커
          </div>
          <div
            style={{ margin: "20px", cursor: "pointer" }}
            onClick={() => setState(false)}
          >
            배경색상
          </div>
        </div>
      </Grid>
      <Grid isFlex>
        <MyProfileBoxBottom
          setCard={state}
          myOrder={myOrder}
          selectedST={selectedST}
          STBottomChange={STBottomChange}
          setSelectedST={setSelectedST}
        />
      </Grid>
    </React.Fragment>
  );
};

export default ProfileEdit;
