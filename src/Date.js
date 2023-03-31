// eslint-disable-next-line import/no-extraneous-dependencies
import { format } from 'date-fns';

export default function DateObj() {
  const currDate = new Date();

  function formatDate(date) {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return formattedDate;
  }

  function getDatesOfWeekStartingFromMonday(date) {
    const dayOfWeek = date.getDay();
    const daysUntilMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - daysUntilMonday
    );

    const dates = [];

    for (let i = 0; i < 7; i += 1) {
      const currentDate = new Date(monday.getTime() + i * 24 * 60 * 60 * 1000);
      dates.push(formatDate(currentDate));
    }

    return dates;
  }

  return { currDate, formatDate, getDatesOfWeekStartingFromMonday };
}
