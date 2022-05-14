import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Image } from "../elements";

const Test = () => {
  const [number, setNumber] = useState(1);
  const change = () => {
    if (number > 31) {
      setNumber(1);
    } else {
      setNumber(number + 1);
    }
    console.log(number);
  };

  return (
    <React.Fragment>
      {/* {img.map((value, index) => {
        return <Image src={value}></Image>;
      })} */}
      <h1>hello world!</h1>
      <div>
        <button onClick={change}> 이미지 체인지 </button>
      </div>
      {/* <div>
        <img alt="asd" src={require(`../assets/Icon/${number}.png`)}></img>
      </div> */}
      {/* <Image
        shape="test"
        size="110px"
        src={require(`../assets/Icon/${number}.png`)}
      ></Image> */}
    </React.Fragment>
  );
};
export default Test;
