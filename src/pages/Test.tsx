import React, { useEffect } from "react";
import styled from "styled-components";
import { Input, Grid, Text } from "../elements";

import { useRef } from "react";

const Test = () => {
  let val = useRef("");

  return (
    <React.Fragment>
      <Text type="line" titleText="나는 제목">
        Lorem ipsum dolor
      </Text>
    </React.Fragment>
  );
};
export default Test;
