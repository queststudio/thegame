import * as SRD from 'storm-react-diagrams';

export class Algorithm {

  constructor() {
    console.log('CREATING ALGORITHM!!!');

    this.inputs = ['Вход 1', 'Вход 2', 'Вход 3'];
    this.outputs = ['Выход 1', 'Выход 2'];
    this.formulas = [];

    this.diagramEngine = new SRD.DiagramEngine();

    this.diagramEngine.registerNodeFactory(new SRD.DefaultNodeFactory());
    this.diagramEngine.registerLinkFactory(new SRD.DefaultLinkFactory());

    this.initModel();
  }

  initModel() {
    this.activeModel = new SRD.DiagramModel();
    this.diagramEngine.setDiagramModel(this.activeModel);

    const inputNodes = this.inputs.map((input, index) => {
      const node = new SRD.DefaultNodeModel(input, 'rgb(0,192,255)');
      node.addPort(new SRD.DefaultPortModel(false, `out-1`, 'Значение'));
      node.x = 100;
      node.y = 100 + index * 50;
      return node;
    });

    const outputNodes = this.outputs.map((output, index) => {
      const node = new SRD.DefaultNodeModel(output, 'rgb(0,192,255)');
      node.addPort(new SRD.DefaultPortModel(true, `in-1`, 'Значение'));
      node.x = 600;
      node.y = 100 + index * 50;
      return node;
    });

    inputNodes.forEach(i => this.activeModel.addNode(i));
    outputNodes.forEach(o => this.activeModel.addNode(o));
  }

  addNode(meta){
    const node = new SRD.DefaultNodeModel(meta.label, 'purple');
    node.addPort(new SRD.DefaultPortModel(true, `in-A`, 'A'));
    node.addPort(new SRD.DefaultPortModel(true, `in-B`, 'B'));
    node.addPort(new SRD.DefaultPortModel(false, `out-1`, 'результат'));
    node.x = meta.x;
    node.y = meta.y;

    this.formulas.push(meta);
    this.activeModel.addNode(node);
  }

  getActiveDiagram() {
    return this.activeModel;
  }

  getDiagramEngine() {
    return this.diagramEngine;
  }
}

let instance;

const getAlgorithm = () => {
  if (!instance) instance = new Algorithm();
  return instance;
};

export { getAlgorithm };
