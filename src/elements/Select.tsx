import React from "react";
import styled from "styled-components";

interface Props {
  category?: number;
  onChange(e: any): void;
}

const Select = ({ onChange, category }: Props) => {
  return (
    <React.Fragment>
      <MySelected onChange={onChange} value={category}>
        <option value={1}>a</option>
        <option value={2}>b</option>
        <option value={3}>c</option>
      </MySelected>
    </React.Fragment>
  );
};

const MySelected = styled.select`
  background: #eeeeee;
  border-radius: 15px;
  border: none;
  width: 100%;
  height: 44px;
  padding: 0px 20px;
`;

export default Select;
