import React, { forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Assets from "../assets/assets.json";
import { useAppSelect, useAppDispatch } from "../store/config.hook";
import { setCharacter } from "../store/slices/characterSlice";

//프로필(캐릭터, 스티커, 색상)용으로 반복되는 카드들 모음입니다.

interface ProflieBoxProps {
  setCard?: any;
  _onClick?: (e: any) => void;
  ref?: any;
}

const MyProfileBox = forwardRef(
  ({ setCard, _onClick }: ProflieBoxProps, ref: any) => {
    //캐릭터 리덕스에 접근해서 캐릭터 정보를 가져옵니다.
    const char = useAppSelect((state) => state.char);
    const dispatch = useAppDispatch();

    const [curChar, setCurChar] = useState();

    useEffect(() => {
      dispatch(setCharacter(curChar));
    }, [curChar]);

    const myasset = Assets;
    const setCharacterFn = (index: any) => {
      console.log("hello characters", index);
      setCurChar(index);
    };
    const setStickersFn = () => {
      console.log("hello sticker!");
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
              >
                <CharBox key={index} style={{ textAlign: "center" }}>
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
              <StickerBox key={index} style={{ textAlign: "center" }}>
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
  }
);

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
