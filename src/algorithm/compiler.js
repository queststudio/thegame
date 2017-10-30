import {
  COMPARISON_OPERATORS,
  OPERATORS,
  OPERANDS,
  EXCEPTIONS,
  NODES,
} from '../constants';

const checkFunctions = {
  [COMPARISON_OPERATORS.GREATER]: c => a => a > c,
  [COMPARISON_OPERATORS.EQUAL]: c => a => a === c,
  [COMPARISON_OPERATORS.GREQUAL]: c => a => a >= c,
  [COMPARISON_OPERATORS.LEEQUAL]: c => a => a <= c,
  [COMPARISON_OPERATORS.LESS]: c => a => a < c,
  [COMPARISON_OPERATORS.UNEQUAL]: c => a => a !== c,
};
const computeFunctions = {
  [OPERATORS.DIV]: {
    [OPERANDS.PARAMETER]: () => (a, b) => {
      if (b === 0) return Number.MAX_SAFE_INTEGER;
      if (b === -0) return Number.MIN_SAFE_INTEGER;
      return a / b;
    },
    [OPERANDS.CONSTANT]: c => a => {
      if (c === 0) return Number.MAX_SAFE_INTEGER;
      if (c === -0) return Number.MIN_SAFE_INTEGER;
      return a / c;
    },
  },
  [OPERATORS.SUM]: {
    [OPERANDS.PARAMETER]: () => (a, b) => a + b,
    [OPERANDS.CONSTANT]: c => a => a + c,
  },
  [OPERATORS.MUL]: {
    [OPERANDS.PARAMETER]: () => (a, b) => a * b,
    [OPERANDS.CONSTANT]: c => a => a * c,
  },
  [OPERATORS.SUB]: {
    [OPERANDS.PARAMETER]: () => (a, b) => a - b,
    [OPERANDS.CONSTANT]: c => a => a - c,
  },
};

const compilers = {
  [NODES.CONDITION]: node => {
    if (!node.comparisonValue || !node.trueValue || !node.falseValue)
      throw { type: EXCEPTIONS.VALUE_NOT_SPECIFIED };

    const check = checkFunctions[node.operation](node.comparisonValue);
    const compute = a => (check(a) ? node.trueValue : node.falseValue);

    const compiled = {
      id: node.id,
      type: node.type,
      compute,
    };
    return compiled;
  },
  [NODES.FORMULA]: node => {
    if (node.secondOperand === OPERANDS.CONSTANT  && !node.parameterValue)
      throw { type: EXCEPTIONS.VALUE_NOT_SPECIFIED };

    const { operation, secondOperand, parameterValue } = node;
    const compiled = {
      id: node.id,
      type: node.type,
      compute: computeFunctions[operation][secondOperand](parameterValue),
    };
    return compiled;
  },
  [NODES.OUTPUT]: node => {
    const compiled = {
      id: node.id,
      type: node.type,
    };
    return compiled;
  },
  [NODES.INPUT]: node => {
    const compiled = {
      id: node.id,
      type: node.type,
      index: node.index,
    };
    return compiled;
  },
};

const getSourcePorts = port => {
  const links = Object.keys(port.links).map(key => port.links[key]);

  links.filter(link => !link.sourcePort || !link.targetPort).forEach(x => {
    throw { type: EXCEPTIONS.HANGING_LINK };
  });

  const ports = links
    .filter(link => link.sourcePort.id != link.targetPort.id)
    .map(
      link =>
        link.sourcePort.id === port.id ? link.targetPort : link.sourcePort,
    );

  if (ports.length > 1) throw { type: EXCEPTIONS.TOO_MANY_SOURCES };

  return ports;
};

const getIncommingPorts = diagramNode => {
  const ports = Object.keys(diagramNode.ports).map(
    key => diagramNode.ports[key],
  );

  const incomming = ports.filter(port => port.name.startsWith('in'));
  return incomming;
};

const getSources = diagramNode => {
  const ports = getIncommingPorts(diagramNode);

  const sourcePorts = ports
    .map(port => getSourcePorts(port))
    .reduce((a, b) => a.concat(b), []);
  sourcePorts.forEach(x => validateSourcePorts(x));

  const sources = sourcePorts.map(port => port.parentNode);
  return sources;
};

const validateSourcePorts = port => {
  if (port.name.startsWith('in'))
    throw { type: EXCEPTIONS.TWO_INPUTS_CONNECTED };
};

const compileNode = (nodes, stack, node, diagramNode) => {
  if (stack.find(id => id === node.id))
    throw { type: EXCEPTIONS.CIRCULAR_REFERENCE };
  stack.push(node.id);

  const compiled = compilers[node.type](node);
  const sources = getSources(diagramNode);
  compiled.sources = sources.map(source =>
    compileNode(nodes, stack, nodes[source.id], source),
  );
  compiled.type = node.type;

  return compiled;
};

const compileExitPoint = (nodes, exitPoint, diagramNode) => {
  if (!diagramNode) throw { type: EXCEPTIONS.ONE_OF_THE_EXITS_IS_ABSENT };

  const stack = [exitPoint.id];

  const compiled = compilers[exitPoint.type](exitPoint);
  const sources = getSources(diagramNode).map(source =>
    compileNode(nodes, stack, nodes[source.id], source),
  );

  if (sources.length > 1) throw { type: EXCEPTIONS.TOO_MANY_SOURCES };

  compiled.source = sources[0];
  compiled.type = exitPoint.type;

  return compiled;
};

export const compile = (nodes, diagram) => {
  const enters = Object.keys(nodes)
    .map(key => nodes[key])
    .filter(node => node.type === NODES.OUTPUT)
    .map(node => compileExitPoint(nodes, node, diagram.getNode(node.id)));

  return enters;
};
