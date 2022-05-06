import React, { useEffect } from "react";
import styled from "styled-components";
import { Input, Grid, Text } from "../elements";

import { useRef } from "react";

const Test = () => {
  let val = useRef("");

  return (
    <React.Fragment>
      <Text type="area" titleText="asdasdas" padding="10px">
        Lorem ipsum dolor
      </Text>
    </React.Fragment>
  );
};
export default Test;
