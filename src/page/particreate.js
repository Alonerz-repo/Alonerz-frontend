import React from "react";
import styled from "styled-components";
import { Input } from "../element/index";

const PartiCreate = () => {
  return (
    <>
      <GRID style={{ flexDirection: "column" }}>
        <DIV style={{ margin: "20px" }}>
          <Input placeholder="모임 제목을 입력해주세요" label="모임제목" />
        </DIV>
        <DIV style={{ margin: "20px" }}>
          <Input placeholder="모임 제목을 입력해주세요" label="모임제목" />
        </DIV>
        <DIV style={{ margin: "20px" }}>
          <Input placeholder="모임 제목을 입력해주세요" label="모임제목" />
        </DIV>
        <DIV style={{ margin: "20px" }}>
          <Input placeholder="모임 제목을 입력해주세요" label="모임제목" />
        </DIV>
        <GRID style={{ alignItems: "center", flexDirection: "column" }}>
          <INPUTDIV>
            모임제목
            <INPUTBOX placeholder="모임제목"></INPUTBOX>
          </INPUTDIV>
          <INPUTDIV>
            카테고리
            <INPUTBOX placeholder="모임제목"></INPUTBOX>
          </INPUTDIV>
          <INPUTDIV>
            메뉴
            <INPUTBOX placeholder="모임제목"></INPUTBOX>
          </INPUTDIV>
          <INPUTDIV>
            날짜
            <INPUTBOX placeholder="모임제목"></INPUTBOX>
          </INPUTDIV>
        </GRID>
        <GRID style={{ alignItems: "center", flexDirection: "row" }}>
          <INPUTDIV style={{}}>
            오픈시간
            <INPUTBOX placeholder="오전 11시"></INPUTBOX>
          </INPUTDIV>
          <INPUTDIV>
            오픈시간
            <INPUTBOX placeholder="오전 11시"></INPUTBOX>
          </INPUTDIV>
        </GRID>
        <GRID style={{ justifyContent: "space-around" }}>
          <BTN>1명</BTN>
          <BTN>2명</BTN>
          <BTN>3명</BTN>
        </GRID>
        <GRID style={{ alignItems: "center", flexDirection: "column" }}>
          <INPUTDIV>
            장소
            <INPUTBOX placeholder="경기도 고양시 고양대로 고양이식당"></INPUTBOX>
          </INPUTDIV>
          <INPUTDIV>
            파티 목적
            <INPUTAREA
              type="textarea"
              placeholder="목적이 무엇인가?"
            ></INPUTAREA>
          </INPUTDIV>
        </GRID>
        <GRID style={{ alignItems: "center", flexDirection: "column" }}>
          <INPUTDIV>
            이미지 업로드
            <IMAGEPRIVIEW style={{ textAlign: "center" }}>
              {" "}
              나는 프리뷰이다{" "}
            </IMAGEPRIVIEW>
          </INPUTDIV>
        </GRID>
        <GRID>
          <INPUTDIV
            style={{ width: "100%", background: "grey", color: "white" }}
          >
            주의사항
            <TEXT> 나는 텍스트 </TEXT>
            <TEXT> 나는 텍스트 </TEXT>
            <TEXT> 나는 텍스트 </TEXT>
            <TEXT> 나는 텍스트 </TEXT>
            <TEXT> 나는 텍스트 </TEXT>
            <TEXT> 나는 텍스트 </TEXT>
            <TEXT> 나는 텍스트 </TEXT>
          </INPUTDIV>
        </GRID>
        <GRID>
          <BTN
            style={{
              width: "100%",
              background: "green",
              color: "white",
              fontSize: "16px",
            }}
          >
            개설하기
          </BTN>
        </GRID>
      </GRID>
    </>
  );
};
const IMAGEPRIVIEW = styled.div`
  background: skyblue;
  padding: 250px;
  border-radius: 15px;
`;
const GRID = styled.div`
  border: 2px solid;
  display: flex;
  width: 100%;
`;

const INPUTDIV = styled.div`
  border: 2px solid green;
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const INPUTBOX = styled.input`
  border-radius: 15px;
  max-width: 100%;
  height: 51px;
`;

const INPUTAREA = styled.textarea`
  border-radius: 15px;
  max-width: 100%;
  height: 100px;
`;

const BTN = styled.button`
  outline: none;
  background: yellow;
  padding: 20px;

  :hover {
    background: red;
  }
`;
const DIV = styled.div``;
const TEXT = styled.div``;
export default PartiCreate;
