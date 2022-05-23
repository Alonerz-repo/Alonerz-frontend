import React, { forwardRef } from "react";
import styled from "styled-components";
import { Grid } from "./index";
import { useController } from "react-hook-form";
//name input 엘리먼트의 인덱스(id)값입니다.
//useState에서 여러개의 인풋을 입력받기 위해 적용하였습니다.
interface InputProps {
  control: any;
  name: string;
  width?: string;
  margin?: string;
  rules?: Object;
}

const Input = ({ control, name, width, rules, margin }: InputProps) => {
  const styles = {
    width,
    margin,
  };

  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: "",
  });

  return (
    <Grid {...styles}>
      <ElementInput {...inputProps} ref={ref}></ElementInput>
    </Grid>
  );
};

const ElementInput = styled.input`
  background: #eeeeee;
  border-radius: 15px;
  border: none;
  width: 100%;
  height: 44px;
  padding: 0px 20px;
  box-sizing: border-box;
`;
export default Input;
