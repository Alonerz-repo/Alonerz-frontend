import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Input, Button, Grid, Text } from "../elements/index";
import { useDispatch } from "react-redux";
import { actionCreators as partyCreator } from "../redux/modules/party";

const PartiCreate = () => {
  const dispatch = useDispatch();
  const partyInput = useRef([]);

  const [getNum, setNum] = useState(0);
  const [geta, seta] = useState(false);
  const [getb, setb] = useState(false);
  const [getc, setc] = useState(false);

  const changeText = (e) => {
    console.log(typeof e.target.value.length);
    let num = e.target.value.length;
    if (num > 100) {
      e.target.value = e.target.value.slice(0, 100);
    } else {
      setNum(num);
    }
  };
  const clickHandle = () => {
    let body = [];
    partyInput.current.map((value) => {
      body.push(value.value);
    });
    body.push(getNum);
    dispatch(partyCreator.createParty(body));
  };

  const setMember = (string) => {
    switch (string) {
      case "2":
        seta(true);
        setb(false);
        setc(false);
        setNum(2);
        break;
      case "3":
        setb(true);
        seta(false);
        setc(false);
        setNum(3);
        break;
      case "4":
        setc(true);
        seta(false);
        setb(false);
        setNum(4);
        break;
      default:
        console.log("ERROR!");
        break;
    }
  };

  return (
    <>
      <Grid>
        <DIV style={{ margin: "20px" }}>
          <Input
            ref={(title) => (partyInput.current[0] = title)}
            placeholder="모임 제목을 입력해주세요"
            label="모임제목"
          />
        </DIV>
        <DIV style={{ margin: "20px" }}>
          <Input
            ref={(action) => (partyInput.current[1] = action)}
            placeholder="카테고리를 입력해주세요"
            label="카테고리"
          />
        </DIV>
        <DIV style={{ margin: "20px" }}>
          <Input
            ref={(menu) => (partyInput.current[2] = menu)}
            placeholder="메뉴를 입력해주세요"
            label="메뉴"
          />
        </DIV>
        <DIV style={{ margin: "20px" }}>
          <Input
            ref={(day) => (partyInput.current[3] = day)}
            placeholder="날짜를 입력해주세요"
            label="날짜"
          />
        </DIV>

        <Grid flex="flex">
          <DIV style={{ margin: "20px", width: "100%" }}>
            <Input
              ref={(startAt) => (partyInput.current[4] = startAt)}
              placeholder="오전 11시"
              label="오픈시간"
            />
          </DIV>
          <DIV style={{ margin: "20px", width: "100%" }}>
            <Input
              ref={(endAt) => (partyInput.current[5] = endAt)}
              placeholder="오후 11시"
              label="마감시간"
            />
          </DIV>
        </Grid>
        <Grid flex="flex">
          <Text>인원수</Text>
          <DIV style={{ background: "green" }}>
            <Button
              isCheck={geta}
              type="checkbox"
              _onClick={() => setMember("2")}
            >
              2명
            </Button>
            <Button
              isCheck={getb}
              type="checkbox"
              _onClick={() => setMember("3")}
            >
              3명
            </Button>
            <Button
              isCheck={getc}
              type="checkbox"
              _onClick={() => setMember("4")}
            >
              4명
            </Button>
          </DIV>
        </Grid>
        <DIV style={{ padding: "20px" }}>
          <Input
            ref={(location) => (partyInput.current[6] = location)}
            placeholder="경기도 고양시 고양대로 고양이식당"
            label="장소"
          />
        </DIV>

        <INPUTDIV>
          파티 목적
          <INPUTAREA
            ref={(desciption) => (partyInput.current[7] = desciption)}
            type="textarea"
            maxlength="100"
            onChange={changeText}
            placeholder="목적이 무엇인가?"
          ></INPUTAREA>
          <P>{getNum}/100</P>
        </INPUTDIV>
        <INPUTDIV>
          이미지 업로드
          <IMAGEPRIVIEW style={{ textAlign: "center" }}>
            {" "}
            나는 프리뷰이다{" "}
          </IMAGEPRIVIEW>
        </INPUTDIV>
        <INPUTDIV style={{ width: "100%", background: "grey", color: "white" }}>
          주의사항
          <Text>난 텍스트</Text>
        </INPUTDIV>
        <Button _onClick={clickHandle}>나는 버튼이다</Button>
      </Grid>
    </>
  );
};

const P = styled.p`
  position: absolute;
  bottom: -9vh;
  left: 70vw;
`;

const IMAGEPRIVIEW = styled.div`
  background: skyblue;
  padding: 100px;
  border-radius: 15px;
`;

const INPUTDIV = styled.div`
  border: 2px solid green;
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const INPUTAREA = styled.textarea`
  border-radius: 15px;
  max-width: 100%;
  height: 100px;
`;
const DIV = styled.div`
  box-sizing: border-box;
`;
export default PartiCreate;
