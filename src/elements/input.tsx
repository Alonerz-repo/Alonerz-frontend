import React, { forwardRef } from "react";
import styled from "styled-components";
import { Grid, Text } from "./index";

type Props = {
  text?: string;
  placeholder?: string;
  width?: string;
  ref?: any;
  bold?: boolean;
  _onChange?: () => {};
};

const Input = forwardRef(
  ({ text, placeholder, width, _onChange, ref, bold }: Props) => {
    console.log(bold);
    return (
      <>
        <Grid width={width}>
          <Text bold={bold}>{text}</Text>
          <ElementInput
            ref={ref}
            placeholder={placeholder}
            onChange={_onChange}
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
  padding: 0px;
`;
export default Input;
