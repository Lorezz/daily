import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
dayjs.extend(isToday);

export function getDays(monthDate = new Date()) {
  //first day of month
  const firstDayOfMonth = dayjs(monthDate).date(1);
  const dayOfWeekOfFirstDay = dayjs(firstDayOfMonth.format()).day();
  //days in month
  const daysInMonth = dayjs(monthDate).daysInMonth();

  console.log('FISRT DAY', firstDayOfMonth.format(), dayOfWeekOfFirstDay);

  //last day of moth
  const lastDayOfMonth = firstDayOfMonth.add(daysInMonth - 1, 'day');
  const dayOfWeekOfLastDay = dayjs(lastDayOfMonth.format()).day();

  console.log('LAST DAY', lastDayOfMonth.format(), dayOfWeekOfLastDay);

  const fmt = 'YYYY-MM-DD';

  const prev = [];
  if (dayOfWeekOfFirstDay !== 1) {
    for (let i = dayOfWeekOfFirstDay - 1; i > 0; i--) {
      prev.push({
        date: firstDayOfMonth.subtract(i, 'day').format(fmt),
        events: [],
        day: 6 - i,
      });
    }
  }
  const daysOfMonth = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const d = dayjs().date(i);
    let obj = {
      date: d.format(fmt),
      isCurrentMonth: true,
      events: [],
      dayOfWeek: d.day(),
    };
    if (d.isToday()) {
      obj.isToday = true;
      obj.isSelected = true;
    }
    daysOfMonth.push(obj);
  }
  const after = [];
  if (dayOfWeekOfLastDay > 0) {
    for (let i = 1; i < 7 - dayOfWeekOfLastDay; i++) {
      after.push({
        date: lastDayOfMonth.add(i, 'day').format(fmt),
        events: [],
        day: i,
      });
    }
  }
  return [...prev, ...daysOfMonth, ...after];
}

export function getMonth(d = new Date()) {
  const month = dayjs(d).format('MMMM');
  return month;
}

export function getYear(d = new Date()) {
  const year = dayjs().format('YYYY');
  return year;
}
