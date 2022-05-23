import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Assets from "../assets/assets.json";
import { useAppDispatch, useAppSelect } from "../store/config.hook";
import { setCharacter } from "../store/slices/characterSlice";
import { backgroundColorUtils, stickerImageUtils } from "../utils/asset";

//프로필(캐릭터, 스티커, 색상)용으로 반복되는 카드들 모음입니다.

interface ProflieBoxProps {
  setCard?: any;
}

const ProfileBoxBottom = ({ setCard }: ProflieBoxProps) => {
  const dispatch = useAppDispatch();
  const Board = useAppSelect((state) => state.char);
  const colorList = backgroundColorUtils.getAll();
  const stickerList = stickerImageUtils.getAll();

  //에셋 정보를 가져옵니다.
  const myasset = Assets;
  //스테이트에 프로필 정보를 저장합니다.
  const [curChar, setCurChar] = useState({
    Character: 0,
    color: "",
    stickerOrder: 0,
    stickerImageId: 0,
  });

  //프로필 정보가 바뀔때마다 리덕스의 데이터를 갱신합니다.
  useEffect(() => {
    dispatch(setCharacter(curChar));
  }, [curChar]);

  //스티커 정보를 스테이트에 갱신합니다.
  const setStickersFn = (index: any) => {
    dispatch(setCharacter({ ...Board, stickerImageId: index }));
  };
  //백그라운드 컬러를 스테이트에 갱신합니다.
  const setBackgroundFn = (myColor: any) => {
    dispatch(setCharacter({ ...Board, color: myColor.id }));
  };
  //프로필 캐릭터 선택 카드들
  if (setCard) {
    //프로필 스티커 카드들
    return (
      <React.Fragment>
        {stickerList.map((value) => {
          return (
            <div onClick={() => setStickersFn(value.id)} key={value.id}>
              <StickerBox style={{ textAlign: "center" }}>
                <img
                  src={value.url}
                  object-fit="cover"
                  alt=""
                  style={{
                    width: "88px",
                    height: "88px",
                    position: "relative",
                    top: "10px",
                  }}
                />
              </StickerBox>
            </div>
          );
        })}
      </React.Fragment>
    );
  } else if (!setCard) {
    //프로필 색상 선택 카드들
    return (
      <React.Fragment>
        <MyColorBox style={{ background: "white", border: "1px solid" }}>
          <div
            style={{
              border: "1px solid rgb(255, 0, 0)",
              transform: "rotate(135deg)",
              position: "absolute",
              width: "135px",
              top: "64px",
              left: "-3px",
            }}
          ></div>
        </MyColorBox>
        {colorList.map((value: any, index: number) => {
          return (
            <div key={value.id} onClick={() => setBackgroundFn(value)}>
              <MyColorBox style={{ background: `${value.color}` }}></MyColorBox>
            </div>
          );
        })}
      </React.Fragment>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
};

const Box = styled.div`
  background: #eeeeee;
  border-radius: 20px;
`;

const StickerBox = styled(Box)`
  width: 108px;
  height: 108px;
  margin: 10px;
`;

const MyColorBox = styled(Box)`
  width: 108px;
  height: 108px;
  margin: 10px;
`;

export default ProfileBoxBottom;