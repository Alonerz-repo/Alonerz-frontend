import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import "./DatePicker.css";

// 달력 생성 컴포넌트
const DatePickerComponent = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    // 한글 달력, 오늘 날짜부터 선택 가능
    <DatePicker
      selected={startDate}
      onChange={(date: any) => setStartDate(date)}
      locale={ko}
      dateFormat="yyyy.MM.dd (eee)"
      showPopperArrow={false}
      minDate={new Date()}
    />
  );
};

export default DatePickerComponent;
