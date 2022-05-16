import React, { forwardRef } from "react";
import styled from "styled-components";
import { Grid, Text } from "./index";

interface Props {
  name?: string;
  value?: string;
  text?: string;
  placeholder?: string;
  width?: string;
  ref?: any;
  bold?: boolean;
  children?: any;
  _onChange?(event: any): void;
}

const Input = forwardRef(
  ({ text, placeholder, width, _onChange, ref, bold, value, name }: Props) => {
    return (
      <>
        <Grid width={width}>
          <Text bold={bold}>{text}</Text>
          <ElementInput
            ref={ref}
            placeholder={placeholder}
            onChange={_onChange}
            value={value}
            name={name}
          />
        </Grid>
      </>
    );
  }
);

Input.defaultProps = {
  text: "안녕하세요",
  placeholder: "여기에 입력하세요",
  width: "100%",
};

const ElementInput = styled.input`
  background: #eeeeee;
  border-radius: 15px;
  border: none;
  width: 100%;
  height: 44px;
  padding: 0px 20px;
`;
export default Input;
