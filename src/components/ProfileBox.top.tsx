import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { characterImageUtils } from "../utils/asset";
import { Grid } from "../elements";
import icon from "../assets/header";
import { useAppDispatch } from "../store/config.hook";
import { setCharacter } from "../store/slices/characterSlice";
import { backgroundColorUtils, stickerImageUtils } from "../utils/asset";

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
  console.log(
    "top 스티커 컴포넌트에서 이미지가 변경되었나?",
    sticker.stickerImageId
  );
  const dispatch = useAppDispatch();

  const stickerList: Stickers[] = [...sticker.stickers];
  const myStikcer = stickerList.map((value, index) => {
    let { stickerOrder, stickerImageId } = value;
    if (stickerOrder === sticker.stickerOrder && sticker.stickerImageId) {
      stickerOrder = sticker.stickerOrder;
      stickerImageId = sticker.stickerImageId;
    }
    const image = stickerImageUtils.findById(stickerImageId);
    console.log("스티커이미지 맵안에서 변경되었나?", stickerImageId, index);
    return { stickerOrder, ...image };
  });

  //스티커 오더를 리덕스에 저장합니다.
  const curPosition = (index: number) => {
    dispatch(setCharacter({ ...sticker, stickerOrder: index }));
  };

  const setST = (myIndex: number) => {
    const findST = myStikcer.find((value) => value.stickerOrder === myIndex);
    if (findST !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  const getST = (myIndex: number) => {
    const ST = myStikcer.find((value) => value.stickerOrder === myIndex);
    return ST;
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

//캐릭터와 배경을 선택하는 박스
const CharBox = ({ board }: any) => {
  const dispatch = useAppDispatch();
  const [myColor, setColor] = useState<any>("#FFD9D9");
  const [curNum, setNum] = useState<number>(0);
  const length = characterImageUtils.getAll().length;
  const image = characterImageUtils.findById(curNum);

  useEffect(() => {
    if (board !== undefined) {
      setNum(board.characterImageId);
      const result = backgroundColorUtils.findById(board.backgroundColorId);

      setColor(result?.color);
    }
  }, [board]);

  const click = (changeNum: number) => {
    if (changeNum > 0) {
      if (curNum === length - 1) {
        dispatch(setCharacter({ ...board, characterImageId: 0, Character: 0 }));
        return setNum(0);
      } else {
        dispatch(
          setCharacter({
            ...board,
            characterImageId: curNum + 1,
            Character: curNum + 1,
          })
        );
        return setNum(curNum + 1);
      }
    } else {
      if (curNum === 0) {
        dispatch(
          setCharacter({
            ...board,
            characterImageId: length - 1,
            Character: length - 1,
          })
        );
        return setNum(length - 1);
      } else {
        dispatch(
          setCharacter({
            ...board,
            characterImageId: curNum - 1,
            Character: curNum - 1,
          })
        );
        return setNum(curNum - 1);
      }
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
