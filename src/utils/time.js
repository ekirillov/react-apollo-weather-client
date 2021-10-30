export const SECOND = 1000;
export const MINUTE = 60 * SECOND;

export const WEEK_DAYS = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thur",
  5: "Fri",
  6: "Sat",
};

const parseTimeValue = (value) => (value < 10 ? `0${value}` : value);

export const getDayString = (date) => {
  // TODO: use date-fns
  const weekDay = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedWeekDayName = WEEK_DAYS[weekDay];
  const formattedHours = parseTimeValue(hours);
  const formattedMinutes = parseTimeValue(minutes);

  return `${formattedWeekDayName}, ${formattedHours}:${formattedMinutes}`;
};
