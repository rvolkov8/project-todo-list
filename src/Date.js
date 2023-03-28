// eslint-disable-next-line import/no-extraneous-dependencies
import { format } from 'date-fns';

export default function DateObj() {
  const date = new Date();

  function formatDate() {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return formattedDate;
  }

  return { formatDate };
}
