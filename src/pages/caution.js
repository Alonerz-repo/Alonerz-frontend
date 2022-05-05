import React from "react";
import styled from "styled-components";

const Coution = () => {
  return (
    <>
      {/* 버튼 컴포넌트 */}
      <GRID style={{ position: "absolute", top: "93vh" }}>
        <BTN style={{ width: "100%" }}>동의하기</BTN>
      </GRID>
      <GRID style={{ flexDirection: "column" }}>
        {/* 헤더 */}

        <GRID style={{ justifyContent: "center" }}>
          {" "}
          <TEXT>파티 개설</TEXT>
        </GRID>

        {/* 주의사항 본문 */}

        <GRID style={{ padding: "36px", boxSizing: "border-box" }}>
          <DIV
            style={{
              border: "2px solid green",
              width: "100%",
              height: "622px",
              borderRadius: "10px",
            }}
          >
            <TEXT> 나는 주의사항이다 </TEXT>
          </DIV>
        </GRID>
      </GRID>
    </>
  );
};

const DIV = styled.div`
  box-sizing: border-box;
`;
const GRID = styled.div`
  border: 2px solid;
  display: flex;
  width: 100%;
`;
const BTN = styled.button`
  outline: none;
  background: yellow;
  padding: 20px;

  :hover {
    background: red;
  }
`;

const TEXT = styled.div`
  margin: 5px 20px;
  font-size: 14px;
  box-sizing: border-box;
`;

const ICON = styled.div`
  padding: 4px;
  :hover {
    background: red;
  }
`;

export default Coution;
