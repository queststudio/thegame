import { NODES } from '../constants/index';

const calculators = {
  [NODES.INPUT]: (input, inputs) => inputs[input.index],
  [NODES.CONDITION]: (condition, inputs) => {
    const A = calculateSource(condition.sources[0], inputs);
    return condition.compute(A);
  },
  [NODES.FORMULA]: (formula, inputs) => {
    const [A, B] = formula.sources.map(s => calculateSource(s, inputs));
    return formula.compute(A, B);
  },
};

const calculateSource = (source, inputs) => {
  return calculators[source.type](source, inputs);
};

export const run = (algorithm, inputs) => {
  return algorithm.map(output => {
    //TODO throw if sources more than one
    if (output.source) return calculateSource(output.source, inputs);

    return 0;
  });
};
