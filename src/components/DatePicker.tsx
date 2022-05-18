import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import "./DatePicker.css";

const DatePickerComponent = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
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
