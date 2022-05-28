import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import "./DatePicker.css";
import { useController } from "react-hook-form";
import React from "react";
import styled from "styled-components";

interface DatePickerProps {
  control: any;
  name: string;
}

type Props = {
  value?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
export type Ref = HTMLButtonElement;

// 달력 생성 컴포넌트

const DatePickerComponent = ({ name, control }: DatePickerProps) => {
  const {
    field: { value, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: false },
    defaultValue: new Date(),
  });

  return (
    // 한글 달력, 오늘 날짜부터 선택 가능
    <DatePicker
      locale={ko}
      dateFormat="yyyy.MM.dd (eee)"
      showPopperArrow={false}
      minDate={new Date()}
      selected={value}
      {...inputProps}
      customInput={<ElementInput></ElementInput>}
    />
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
  cursor: pointer;
`;

export default DatePickerComponent;
