import React, { forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Assets from "../assets/assets.json";
import { useAppSelect, useAppDispatch } from "../store/config.hook";
import { setCharacter } from "../store/slices/characterSlice";

//프로필(캐릭터, 스티커, 색상)용으로 반복되는 카드들 모음입니다.

interface ProflieBoxProps {
  setCard?: any;
  _onClick?: (e: any) => void;
  setSticker: string;
}

const MyProfileBox = ({ setCard, _onClick, setSticker }: ProflieBoxProps) => {
  const dispatch = useAppDispatch();
  //에셋 정보를 가져옵니다.
  const myasset = Assets;
  //스테이트에 프로필 정보를 저장합니다.
  const [curChar, setCurChar] = useState({
    Character: 0,
    sticker: {
      a: null,
      s: null,
      d: null,
      f: null,
    },
    color: "",
  });
  console.log(setSticker);
  //프로필 정보가 바뀔때마다 리덕스의 데이터를 갱신합니다.
  useEffect(() => {
    dispatch(setCharacter(curChar));
  }, [curChar]);

  //캐릭터 데이터를 스테이트에 갱신합니다.
  const setCharacterFn = (index: any) => {
    console.log("hello characters", index);
    setCurChar({ ...curChar, Character: index });
  };
  //스티커 정보를 스테이트에 갱신합니다.
  const setStickersFn = (index: any) => {
    console.log("hello sticker!", index);
    setCurChar({
      ...curChar,
      sticker: { ...curChar.sticker, [setSticker]: index },
    });
  };
  //프로필 캐릭터 선택 카드들
  if (setCard === 1) {
    return (
      <React.Fragment>
        {myasset.characters.map((value, index) => {
          return (
            <div
              onClick={() => {
                setCharacterFn(index);
              }}
              key={index}
            >
              <CharBox style={{ textAlign: "center" }}>
                <img
                  src={value}
                  alt=""
                  style={{
                    width: "80px",
                    height: "120px",
                    position: "relative",
                    top: "38px",
                  }}
                />
              </CharBox>
            </div>
          );
        })}
      </React.Fragment>
    );
  } else if (setCard === 2) {
    //프로필 스티커 카드들
    return (
      <React.Fragment>
        {myasset.frames.map((value, index) => {
          return (
            <div onClick={() => setStickersFn(index)} key={index}>
              <StickerBox style={{ textAlign: "center" }}>
                <img
                  src={value}
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
  } else if (setCard === 3) {
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
        <MyColorBox style={{ background: "#FFD9D9" }}></MyColorBox>
        <MyColorBox style={{ background: "#FF5D5D" }}></MyColorBox>
        <MyColorBox style={{ background: "#9EE8FF" }}></MyColorBox>
        <MyColorBox style={{ background: "#C377FF" }}></MyColorBox>
        <MyColorBox style={{ background: "#B8E5A3" }}></MyColorBox>
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

const CharBox = styled(Box)`
  width: 108px;
  height: 222px;
  margin: 10px;
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

export default MyProfileBox;
