import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { Grid, Text, Button } from '../elements';
import MyProfileBox from '../components/ProfileBox';
import Assets from '../assets/assets.json';
import { useAppSelect, useAppDispatch } from '../store/config.hook';
import { setCharacter } from '../store/slices/characterSlice';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../components/AlertModal';

//유저 프로필(캐릭터, 배경색상, 스티커)를 변경하는 페이지 입니다.
interface Character {
  Character: number;
  sticker: any;
  color: string;
}
const initChar: Character = {
  Character: 0,
  sticker: [],
  color: '',
};
const ProfileEdit = ({ type }: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // 캐릭터 / 스티커 / 배경색상 탭을 바꾸는 스테이트 입니다.
  const [state, setState] = useState(1);
  // 리덕스에서 사용자의 프로필을 불러옵니다.
  const userChar: Character = useAppSelect((state) => state.char);
  // 유저의 프로필 정보를 변경하는 스테이트 입니다.
  const [curChar, setCurChar] = useState<Character>(initChar);
  // 유저가 스티커를 어디를 클릭했는지 저장하는 스테이트입니다.
  const [curSticker, setCurSticker] = useState(0);
  const [message, setMessage] = useState<string>('');
  const onClose = () => setMessage('');

  // 유저의 프로필 정보가 변경될때마다, 리덕스의 정보를 업데이트 합니다.
  useEffect(() => {
    setCurChar(userChar);
  }, [userChar]);

  const stickerSelect = (key: any) => {
    setCurSticker(key);
  };

  const saveProfile = () => {
    dispatch(setCharacter(curChar));
    setMessage('저장이 되었을까요?');
    // navigate('/');
  };

  const modalProps = { message, onClose };
  return (
    <React.Fragment>
      <AlertModal {...modalProps} />
      <Header
        text="프로필 편집"
        type="userEdit"
        btnName="완료"
        setting={saveProfile}
      />
      <Grid isFlex>
        {/* 스티커 시작! */}
        <Box style={{ width: '220px', height: '288px', position: 'relative' }}>
          {userChar.sticker[0] < 0 ? (
            <React.Fragment>
              <Circle
                onClick={() => stickerSelect(0)}
                style={{ position: 'absolute', left: '50px', top: '42px' }}
              >
                +
              </Circle>
            </React.Fragment>
          ) : (
            <img
              style={{
                width: '88px',
                height: '88px',
                position: 'absolute',
                left: '18px',
                top: '22px',
              }}
              onClick={() => stickerSelect(0)}
              src={Assets.frames[userChar.sticker[0]]}
              alt=""
            />
          )}
          {userChar.sticker[1] < 0 ? (
            <React.Fragment>
              <Circle
                onClick={() => stickerSelect(1)}
                style={{ position: 'absolute', right: '46px', top: '98px' }}
              >
                +
              </Circle>
            </React.Fragment>
          ) : (
            <img
              style={{
                width: '88px',
                height: '88px',
                position: 'absolute',
                right: '22px',
                top: '79px',
              }}
              onClick={() => stickerSelect(1)}
              src={Assets.frames[userChar.sticker[1]]}
              alt=""
            />
          )}
          {userChar.sticker[2] < 0 ? (
            <React.Fragment>
              <Circle
                onClick={() => stickerSelect(2)}
                style={{ position: 'absolute', left: '46px', bottom: '112px' }}
              >
                +
              </Circle>
            </React.Fragment>
          ) : (
            <img
              style={{
                width: '88px',
                height: '88px',
                position: 'absolute',
                left: '19px',
                bottom: '75px',
              }}
              onClick={() => stickerSelect(2)}
              src={Assets.frames[userChar.sticker[2]]}
              alt=""
            />
          )}
          {userChar.sticker[3] < 0 ? (
            <React.Fragment>
              <Circle
                onClick={() => stickerSelect(3)}
                style={{ position: 'absolute', right: '76px', bottom: '42px' }}
              >
                +
              </Circle>
            </React.Fragment>
          ) : (
            <img
              style={{
                width: '88px',
                height: '88px',
                position: 'absolute',
                right: '39px',
                bottom: '7px',
              }}
              onClick={() => stickerSelect(3)}
              src={Assets.frames[userChar.sticker[3]]}
              alt=""
            />
          )}
        </Box>
        {/* 스티커 끝! */}
        {/* 캐릭터 배경 시작! */}
        <MyColorBox
          style={{
            background: `${userChar.color ? `${userChar.color}` : '#eeeeee'}`,
            width: '158px',
            height: '288px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div style={{ margin: '69px 29px' }}>
            <img
              src={Assets.characters[curChar.Character]}
              alt=""
              style={{
                width: '100px',
                height: '150px',
              }}
            />
          </div>
        </MyColorBox>
        {/* 캐릭터 배경 끝! */}
      </Grid>
      <Grid display="flex" justifyContent="flex-start">
        <div style={{ display: 'flex' }}>
          <div
            style={{ margin: '20px', cursor: 'pointer' }}
            onClick={() => setState(1)}
          >
            캐릭터
          </div>
          <div
            style={{ margin: '20px', cursor: 'pointer' }}
            onClick={() => setState(2)}
          >
            스티커
          </div>
          <div
            style={{ margin: '20px', cursor: 'pointer' }}
            onClick={() => setState(3)}
          >
            배경색상
          </div>
        </div>
      </Grid>
      <Grid isFlex>
        <MyProfileBox
          setSticker={curSticker}
          setCard={state}
          _onClick={stickerSelect}
        ></MyProfileBox>
      </Grid>
    </React.Fragment>
  );
};

ProfileEdit.defaultProps = {
  type: 'color',
};

const Box = styled.div`
  background: #eeeeee;
  border-radius: 20px;
`;

const MyColorBox = styled.div`
  border-radius: 20px;
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  font-size: 30px;
  text-align: center;
  color: white;
  background: #e0e0e0;
`;
export default ProfileEdit;
