import React, { useEffect } from "react";
import styled from "styled-components";
import { Input, Grid } from "../elements/index";

import { useRef } from "react";

const Test = () => {
  let val = useRef("");

  return (
    <>
      <Input
        width="100%"
        ref={val}
        bold
        text="문자열"
        placeholder="안녕하세요?"
      ></Input>
    </>
  );
};

export default Test;
