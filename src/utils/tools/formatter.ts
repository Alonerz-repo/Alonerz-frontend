// 날짜 형식 변환
export const DateFormatter = (dateString: Date) => {
  const date = new Date(dateString);
  return [
    `0${date.getMonth() + 1}`.slice(-2) + '월',
    `0${date.getDate()}`.slice(-2) + '일',
  ].join(' ');
};

// 시간 형식 변환
export const TimeFormatter = (dateString: Date) => {
  const date = new Date(dateString);
  return [
    `0${date.getHours()}`.slice(-2),
    `0${date.getMinutes()}`.slice(-2),
  ].join(':');
};
