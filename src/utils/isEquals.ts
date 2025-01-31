import { clone, equals } from 'ramda';

const isEquals = (value1, value2) => equals(clone(value1), clone(value2));

export default isEquals;
