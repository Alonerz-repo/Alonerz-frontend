import React, { forwardRef } from "react";
import styled from "styled-components";
import { Grid, Text } from "./index";

//name input 엘리먼트의 인덱스(id)값입니다.
//useState에서 여러개의 인풋을 입력받기 위해 적용하였습니다.

interface Props {
  name?: string;
  value?: string;
  text?: string;
  placeholder?: string;
  width?: string;
  ref?: any;
  bold?: boolean;
  children?: any;
  _onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
  err?: boolean;
}

// forwardRef로 함수를 감싸서, 다른 컴포넌트/페이지에서 ref를 받을수 있습니다.
const Input = forwardRef(
  ({
    text,
    placeholder,
    width,
    _onChange,
    ref,
    bold,
    value,
    name,
    err,
  }: Props) => {
    if (err) {
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
              style={{ border: "2px solid red" }}
            />
            <Text>2자 이상 작성하세요</Text>
          </Grid>
        </>
      );
    } else {
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
  }
);

Input.defaultProps = {
  text: "",
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
  box-sizing: border-box;
`;
export default Input;
