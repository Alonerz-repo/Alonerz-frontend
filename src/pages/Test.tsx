import React, { useEffect } from "react";
import styled from "styled-components";
import Login from "./Login";
import { Input, Grid, Text } from "../elements";

import { useRef } from "react";

const Test = () => {
  let val = useRef("");

  return (
    <React.Fragment>
      <Login></Login>
    </React.Fragment>
  );
};
export default Test;
