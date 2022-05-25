import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import { Grid } from "./index";

interface InputProps {
  control: any;
  name: string;
  width?: string;
  margin?: string;
  rules?: Object;
  children?: string;
  v?: number;
}

const Radio = ({ control, name, children, v, width, margin }: InputProps) => {
  const styles = { width, margin };
  const {
    field: { value, onChange, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: false },
  });

  return (
    <Grid>
      {value === v ? (
        <LimitButton bg="#F84C40" color="white" {...inputProps} {...styles}>
          {v}명
        </LimitButton>
      ) : (
        <LimitButton onClick={() => onChange(v)} {...inputProps} {...styles}>
          {v}명
        </LimitButton>
      )}
    </Grid>
  );
};

interface CommonButtonProps {
  width?: string;
  bg?: string;
  color?: string;
  margin?: string;
}

const LimitButton = styled.div<CommonButtonProps>`
  border: 1px solid black;
  width: ${(props) => props.width ?? "70px"};
  color: ${(props) => props.color ?? "black"};
  height: 30px;
  background-color: ${(props) => props.bg ?? "#eeeeee"};
  border-radius: 15px;
  margin: ${(props) => props.margin ?? "0px 10px 0px 10px"};
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
`;

export default Radio;
