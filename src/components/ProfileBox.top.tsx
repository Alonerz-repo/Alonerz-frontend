import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { characterImageUtils } from "../utils/asset";
import { Grid } from "../elements";
import icon from "../assets/header";
import { useAppSelect, useAppDispatch } from "../store/config.hook";
import { setCharacter } from "../store/slices/characterSlice";
import { backgroundColorUtils, stickerImageUtils } from "../utils/asset";
import boardAxios from "../axios/boardAxios";

//프로필 캐릭터 스티커용 상단 컴포넌트입니다.
interface Props {
  bg?: string;
}

interface Stickers {
  stickerOrder: number;
  id: number;
  url: string;
  stickerImageId: number;
}
const initialState = {
  id: 0,
  stickerOrder: 0,
  url: "",
};
const Box = styled.div<Props>`
  width: 100%;
  height: 396px;
  position: relative;
  border-radius: 0px 0px 20px 20px;
  ${(props) => (props.bg ? `background: ${props.bg}` : `background: #EEEEEE;`)};
`;

const Circle = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background: #e0e0e0;
  border-radius: 40px;
  font-size: 30px;
  text-align: center;
  color: white;
`;

const StickerImage = styled.img`
  position: absolute;
  width: 78px;
  height: 78px;
`;

//스티커 컴포넌트
const StickerBox = (props: any) => {
  const { sticker } = props;

  const dispatch = useAppDispatch();

  const stickerList: Stickers[] = [...sticker.stickers];
  const stikcer = stickerList.map((value) => {
    const { stickerOrder, stickerImageId } = value;
    const image = stickerImageUtils.findById(stickerImageId);
    return { stickerOrder, ...image };
  });

  //스티커 오더를 리덕스에 저장합니다.
  const curPosition = (index: number) => {
    dispatch(setCharacter({ ...sticker, stickerOrder: index }));
  };

  const setST = (myIndex: number) => {
    const a = stikcer.find((value) => value.stickerOrder === myIndex);
    if (a !== undefined) {
      console.log("current!");
      return true;
    } else {
      console.log("false!");
      return false;
    }
  };
  const getST = (myIndex: number) => {
    const b = stikcer.find((value) => value.stickerOrder === myIndex);
    return b;
  };
  return (
    <React.Fragment>
      <Box>
        <div onClick={() => curPosition(0)}>
          {setST(0) ? (
            <StickerImage
              style={{ left: "100px", top: "75px" }}
              src={getST(0)?.url}
              alt=""
            />
          ) : (
            <Circle style={{ left: "116px", top: "93px" }}>+</Circle>
          )}
        </div>
        <div onClick={() => curPosition(1)}>
          {setST(1) ? (
            <StickerImage
              style={{ right: "94px", top: "75px" }}
              src={getST(1)?.url}
            />
          ) : (
            <Circle style={{ right: "115px", top: "93px" }}>+</Circle>
          )}
        </div>
        <div onClick={() => curPosition(2)}>
          {setST(2) ? (
            <StickerImage
              style={{ left: "100px", bottom: "137px" }}
              src={getST(2)?.url}
            />
          ) : (
            <Circle style={{ left: "116px", bottom: "153px" }}>+</Circle>
          )}
        </div>
        <div onClick={() => curPosition(3)}>
          {setST(3) ? (
            <StickerImage
              style={{ right: "94px", bottom: "137px" }}
              src={getST(3)?.url}
            />
          ) : (
            <Circle style={{ right: "116px", bottom: "153px" }}>+</Circle>
          )}
        </div>
      </Box>
    </React.Fragment>
  );
};

const CharBox = (props: any) => {
  const { Character, color, board } = props;
  const dispatch = useAppDispatch();
  const [myColor, setColor] = useState<any>("#FFD9D9");
  const [curNum, setNum] = useState<number>(0);
  const length = characterImageUtils.getAll().length;
  const image = characterImageUtils.findById(curNum);
  const myBoard = useAppSelect((state) => state.char);

  useEffect(() => {
    if (board !== undefined) {
      setNum(board.characterImageId);
      const getColor = backgroundColorUtils.findById(board.backgroundColorId);
      setColor(getColor?.color);
    }
  }, [board]);

  useEffect(() => {
    dispatch(setCharacter({ ...myBoard, Character: curNum }));
  }, [curNum]);

  useEffect(() => {
    const color = backgroundColorUtils.findById(myBoard.color);
    setColor(color?.color);
  }, [myBoard]);

  const click = (changeNum: any) => {
    switch (changeNum) {
      case 1:
        if (curNum === length - 1) {
          return setNum(0);
        }
        return setNum(curNum + 1);
      case -1:
        if (curNum === 0) {
          return setNum(length - 1);
        }
        return setNum(curNum - 1);
    }
  };
  return (
    <React.Fragment>
      <Grid width="100%">
        <Box
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
          bg={myColor}
        >
          <img
            onClick={() => click(-1)}
            style={{ width: "34px", height: "34px" }}
            src={icon[6]}
            alt=""
          />

          <img
            style={{ width: "114px", height: "171px" }}
            src={image ? image.url : ""}
            alt=""
          />
          <img
            onClick={() => click(1)}
            style={{ width: "34px", height: "34px" }}
            src={icon[5]}
            alt=""
          />
        </Box>
      </Grid>
    </React.Fragment>
  );
};

const ProfileBoxTop = (props: any) => {
  const { state, sticker, board } = props;
  return (
    <React.Fragment>
      {state ? (
        <StickerBox sticker={sticker} />
      ) : (
        <CharBox board={board} sticker={sticker} />
      )}
    </React.Fragment>
  );
};

export default ProfileBoxTop;
