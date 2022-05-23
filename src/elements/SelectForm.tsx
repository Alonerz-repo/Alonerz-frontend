import React from "react";
import styled from "styled-components";
import { CategoryItem } from "../common/interface";
import { useController } from "react-hook-form";

type Option = {
  name: string;
  value: string | number;
};

interface Props {
  control: any;
  width?: string;
  margin?: string;
  categories: Option[];
  name: string;
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
`;

// 컴포넌트
const SelectForm = ({
  control,
  name,
  width,
  margin,
  categories,
  type,
}: Props) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: "",
  });

  const styles = {
    width,
    margin,
  };

  const randerOptions = () => {
    return categories.map((item: Option): any => {
      const { name, value } = item;
      return (
        <MyOption value={value} key={value}>
          {name}
        </MyOption>
      );
    });
  };

  if (type === "user") {
    return (
      <React.Fragment>
        <MySelected>
          <MyOption disabled></MyOption>
          {randerOptions()}
        </MySelected>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <MySelected style={styles} ref={ref} {...inputProps}>
        {randerOptions()}
      </MySelected>
    </React.Fragment>
  );
};

interface MySelectedProps {
  width?: string;
  margin?: string;
}

export default SelectForm;
