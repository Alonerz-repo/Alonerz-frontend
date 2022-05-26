import React from "react";
import styled from "styled-components";

const ClockRangeModal = (props: any) => {
  return (
    <React.Fragment>
      <BG>
        <div
          style={{
            background: "#fff",
            height: "260px",
            position: "absolute",
            width: "100%",
            bottom: "0px",
            borderRadius: "15px 15px 0px 0px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "20px 0px",
            }}
          >
            <div>취소</div>
            <div style={{ fontSize: "20px" }}>파티 개설 시간 범위</div>
            <div style={{ color: "#F84C40" }}>적용</div>
          </div>
          <div>시작</div>
        </div>
      </BG>
    </React.Fragment>
  );
};

const BG = styled.div`
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`;

export default ClockRangeModal;
