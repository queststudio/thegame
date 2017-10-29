export const ROUNDS_TO_WIN = 30;
export const ROUNDS_TO_LOSE = 100;

export const NODES = {
  INPUT: 'input',
  OUTPUT: 'output',
  FORMULA: 'formula',
  CONDITION: 'condition',
};

export const OPERATORS = {
  SUM: '+',
  SUB: '-',
  MUL: '*',
  DIV: '/',
};

export const OPERANDS = {
  PARAMETER: 'parameter',
  CONSTANT: 'constant',
};

export const COMPARISON_OPERATORS = {
  GREATER: '>',
  LESS: '<',
  GREQUAL: '>=',
  LEEQUAL: '<=',
  EQUAL: '==',
  UNEQUAL: '!=',
};

export const EXCEPTIONS = {
  TWO_INPUTS_CONNECTED: 'two inputs connected',
  TOO_MANY_SOURCES: 'too many sources',
  CIRCULAR_REFERENCE: 'circular reference',
  HANGING_LINK: 'link with not enough connections',
  ONE_OF_THE_EXITS_IS_ABSENT: 'one of the exits is absent'
};

export const HOST = 'http://localhost:8088';

export default {
  HOST,
  NODES,
  OPERATORS,
  OPERANDS,
  COMPARISON_OPERATORS,
  EXCEPTIONS,
};
