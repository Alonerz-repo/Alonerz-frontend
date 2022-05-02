import React from "react";
import styled from "styled-components";

const main = () => {
  return (
    <>
      <GRID style={{ flexDirection: "column" }}>
        {/* 상단 헤드 */}

        <GRID style={{ justifyContent: "end" }}>
          <BTN style={{ position: "absolute", left: "0px" }}>햄버거</BTN>
          <BTN>검색</BTN>
          <BTN>내정보</BTN>
        </GRID>

        {/* 오늘 참여중인 파티  */}

        <TEXT>오늘의 참여중인 파티</TEXT>
        <GRID>
          <DIV style={{ width: "100%", margin: "20px", position: "relative" }}>
            <DIV
              style={{
                width: "40px",
                height: "40px",
                background: "blanchedalmond",
                position: "absolute",
                top: "-14px",
                left: "-14px",
                borderRadius: "40px",
              }}
            ></DIV>
            <DIV
              style={{
                position: "absolute",
                width: "50px",
                height: "28px",
                borderRadius: "10px",
                padding: "3px 4px",

                background: "aliceblue",
                right: "5vw",
                top: "2vh",
                textAlign: "center",
              }}
            >
              {" "}
              3 / 4
            </DIV>
            <IMAGEPRIVIEW
              style={{
                position: "absolute",
                width: "100%",
                height: "130px",
                background:
                  "linear-gradient(0deg, rgba(110,110,110,1) 0%, rgba(255,255,255,0) 60%)",
              }}
            ></IMAGEPRIVIEW>
            <IMAGEPRIVIEW
              style={{ width: "100%", height: "130px", border: "2px solid" }}
            ></IMAGEPRIVIEW>
            <DIV
              style={{
                position: "absolute",
                top: "6vh",
                left: "4vw",
              }}
            >
              <TEXT>모임 제목</TEXT>
              <TEXT>모임 장소</TEXT>
              <TEXT>12:00 ~ 13:00</TEXT>
            </DIV>
          </DIV>
        </GRID>

        {/* 전체, 점심, 저녁 버튼 */}

        <GRID style={{ justifyContent: "center" }}>
          <BTN
            style={{
              width: "56px",
              height: "30px",
              padding: "5px 14px",
              background: "#C4C4C4",
              borderRadius: "15px",
              border: "none",
              fontSize: "15px",
              margin: "0px 10px",
            }}
          >
            전체
          </BTN>
          <BTN
            style={{
              width: "56px",
              height: "30px",
              padding: "5px 14px",
              background: "#C4C4C4",
              borderRadius: "15px",
              border: "none",
              fontSize: "15px",
              margin: "0px 10px",
            }}
          >
            점심
          </BTN>
          <BTN
            style={{
              width: "56px",
              height: "30px",
              padding: "5px 14px",
              background: "#C4C4C4",
              borderRadius: "15px",
              border: "none",
              fontSize: "15px",
              margin: "0px 10px",
            }}
          >
            저녁
          </BTN>
        </GRID>

        {/* 주변에서 진행중인 파티 */}

        <GRID style={{ flexDirection: "column" }}>
          <DIV>
            <TEXT>주변에서 진행중인 파티</TEXT>
          </DIV>
          <GRID style={{ alignItems: "baseline" }}>
            <DIV
              style={{
                width: "70px",
                height: "30px",
                padding: "6px 10px",
                background: "#EEEEEE",
                borderRadius: "100px",
                textAlign: "center",
              }}
            >
              12 : 00
            </DIV>
            <DIV style={{ margin: "0px 10px" }}>-</DIV>
            <DIV
              style={{
                width: "70px",
                height: "30px",
                padding: "6px 10px",
                background: "#EEEEEE",
                borderRadius: "100px",
                textAlign: "center",
              }}
            >
              13 : 00
            </DIV>
            <DIV style={{ position: "absolute", margin: "6px", right: "5vw" }}>
              정렬순
            </DIV>
          </GRID>
        </GRID>

        {/* 모임 리스트 뷰 */}

        <GRID>
          <DIV
            style={{
              display: "flex",
              flexWrap: "wrap",
              margin: "10px",
              padding: "5px",
            }}
          >
            <DIV
              style={{
                position: "relative",
              }}
            >
              <DIV
                style={{
                  width: "40px",
                  height: "40px",
                  background: "blanchedalmond",
                  position: "absolute",
                  top: "-9px",
                  left: "-10px",
                  borderRadius: "40px",
                }}
              ></DIV>
              <DIV
                style={{
                  position: "absolute",
                  width: "50px",
                  height: "28px",
                  borderRadius: "10px",
                  padding: "3px 4px",

                  background: "aliceblue",
                  right: "10px",
                  top: "10px",
                  textAlign: "center",
                }}
              >
                {" "}
                3 / 4
              </DIV>
              <IMAGEPRIVIEW
                style={{
                  position: "absolute",
                  width: "166px",
                  height: "222px",
                  margin: "5px",
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 48.96%, rgba(0, 0, 0, 0.35) 100%)",
                }}
              ></IMAGEPRIVIEW>
              <IMAGEPRIVIEW
                style={{
                  width: "166px",
                  height: "222px",
                  margin: "5px",
                }}
              ></IMAGEPRIVIEW>
              <DIV
                style={{
                  position: "absolute",
                  top: "152px",
                  left: "10px",
                }}
              >
                <TEXT>모임 제목</TEXT>
                <TEXT>모임 장소</TEXT>
                <TEXT>12:00 ~ 13:00</TEXT>
              </DIV>
            </DIV>
            <DIV
              style={{
                position: "relative",
              }}
            >
              <DIV
                style={{
                  width: "40px",
                  height: "40px",
                  background: "blanchedalmond",
                  position: "absolute",
                  top: "-9px",
                  left: "-10px",
                  borderRadius: "40px",
                }}
              ></DIV>
              <DIV
                style={{
                  position: "absolute",
                  width: "50px",
                  height: "28px",
                  borderRadius: "10px",
                  padding: "3px 4px",

                  background: "aliceblue",
                  right: "10px",
                  top: "10px",
                  textAlign: "center",
                }}
              >
                {" "}
                3 / 4
              </DIV>
              <IMAGEPRIVIEW
                style={{
                  position: "absolute",
                  width: "166px",
                  height: "222px",
                  margin: "5px",
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 48.96%, rgba(0, 0, 0, 0.35) 100%)",
                }}
              ></IMAGEPRIVIEW>
              <IMAGEPRIVIEW
                style={{
                  width: "166px",
                  height: "222px",
                  margin: "5px",
                }}
              ></IMAGEPRIVIEW>
              <DIV
                style={{
                  position: "absolute",
                  top: "152px",
                  left: "10px",
                }}
              >
                <TEXT>모임 제목</TEXT>
                <TEXT>모임 장소</TEXT>
                <TEXT>12:00 ~ 13:00</TEXT>
              </DIV>
            </DIV>
            <DIV
              style={{
                position: "relative",
              }}
            >
              <DIV
                style={{
                  width: "40px",
                  height: "40px",
                  background: "blanchedalmond",
                  position: "absolute",
                  top: "-9px",
                  left: "-10px",
                  borderRadius: "40px",
                }}
              ></DIV>
              <DIV
                style={{
                  position: "absolute",
                  width: "50px",
                  height: "28px",
                  borderRadius: "10px",
                  padding: "3px 4px",

                  background: "aliceblue",
                  right: "10px",
                  top: "10px",
                  textAlign: "center",
                }}
              >
                {" "}
                3 / 4
              </DIV>
              <IMAGEPRIVIEW
                style={{
                  position: "absolute",
                  width: "166px",
                  height: "222px",
                  margin: "5px",
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 48.96%, rgba(0, 0, 0, 0.35) 100%)",
                }}
              ></IMAGEPRIVIEW>
              <IMAGEPRIVIEW
                style={{
                  width: "166px",
                  height: "222px",
                  margin: "5px",
                }}
              ></IMAGEPRIVIEW>
              <DIV
                style={{
                  position: "absolute",
                  top: "152px",
                  left: "10px",
                }}
              >
                <TEXT>모임 제목</TEXT>
                <TEXT>모임 장소</TEXT>
                <TEXT>12:00 ~ 13:00</TEXT>
              </DIV>
            </DIV>
            <DIV
              style={{
                position: "relative",
              }}
            >
              <DIV
                style={{
                  width: "40px",
                  height: "40px",
                  background: "blanchedalmond",
                  position: "absolute",
                  top: "-9px",
                  left: "-10px",
                  borderRadius: "40px",
                }}
              ></DIV>
              <DIV
                style={{
                  position: "absolute",
                  width: "50px",
                  height: "28px",
                  borderRadius: "10px",
                  padding: "3px 4px",

                  background: "aliceblue",
                  right: "10px",
                  top: "10px",
                  textAlign: "center",
                }}
              >
                {" "}
                3 / 4
              </DIV>
              <IMAGEPRIVIEW
                style={{
                  position: "absolute",
                  width: "166px",
                  height: "222px",
                  margin: "5px",
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 48.96%, rgba(0, 0, 0, 0.35) 100%)",
                }}
              ></IMAGEPRIVIEW>
              <IMAGEPRIVIEW
                style={{
                  width: "166px",
                  height: "222px",
                  margin: "5px",
                }}
              ></IMAGEPRIVIEW>
              <DIV
                style={{
                  position: "absolute",
                  top: "152px",
                  left: "10px",
                }}
              >
                <TEXT>모임 제목</TEXT>
                <TEXT>모임 장소</TEXT>
                <TEXT>12:00 ~ 13:00</TEXT>
              </DIV>
            </DIV>
          </DIV>
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
export default main;
