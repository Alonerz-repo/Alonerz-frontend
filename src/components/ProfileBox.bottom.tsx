import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelect } from "../store/config.hook";
import { setCharacter } from "../store/slices/characterSlice";
import { setBool } from "../store/slices/changeSlice";
import boardAxios from "../axios/boardAxios";
import BackgroundModule from "../assets/background";
import StickerModule from "../assets/sticker";

//프로필(캐릭터, 스티커, 색상)용으로 반복되는 카드들 모음입니다.

interface ProflieBoxProps {
  setCard?: any;
}

const colorList = BackgroundModule.rows;
const stickerList = StickerModule.rows;

const ProfileBoxBottom = (props: any) => {
  const { setCard }: ProflieBoxProps = props;
  const dispatch = useAppDispatch();
  //리덕스의 유저 캐릭터 정보를 데이터를 가져옵니다.
  const Board = useAppSelect((state) => state.char);

  //스티커 정보를 스테이트에 갱신합니다.
  const setStickersFn = (index: any) => {
    props.STBottomChange(index);
    const data = {
      stickerOrder: props.myOrder,
      stickerImageId: index,
    };
    boardAxios.setSticker(data).then((_) => {
      dispatch(
        setCharacter({
          ...Board,
          stickerOrder: props.myOrder,
          stickerImageId: index,
        })
      );
    });
  };

  //백그라운드 컬러를 스테이트에 갱신합니다.
  const setBackgroundFn = (myColor: any) => {
    props.STBottomChange(myColor.id);
    dispatch(
      setCharacter({
        ...Board,
        backgroundColorId: myColor.id,
        color: myColor.id,
      })
    );
  };
  //프로필 캐릭터 선택 카드들
  if (setCard) {
    //프로필 스티커 카드들
    return (
      <React.Fragment>
        {stickerList.map((value) => {
          if (props.selectedST === value.id) {
            return (
              <div onClick={() => setStickersFn(value.id)} key={value.id}>
                <StickerBox style={{}}>
                  <img
                    src={value.image}
                    object-fit="cover"
                    alt=""
                    style={{
                      width: "88px",
                      height: "88px",
                      position: "relative",
                      top: "10px",
                      background: "rgb(0,0,0,10%)",
                      borderRadius: "50%",
                    }}
                  />
                </StickerBox>
              </div>
            );
          }
          return (
            <div onClick={() => setStickersFn(value.id)} key={value.id}>
              <StickerBox style={{}}>
                <img
                  src={value.image}
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
        <MyColorBox
          style={{
            background: "white",
            border: "1px solid",
            cursor: "pointer",
          }}
          onClick={() => setBackgroundFn(BackgroundModule.rows[1])}
        >
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
          if (props.selectedST === value.id && index > 1) {
            console.log("current!!");
            return (
              <div key={value.id} onClick={() => setBackgroundFn(value)}>
                <MyColorBox
                  style={{
                    background: `${value.color}`,
                    cursor: "pointer",
                    boxShadow: "3px 3px 3px 3px #999",
                  }}
                ></MyColorBox>
              </div>
            );
          }
          if (index > 1) {
            return (
              <div key={value.id} onClick={() => setBackgroundFn(value)}>
                <MyColorBox
                  style={{ background: `${value.color}`, cursor: "pointer" }}
                ></MyColorBox>
              </div>
            );
          }
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
  text-align: center;
  cursor: pointer;
`;

const MyColorBox = styled(Box)`
  width: 108px;
  height: 108px;
  margin: 10px;
`;

export default ProfileBoxBottom;
