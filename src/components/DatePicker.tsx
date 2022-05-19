import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import "./DatePicker.css";

interface DatePickerProps {
  date?: Date;
  handleDate?: any;
}
// 달력 생성 컴포넌트
const DatePickerComponent = ({ date, handleDate }: DatePickerProps) => {
  return (
    // 한글 달력, 오늘 날짜부터 선택 가능
    <DatePicker
      selected={date}
      onChange={(date: any) => handleDate(date)}
      locale={ko}
      dateFormat="yyyy.MM.dd (eee)"
      showPopperArrow={false}
      minDate={new Date()}
    />
  );
};

export default DatePickerComponent;
