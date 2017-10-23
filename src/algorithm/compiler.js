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
  [COMPARISON_OPERATORS.UNEQUAL]: c => a => a != c,
};
const computeFunctions = {
  [OPERATORS.DIV]: {
    [OPERANDS.PARAMETER]: () => (a, b) => a / b,
    [OPERANDS.CONSTANT]: c => a => a / c,
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
  [NODES.CONDITION]: (stack, node) => {
    const compiled = {
      id: node.id,
      type: node.type,
      check: checkFunctions[node.operation](node.comparisonValue),
    };
    return compiled;
  },
  [NODES.FORMULA]: (stack, node) => {
    const { operation, secondOperand, parameterValue } = node;
    const compiled = {
      id: node.id,
      type: node.type,
      compute: computeFunctions[operation][secondOperand](parameterValue),
    };
    return compiled;
  },
  [NODES.OUTPUT]: (stack, node) => {
    const compiled = {
      id: node.id,
      type: node.type,
    };
    return compiled;
  },
  [NODES.INPUT]: (stack, node) => {
    const compiled = {
      id: node.id,
      type: node.type,
    };
    return compiled;
  },
};

const getDestinationPorts = port => {
  const links = Object.keys(port.links).map(key => port.links[key]);

  const ports = links
    .filter(link => link.sourcePort.id != link.targetPort.id)
    .map(
      link =>
        link.sourcePort.id === port.id ? link.targetPort : link.sourcePort,
    );

  return ports;
};

const getOutgoingPorts = diagramNode => {
  const ports = Object.keys(diagramNode.ports).map(
    key => diagramNode.ports[key],
  );

  const outgoing = ports.filter(port => port.name.satrtsWith('out'));

  return outgoing;
};

const getDestinations = diagramNode => {
  const ports = getOutgoingPorts(diagramNode);
  const destinationPorts = ports
    .map(port => getDestinationPorts(port))
    .reduce((a, b) => a.concat(b), []);
  destinationPorts.forEach(x => validateDestinationPort(x));

  const destinations = destinationPorts.map(port => port.parentNode);
  return destinations;
};

const validateDestinationPort = port => {
  if (port.name.startsWith('out')) throw { type: EXCEPTIONS.INVALID_LINK };
};

const compileNode = (nodes, stack, node, diagramNode) => {
  if (stack.find(id => id === node.id)) return;
  stack.push(node.id);

  const compiled = compilers[node.type](stack, node);
  const destinations = getDestinations(diagramNode);
  compiled.outputs = destinations.map(destination =>
    compileNode(stack, nodes[destination.id], destination),
  );

  return compiled;
};

const compileStartingPoint = (nodes, startingPoint, diagramNode) => {
  const stack = [startingPoint.id];

  const destinations = getDestinations(diagramNode);

  return destinations.map(destination => compileNode(nodes, stack, nodes[destination.id], destination));
};

export const compile = (nodes, diagram) => {
  const nodesDictionary = nodes.reduce((node, dict) => {
    dict[node.id] = node;
    return dict;
  }, {});
  const enters = this.nodes
    .filter(node => node.type === NODES.INPUT)
    .map(node =>
      compileStartingPoint(nodesDictionary, node, diagram.getNode(x.id)),
    );

  return enters;
};
