import React from "react";
import styled from "styled-components";

const MyPage = () => {
  return (
    <>
      <GRID style={{ flexDirection: "column" }}>
        <GRID style={{ justifyContent: "end" }}>
          <BTN style={{ position: "absolute", left: "0px" }}>햄버거</BTN>
          <BTN>설정</BTN>
          <BTN>홈으로</BTN>
        </GRID>
        <GRID style={{ flexDirection: "column" }}>
          <GRID style={{ justifyContent: "center" }}>
            <DIV>
              <IMAGEPRIVIEW
                style={{
                  padding: "0px",
                  width: "130px",
                  height: "130px",
                  borderRadius: "130px",
                }}
              >
                <IMAGEPRIVIEW
                  style={{
                    background: "blueviolet",
                    padding: "0px",
                    width: "38px",
                    height: "38px",
                    borderRadius: "38px",
                    position: "relative",
                    left: "90px",
                    top: "90px",
                  }}
                />
              </IMAGEPRIVIEW>
            </DIV>
          </GRID>
          <GRID style={{ justifyContent: "center" }}>
            <TEXT
              style={{
                display: "flex",
                fontSize: "20px",
                fontWeight: "bold",
                alignItems: "baseline",
              }}
            >
              <TEXT style={{ fontSize: "14px", fontWeight: "normal" }}>
                검증
              </TEXT>
              나는 긴 닉네임을 가진 닉네임이다
            </TEXT>
          </GRID>
          <GRID style={{ justifyContent: "center" }}>
            <DIV>
              <DIV
                style={{
                  background: "#C4C4C4",
                  color: "white",
                  padding: "10px",
                  borderRadius: "30px",
                  width: "173px",
                  heigth: "30px",
                  display: "flex",
                }}
              >
                <GRID style={{ justifyContent: "center", border: "none" }}>
                  <DIV style={{ flexGrow: "1", textAlign: "center" }}>
                    디자인
                  </DIV>
                  <DIV
                    style={{
                      border: "1px solid white",
                      height: "20px",
                      width: "1px",
                    }}
                  ></DIV>
                  <DIV style={{ flexGrow: "1", textAlign: "center" }}>신입</DIV>
                </GRID>
              </DIV>
            </DIV>
          </GRID>
          <GRID style={{ justifyContent: "center" }}>
            <DIV>
              <TEXT style={{ padding: "15px" }}>
                {" "}
                프로그래밍 배우고 있습니다 국밥 좋아합니다프로그래밍 배우고
                있습니다 국밥 좋아합니다프로그래밍 배우고 있습니다 국밥
                좋아합니다프로그래밍 배우고 있습니다 국밥 좋아합니다프로그래밍
                배우고 있습니다 국밥 좋아합니다프로그래밍 배우고 있습니다 국밥
                좋아합니다
              </TEXT>
            </DIV>
          </GRID>
          <GRID style={{ flexDirection: "column" }}>
            <TEXT
              style={{
                fontSize: "16px",
                margin: "0px 20px",
                fontWeight: "bold",
              }}
            >
              참가했던 파티 기록들..
            </TEXT>
            <GRID style={{ flexWrap: "wrap", justifyContent: "center" }}>
              <DIV>
                <DIV
                  style={{ display: "flex", margin: "15px", flexWrap: "wrap" }}
                >
                  <DIV
                    style={{
                      position: "relative",
                    }}
                  >
                    <IMAGEPRIVIEW
                      style={{
                        position: "absolute",
                        padding: "80px",
                        margin: "5px",
                        background:
                          "linear-gradient(0deg, rgba(110,110,110,1) 0%, rgba(255,255,255,0) 60%)",
                      }}
                    ></IMAGEPRIVIEW>
                    <IMAGEPRIVIEW
                      style={{
                        padding: "80px",
                        margin: "5px",
                      }}
                    ></IMAGEPRIVIEW>
                    <DIV
                      style={{
                        position: "absolute",
                        top: "90px",
                        left: "19px",
                      }}
                    >
                      <TEXT>모임 제목</TEXT>
                      <TEXT>모임 장소</TEXT>
                      <TEXT>12:00 ~ 13:00</TEXT>
                    </DIV>
                  </DIV>
                </DIV>
              </DIV>
            </GRID>
          </GRID>
        </GRID>
      </GRID>
    </>
  );
};
const IMAGEPRIVIEW = styled.div`
  background: skyblue;
  /* padding: 250px; */
  border-radius: 15px;
  box-sizing: border-box;
`;
const GRID = styled.div`
  border: 2px solid;
  display: flex;
  width: 100%;
  box-sizing: border-box;
`;

const BTN = styled.button`
  outline: none;
  background: yellow;
  padding: 20px;
  box-sizing: border-box;

  :hover {
    background: red;
  }
`;
const DIV = styled.div`
  box-sizing: border-box;
`;
const TEXT = styled.div``;
export default MyPage;
