import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as partyAction } from "../redux/modules/party";

const PartiView = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(partyAction.getOneGroupAxios(id));
  });

  return (
    <>
      <GRID style={{ flexDirection: "column" }}>
        {/* 프리뷰 뷰 */}
        <IMAGEPRIVIEW style={{ textAlign: "center" }}>
          {" "}
          나는 프리뷰이다{" "}
        </IMAGEPRIVIEW>
        {/* 모임 제목 */}
        <TEXT style={{ fontSize: "20px", fontWeight: "bold" }}>
          {" "}
          모임 제목{" "}
        </TEXT>
        <TEXT style={{ fontSize: "14px" }}> 돈까스 / 회 / 일식 </TEXT>

        {/* 모임 상세 내용 컴포넌트 */}

        <GRID style={{ flexDirection: "column" }}>
          <DIV style={{ margin: "14px" }}>
            <DIV style={{ display: "flex" }}>
              <TEXT style={{ margin: "5px 10px 0 0", fontWeight: "bold" }}>
                {" "}
                장소 :{" "}
              </TEXT>
              <TEXT style={{ margin: "5px 0px" }}>
                나는 추가적으로 들어가는 텍스트이다
              </TEXT>
            </DIV>
            <IMAGEPRIVIEW style={{ textAlign: "center", borderRadius: "15px" }}>
              {" "}
              나는 지도이다{" "}
            </IMAGEPRIVIEW>
          </DIV>

          <DIV style={{ margin: "15px" }}>
            <DIV style={{ display: "flex" }}>
              <TEXT style={{ margin: "5px 10px 0 0", fontWeight: "bold" }}>
                {" "}
                날짜 :{" "}
              </TEXT>
              <TEXT style={{ margin: "5px 0px" }}>12월 31일 (월)</TEXT>
            </DIV>
            <DIV style={{ display: "flex" }}>
              <TEXT style={{ margin: "5px 10px 0 0", fontWeight: "bold" }}>
                {" "}
                시간 :{" "}
              </TEXT>
              <TEXT style={{ margin: "5px 0px" }}>AM 12:00 ~ PM 13:00</TEXT>
            </DIV>
            <DIV style={{ display: "flex" }}>
              <TEXT style={{ margin: "5px 10px 0 0", fontWeight: "bold" }}>
                {" "}
                인원 :{" "}
              </TEXT>
              <TEXT style={{ margin: "5px 0px" }}>3/4</TEXT>
            </DIV>
            <DIV style={{ display: "flex" }}>
              <TEXT style={{ margin: "5px 10px 0 0", fontWeight: "bold" }}>
                {" "}
                메뉴 :{" "}
              </TEXT>
              <TEXT style={{ margin: "5px 0px" }}>돈까스, 덮밥</TEXT>
            </DIV>
          </DIV>
        </GRID>

        {/* 모임 상세내용 들어가는 부분 */}

        <GRID style={{ flexDirection: "column" }}>
          <DIV>
            <TEXT style={{ fontSize: "16px", fontWeight: "bold" }}>
              {" "}
              상세 내용{" "}
            </TEXT>
          </DIV>
          <DIV
            style={{
              border: "2px solid green",
              borderRadius: "15px",
              height: "140px",
              margin: "0px 20px 20px 20px ",
              padding: "5px",
            }}
          >
            {" "}
            상세 내용 들어가는 곳
          </DIV>
        </GRID>

        {/* 참여인원 정보 */}

        <GRID>
          <DIV>
            <TEXT style={{ fontSize: "20px", fontWeight: "bold" }}>
              참여인원(3/4)
            </TEXT>
            <DIV style={{ display: "flex", margin: "23px" }}>
              <IMAGEPRIVIEW
                style={{
                  width: "33px",
                  height: "33px",
                  borderRadius: "33px",
                  padding: "0",
                }}
              ></IMAGEPRIVIEW>
              <TEXT
                style={{
                  margin: "5px 7px",
                  outline: "none",
                  background: "gray",
                  borderRadius: "5px",
                  padding: "4px",
                  color: "white",
                }}
              >
                대장
              </TEXT>
              <TEXT style={{ margin: "5px 4px", padding: "4px" }}>닉네임</TEXT>
              <TEXT style={{ margin: "5px 4px", padding: "4px" }}>
                직종/경력
              </TEXT>
              <ICON>:</ICON>
            </DIV>
            <DIV style={{ display: "flex", margin: "23px" }}>
              <IMAGEPRIVIEW
                style={{
                  width: "33px",
                  height: "33px",
                  borderRadius: "33px",
                  padding: "0",
                }}
              ></IMAGEPRIVIEW>
              <TEXT
                style={{
                  margin: "5px 7px",
                  outline: "none",
                  background: "gray",
                  borderRadius: "5px",
                  padding: "4px",
                  color: "white",
                }}
              >
                대장
              </TEXT>
              <TEXT style={{ margin: "5px 4px", padding: "4px" }}>닉네임</TEXT>
              <TEXT style={{ margin: "5px 4px", padding: "4px" }}>
                직종/경력
              </TEXT>
              <ICON>:</ICON>
            </DIV>
            <DIV style={{ display: "flex", margin: "23px" }}>
              <IMAGEPRIVIEW
                style={{
                  width: "33px",
                  height: "33px",
                  borderRadius: "33px",
                  padding: "0",
                }}
              ></IMAGEPRIVIEW>
              <TEXT
                style={{
                  margin: "5px 7px",
                  outline: "none",
                  background: "gray",
                  borderRadius: "5px",
                  padding: "4px",
                  color: "white",
                }}
              >
                대장
              </TEXT>
              <TEXT style={{ margin: "5px 4px", padding: "4px" }}>닉네임</TEXT>
              <TEXT style={{ margin: "5px 4px", padding: "4px" }}>
                직종/경력
              </TEXT>
              <ICON>:</ICON>
            </DIV>
          </DIV>
        </GRID>

        {/* 버튼 컴포넌트 */}

        <GRID>
          <BTN style={{ width: "100%" }}>1:1 문의</BTN>
          <BTN style={{ width: "100%" }}>참가하기</BTN>
        </GRID>
      </GRID>
    </>
  );
};
const DIV = styled.div`
  box-sizing: border-box;
`;
const IMAGEPRIVIEW = styled.div`
  background: skyblue;
  padding: 100px;
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
export default PartiView;
