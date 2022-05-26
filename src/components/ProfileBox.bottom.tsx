import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelect } from '../store/config.hook';
import { setCharacter } from '../store/slices/characterSlice';
import boardAxios from '../axios/boardAxios';
import BackgroundModule from '../assets/background';
import StickerModule from '../assets/sticker';

//프로필(캐릭터, 스티커, 색상)용으로 반복되는 카드들 모음입니다.
interface Character {
  Character: number;
  color: number;
  stickerOrder: number;
  stickerImageId: number;
  stickers: [];
}

const initialState: Character = {
  Character: 0,
  color: 0,
  stickerOrder: 0,
  stickerImageId: 0,
  stickers: [],
};
interface ProflieBoxProps {
  setCard?: any;
}

const colorList = BackgroundModule.rows;
const stickerList = StickerModule.rows;

const ProfileBoxBottom = ({ setCard }: ProflieBoxProps) => {
  const dispatch = useAppDispatch();
  //리덕스의 유저 캐릭터 정보를 데이터를 가져옵니다.
  const userInfo = useAppSelect((state) => state.user);
  const Board = useAppSelect((state) => state.char);

  //스테이트에 프로필 정보를 저장합니다.
  const [curChar, setCurChar] = useState<Character>(initialState);
  useEffect(() => {
    setCurChar({ ...initialState, ...Board });
  }, [Board]);

  // //스티커 정보를 스테이트에 갱신합니다.
  const setStickersFn = (index: any) => {
    dispatch(
      setCharacter({
        ...Board,
        stickerImageId: index,
      }),
    );
    const data = {
      stickerOrder: curChar.stickerOrder,
      stickerImageId: index,
    };
    boardAxios.setSticker(data);
  };
  //백그라운드 컬러를 스테이트에 갱신합니다.
  const setBackgroundFn = (myColor: any) => {
    dispatch(
      setCharacter({
        ...Board,
        backgroundColorId: myColor.id,
        color: myColor.id,
      }),
    );
  };
  //프로필 캐릭터 선택 카드들
  if (setCard) {
    //프로필 스티커 카드들
    return (
      <React.Fragment>
        {stickerList.map((value) => {
          return (
            <div onClick={() => setStickersFn(value.id)} key={value.id}>
              <StickerBox style={{ textAlign: 'center' }}>
                <img
                  src={value.image}
                  object-fit="cover"
                  alt=""
                  style={{
                    width: '88px',
                    height: '88px',
                    position: 'relative',
                    top: '10px',
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
        <MyColorBox style={{ background: 'white', border: '1px solid' }}>
          <div
            style={{
              border: '1px solid rgb(255, 0, 0)',
              transform: 'rotate(135deg)',
              position: 'absolute',
              width: '135px',
              top: '64px',
              left: '-3px',
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
