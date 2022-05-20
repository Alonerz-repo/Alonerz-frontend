import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Grid, Text, Button } from "../elements";
import MyProfileBox from "../components/ProfileBox";
import Assets from "../assets/assets.json";
import { useAppSelect } from "../store/config.hook";

//유저 프로필(캐릭터, 배경색상, 스티커)를 변경하는 페이지 입니다.
interface Character {
  Character: number;
  sticker: any;
  color: string;
}
const initChar: Character = {
  Character: 0,
  sticker: {},
  color: "",
};
const ProfileEdit = ({ type }: any) => {
  const [state, setState] = useState(1);
  const userChar: Character = useAppSelect((state) => state.char);
  const [curChar, setCurChar] = useState<Character>(initChar);
  const [curSticker, setCurSticker] = useState("a");

  useEffect(() => {
    setCurChar(userChar);
  }, [userChar]);

  const click = (key: any) => {
    setCurSticker(key);
  };

  return (
    <React.Fragment>
      <Header text="프로필 편집" type="userEdit" btnName="완료"></Header>

      <Grid isFlex>
        <Box style={{ width: "220px", height: "288px", position: "relative" }}>
          {userChar.sticker}
          <Circle
            onClick={() => click("a")}
            style={{ position: "absolute", left: "50px", top: "42px" }}
          >
            +
          </Circle>
          <Circle
            onClick={() => click("s")}
            style={{ position: "absolute", right: "46px", top: "98px" }}
          >
            +
          </Circle>
          <Circle
            onClick={() => click("d")}
            style={{ position: "absolute", left: "46px", bottom: "112px" }}
          >
            +
          </Circle>
          <Circle
            onClick={() => click("f")}
            style={{ position: "absolute", right: "76px", bottom: "42px" }}
          >
            +
          </Circle>
        </Box>
        <Box
          style={{
            width: "158px",
            height: "288px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ margin: "69px 29px" }}>
            <img
              src={Assets.characters[curChar.Character]}
              alt=""
              style={{
                width: "100px",
                height: "150px",
              }}
            />
          </div>
        </Box>
      </Grid>
      <Grid display="flex" justifyContent="flex-start">
        <Button _onClick={() => setState(1)}>캐릭터</Button>
        <Button _onClick={() => setState(2)}>스티커</Button>
        <Button _onClick={() => setState(3)}>배경색상</Button>
      </Grid>
      <Grid isFlex>
        <MyProfileBox
          setSticker={curSticker}
          setCard={state}
          _onClick={click}
        ></MyProfileBox>
      </Grid>
    </React.Fragment>
  );
};

ProfileEdit.defaultProps = {
  type: "color",
};

const Box = styled.div`
  background: #eeeeee;
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
