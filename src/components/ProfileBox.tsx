import React, { forwardRef, useRef } from "react";
import styled from "styled-components";
import { Image } from "../elements";
import stickerList from "../assets/Icon";

interface ProflieBoxProps {
  index?: any;
  _onClick?: () => void;
  ref?: any;
}

const MyProfileBox = forwardRef(
  ({ index, _onClick }: ProflieBoxProps, ref: any) => {
    if (index === 1) {
      return (
        <React.Fragment>
          <CharBox></CharBox>
          <CharBox></CharBox>
          <CharBox></CharBox>
          <CharBox></CharBox>
          <CharBox></CharBox>
        </React.Fragment>
      );
    } else if (index === 2) {
      return (
        <React.Fragment>
          {stickerList.map((value, index) => {
            return (
              <StickerBox
                id={index.toString()}
                ref={ref}
                key={index}
                onClick={_onClick}
              >
                <Image shape="test" size="110px" src={value}></Image>
                <input value={index} />
              </StickerBox>
            );
          })}
        </React.Fragment>
      );
    } else if (index === 3) {
      return (
        <React.Fragment>
          <MyColorBox style={{ background: "white", border: "1px solid" }}>
            <div
              style={{
                border: "1px solid rgb(255, 0, 0)",
                transform: "rotate(135deg)",
                position: "absolute",
                width: "135px",
                top: "64px",
                left: "-3px",
              }}
            ></div>
          </MyColorBox>
          <MyColorBox style={{ background: "#FFD9D9" }}></MyColorBox>
          <MyColorBox style={{ background: "#FF5D5D" }}></MyColorBox>
          <MyColorBox style={{ background: "#9EE8FF" }}></MyColorBox>
          <MyColorBox style={{ background: "#C377FF" }}></MyColorBox>
          <MyColorBox style={{ background: "#B8E5A3" }}></MyColorBox>
        </React.Fragment>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }
);

const Box = styled.div`
  background: #eeeeee;
  border-radius: 20px;
`;

const CharBox = styled(Box)`
  width: 108px;
  height: 222px;
  margin: 10px;
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

export default MyProfileBox;
