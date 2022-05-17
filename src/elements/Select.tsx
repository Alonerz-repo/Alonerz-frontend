import React from "react";
import styled from "styled-components";

interface Props {
  value?: number | string;
  onChange(e: any): void;
  width?: string;
  categories: categoryShape[];
  time?: string | undefined;
  name?: string;
}

interface categoryShape {
  value: number | string;
  name: string;
}

const Select = ({ onChange, value, width, categories, time, name }: Props) => {
  return (
    <React.Fragment>
      <MySelected
        name={name}
        width={width}
        onChange={onChange}
        value={value}
        time={time}
      >
        {categories.map((c, i) => {
          return (
            <MyOption value={c.value} key={i}>
              {c.name}
            </MyOption>
          );
        })}
      </MySelected>
    </React.Fragment>
  );
};

interface MySelectedProps {
  width?: string;
  time?: string | undefined;
}

const MyOption = styled.option`
  background: #eeeeee;
  text-align: unset;
  color: black;
`;

const MySelected = styled.select<MySelectedProps>`
  /* text-align: center; */
  background: #eeeeee;
  border-radius: 20px;
  border: none;
  outline: 0px;
  width: ${(props) => props.width ?? "100%"};
  height: 44px;
  padding: 0px 20px;
  background: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='7' cy='7' r='7' fill='white'/%3E%3C/svg%3E%0A")
    no-repeat 95% 50%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  ${(props) =>
    props.time === "lunch"
      ? "background-color:#F84C40; color:white;"
      : props.time === "dinner"
      ? "background-color:green; color:white;"
      : ""}
`;

export default Select;
