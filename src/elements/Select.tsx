import React from "react";
import styled from "styled-components";
import { CategoryItem } from "../common/interface";

interface Props {
  value?: number | string;
  onChange(e: any): void;
  width?: string;
  margin?: string;
  categories: CategoryItem[];
  time?: string | undefined;
  name?: string;
  type?: string;
  careerId?: any;
  placeholder?: string;
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
  margin: ${(props) => props.margin ?? ""};
  height: 44px;
  padding: 0px 20px;
  /* background: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='7' cy='7' r='7' fill='white'/%3E%3C/svg%3E%0A")
    no-repeat 95% 50%; */
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

// 컴포넌트
const Select = (props: Props) => {
  const {
    onChange,
    value,
    width,
    categories,
    time,
    name,
    margin,
    type,
    placeholder,
    careerId,
  } = props;
  const selected = !Boolean(careerId);
  const mySelectedProps = { name, width, margin, onChange, value, time };

  const randerOptions = () => {
    return categories.map((item: CategoryItem, key: number): any => {
      const { name, value } = item;
      const optionProps = { value, key };
      return <MyOption {...optionProps}>{name}</MyOption>;
    });
  };

  if (type === "user") {
    return (
      <React.Fragment>
        <MySelected {...mySelectedProps}>
          <MyOption disabled selected={selected}>
            {placeholder}
          </MyOption>
          {randerOptions()}
        </MySelected>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <MySelected {...mySelectedProps}>
        <MyOption disabled selected={selected}>
          {placeholder}
        </MyOption>
        {randerOptions()}
      </MySelected>
    </React.Fragment>
  );
};

interface MySelectedProps {
  width?: string;
  time?: string | undefined;
  margin?: string;
}

export default Select;
