export const ROUNDS_TO_WIN = 15;
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
  ONE_OF_THE_EXITS_IS_ABSENT: 'one of the exits is absent',
  VALUE_NOT_SPECIFIED: 'value not specified',
};

export default {
  NODES,
  OPERATORS,
  OPERANDS,
  COMPARISON_OPERATORS,
  EXCEPTIONS,
};
