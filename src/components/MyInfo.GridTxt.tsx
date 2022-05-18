import React from "react";
import { Text } from "../elements";

//유저 정보(팔로우 수,  팔로잉 수, 게시물 수

const GridTxt = ({ text, _onClick, point }: any) => {
  return (
    <React.Fragment>
      <div onClick={_onClick}>
        <Text>{text}</Text>
        <Text>{point}</Text>
      </div>
    </React.Fragment>
  );
};

export default GridTxt;
