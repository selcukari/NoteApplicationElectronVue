import { either, isEmpty, isNil } from 'ramda';

const isNullOrEmpty: Boolean = either(isNil, isEmpty);

export default isNullOrEmpty;
