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
  INVALID_LINK: 'invalid link',
  TOO_MANY_SOURCES: 'too many sources'
};

export default {
  NODES,
  OPERATORS,
  OPERANDS,
  COMPARISON_OPERATORS,
  EXCEPTIONS,
};
