import React from "react";
import styled from "styled-components";

interface Props {
  value?: number;
  onChange(e: any): void;
  width?: string;
  categories: categoryShape[];
}

interface categoryShape {
  value: number | string;
  name: string;
}

const Select = ({ onChange, value, width, categories }: Props) => {
  return (
    <React.Fragment>
      <MySelected width={width} onChange={onChange} value={value}>
        {categories.map((c, i) => {
          return (
            <option value={c.value} key={i}>
              {c.name}
            </option>
          );
        })}
      </MySelected>
    </React.Fragment>
  );
};

interface MySelectedProps {
  width?: string;
}

const MySelected = styled.select<MySelectedProps>`
  background: #eeeeee;
  border-radius: 15px;
  border: none;
  width: ${(props) => props.width ?? "100%"};
  height: 44px;
  padding: 0px 20px;
`;

export default Select;
