import * as SRD from 'storm-react-diagrams';
import CONSTANTS from '../constants';
import {compile} from './compiler'

//ToDo Consider some big refactoring decoupling business logic from presentation
//ToDo Move nodes to separate classes
export class Algorithm {
  constructor() {
    console.log('CREATING ALGORITHM!!!'); //ToDo throw an ex

    this.selectionChanged = this.selectionChanged.bind(this);
    this.nodeRemoved = this.nodeRemoved.bind(this);
    this.addNode = this.addNode.bind(this);
    this.updateNode = this.updateNode.bind(this);
    this.getFormulaLabel = this.getFormulaLabel.bind(this);
    this.getConditionLabel = this.getConditionLabel.bind(this);

    this.initialized = false;
    this.inputs = ['Манометр 1', 'Манометр 2', 'Манометр 3'];
    this.outputs = [
      'Вентиль 1',
      'Вентиль 2',
      'Вентиль 3',
      'Вентиль 4',
      'Вентиль 5',
      'Вентиль 6',
    ];
    this.nodes = {};

    this.diagramEngine = new SRD.DiagramEngine();

    this.diagramEngine.registerNodeFactory(new SRD.DefaultNodeFactory());
    this.diagramEngine.registerLinkFactory(new SRD.DefaultLinkFactory());
  }

  selectionChanged(item, isSelected) {
    if (this.onSelectionChanged) {
      const node = this.nodes[item.id];
      this.onSelectionChanged(node, isSelected);
    }
  }

  nodeRemoved(item) {
    if (this.onNodeRemoved) {
      const node = this.nodes[item.id];
      this.onNodeRemoved(node);
    }
  }

  initialize() {
    if (this.initialized) return;
    else this.initialized = true;

    this.activeModel = new SRD.DiagramModel();
    this.diagramEngine.setDiagramModel(this.activeModel);

    const inputNodes = this.inputs.map((input, index) => {
      const node = new SRD.DefaultNodeModel(input, 'rgb(0,192,255)');
      node.addListener({
        selectionChanged: this.selectionChanged,
        entityRemoved: this.nodeRemoved,
      });
      node.addPort(new SRD.DefaultPortModel(false, `out-1`, 'Значение'));
      node.x = 100;
      node.y = 100 + index * 150;
      return node;
    });

    const outputNodes = this.outputs.map((output, index) => {
      const node = new SRD.DefaultNodeModel(output, 'rgb(0,192,255)');
      node.addListener({
        selectionChanged: this.selectionChanged,
        entityRemoved: this.nodeRemoved,
      });
      node.addPort(new SRD.DefaultPortModel(true, `in-1`, 'Значение'));
      node.x = 600;
      node.y = 30 + index * 100;
      return node;
    });

    inputNodes.forEach(i => this._addNode(i,{
        type: CONSTANTS.NODES.INPUT,
        label: i.name
      }));
    outputNodes.forEach(o => this._addNode(o,{
      type: CONSTANTS.NODES.OUTPUT,
      label: o.name
    }));
  }

  addNode(meta) {
    if (this.nodeProducers[meta.type]) {
      let node = this.nodeProducers[meta.type](meta);
      this._addNode(node, meta);
    }
  }

  updateNode(meta) {
    if (this.nodeUpdaters[meta.type]) {
      let node = this.getActiveDiagram().getNode(meta.id);
      this.nodeUpdaters[meta.type](node, meta);
    }
  }

  nodeProducers = {
    [CONSTANTS.NODES.FORMULA]: this.produceFormula.bind(this),
    [CONSTANTS.NODES.CONDITION]: this.produceCondition.bind(this),
  };

  nodeUpdaters = {
    [CONSTANTS.NODES.FORMULA]: this.updateFormula.bind(this),
    [CONSTANTS.NODES.CONDITION]: this.updateCondition.bind(this),
  };

  updateFormula(item, meta) {
    item.name = this.getFormulaLabel(meta);

    if (meta.secondOperand === CONSTANTS.OPERANDS.CONSTANT) {
      if (item.ports[`in-B`]) {
        const diagram = this.getActiveDiagram();
        const links = Object.keys(item.ports['in-B'].links).map(
          key => item.ports['in-B'].links[key],
        );
        links.forEach(x => diagram.removeLink(x));
        item.removePort(item.ports[`in-B`]);
      }
    } else {
      if (!item.ports[`in-B`]) {
        item.addPort(new SRD.DefaultPortModel(true, `in-B`, 'B'));
      }
    }
  }

  getFormulaLabel(meta) {
    const parameterValue = meta.parameterValue
      ? meta.parameterValue
      : 'не задано';
    const secondOperand =
      meta.secondOperand === CONSTANTS.OPERANDS.CONSTANT
        ? parameterValue
        : 'B';

    return `A ${meta.operation} ${secondOperand}`;
  }

  updateCondition(item, meta) {
    item.name = this.getConditionLabel(meta);
  }

  getConditionLabel(meta) {
    const comparisonValue = meta.comparisonValue
      ? meta.comparisonValue
      : 'не задано';
    return `вход ${meta.operation} ${comparisonValue}`;
  }

  produceFormula(meta) {
    const node = new SRD.DefaultNodeModel(this.getFormulaLabel(meta), 'purple');
    node.addListener({
      selectionChanged: this.selectionChanged,
      entityRemoved: this.nodeRemoved,
    });
    node.addPort(new SRD.DefaultPortModel(true, `in-A`, 'A'));
    node.addPort(new SRD.DefaultPortModel(true, `in-B`, 'B'));
    node.addPort(new SRD.DefaultPortModel(false, `out-1`, 'результат'));
    node.x = meta.x;
    node.y = meta.y;

    return node;
  }

  produceCondition(meta) {
    const node = new SRD.DefaultNodeModel(
      this.getConditionLabel(meta),
      'green',
    );
    node.addListener({
      selectionChanged: this.selectionChanged,
      entityRemoved: this.nodeRemoved,
    });
    node.addPort(new SRD.DefaultPortModel(true, `in`, 'вход'));
    node.addPort(new SRD.DefaultPortModel(false, `out-1`, 'истинно'));
    node.addPort(new SRD.DefaultPortModel(false, `out-2`, 'ложно'));
    node.x = meta.x;
    node.y = meta.y;

    return node;
  }

  _addNode(node, meta) {
    const result = this.activeModel.addNode(node);
    this.nodes[result.id] = {
      ...meta,
      id: result.id,
    };

    if (this.onNodeCreated) this.onNodeCreated(this.nodes[result.id]);

    return result;
  }

  getActiveDiagram() {
    return this.activeModel;
  }

  getDiagramEngine() {
    return this.diagramEngine;
  }

  compile() {
    return compile(this.nodes, this.getActiveDiagram());
  }
}

let instance;

const getAlgorithm = () => {
  if (!instance) instance = new Algorithm();
  return instance;
};

export { getAlgorithm };
