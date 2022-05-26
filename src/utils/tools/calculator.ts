// D-day 계산
export const DDayCalculator = (dateString: Date) => {
  const today = new Date().getTime();
  const target = new Date(dateString).getTime();
  const diffTime = target - today;
  const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
  if (diffDays === 0) {
    return `D-Day`;
  }
  return `D${diffDays > 0 ? '-' : '+'}${Math.abs(diffDays)}`;
};
