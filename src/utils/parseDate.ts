import { parseISO, isValid } from 'date-fns';

const parseDate = (date: Date | string) => {
  const parsedDate = !(date instanceof Date) ? parseISO(date) : date;

  return isValid(parsedDate) ? parsedDate : null;
};

export default parseDate;