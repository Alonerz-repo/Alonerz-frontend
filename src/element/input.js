import React from "react";
import styled from "styled-components";
import { Text, Grid } from "./index";

const Input = (props) => {
  const { placeholder, _onChange, label } = props;

  return (
    <Grid>
      <Text size="15px" bold="bold" margin="0px 0px 16px 0px">
        {label}
      </Text>
      <ELInput placeholder={placeholder} onChange={_onChange} />
    </Grid>
  );
};

Input.defaultProps = {
  label: "라벨은 비어있습니다.",
  placeholder: "플레이스 홀더는 비어있습니다",
  _onChange: () => {},
};

const ELInput = styled.input`
  border-radius: 15px;
  border: none;
  outline: none;
  width: 100%;
  height: 44px;
  padding: 15px 20px;
  background: #eeeeee;
  box-sizing: border-box;
`;

export default Input;
