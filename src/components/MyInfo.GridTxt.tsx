import React from "react";
import { Text } from "../elements";

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
