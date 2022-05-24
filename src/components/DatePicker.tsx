import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import "./DatePicker.css";
import { useController } from "react-hook-form";

interface DatePickerProps {
  control: any;
  name: string;
}
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
    />
  );
};

export default DatePickerComponent;
