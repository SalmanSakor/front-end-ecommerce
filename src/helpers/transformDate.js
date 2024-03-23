export default function TransformDate(date) {
  const selectedDate = new window.Date(date);
  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = (selectedDate.getMonth() + 1).toString();

  const selectedDay = selectedDate.getDate().toString();
  return `${selectedYear}/${selectedMonth}/${selectedDay}`;
}
