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

const StickerBox = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getSticker = () => {
      // const data = boardAxios.getSticker()
    };
  }, []);
  const myBoard = useAppSelect((state) => state.char);
  const mySticker = stickerImageUtils.findById(myBoard.stickerImageId);
  console.log(mySticker);
  // 유저가 스티커를 어디를 클릭했는지 저장하는 스테이트입니다.
  const [curSticker, setCurSticker] = useState(0);
  useEffect(() => {
    dispatch(setCharacter({ ...myBoard, stickerOrder: curSticker }));
  }, [curSticker]);

  return (
    <React.Fragment>
      <Box>
        <div onClick={() => setCurSticker(0)}>
          <Circle style={{ left: "116px", top: "93px" }}>+</Circle>
        </div>
        <div onClick={() => setCurSticker(1)}>
          <Circle style={{ right: "115px", top: "93px" }}>+</Circle>
        </div>
        <div onClick={() => setCurSticker(2)}>
          <Circle style={{ left: "116px", bottom: "153px" }}>+</Circle>
        </div>
        <div onClick={() => setCurSticker(3)}>
          <Circle style={{ right: "116px", bottom: "153px" }}>+</Circle>
        </div>
      </Box>
    </React.Fragment>
  );
};

const CharBox = (props: any) => {
  const dispatch = useAppDispatch();
  const [myColor, setColor] = useState<any>("#FFD9D9");
  const [curNum, setNum] = useState<number>(0);
  const length = characterImageUtils.getAll().length;
  const image = characterImageUtils.findById(curNum);
  const myBoard = useAppSelect((state) => state.char);

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
  const { state } = props;
  return (
    <React.Fragment>{state ? <StickerBox /> : <CharBox />}</React.Fragment>
  );
};

export default ProfileBoxTop;
