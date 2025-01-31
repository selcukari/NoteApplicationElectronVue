import { format } from 'date-fns';
import { defaultDateTimeFormat } from './constants';
import parseDate from './parseDate';
import { tr } from 'date-fns/locale';

const formatDateTime = (dateTime: Date | string, dateFormat = defaultDateTimeFormat) => {
  const parsedDateTime = parseDate(dateTime);

  return parsedDateTime ? format(parsedDateTime, dateFormat, { locale: tr }) : null;
};

export default formatDateTime;
