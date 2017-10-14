import * as SRD from 'storm-react-diagrams';

export class Algorithm {
  constructor() {
    console.log('CREATING ALGORITHM!!!');

    this.diagramEngine = new SRD.DiagramEngine();

    this.diagramEngine.registerNodeFactory(new SRD.DefaultNodeFactory());
    this.diagramEngine.registerLinkFactory(new SRD.DefaultLinkFactory());

    this.initModel();
  }

  initModel() {
    this.activeModel = new SRD.DiagramModel();
    this.diagramEngine.setDiagramModel(this.activeModel);

    const inputs = ['Вход 1', 'Вход 2', 'Вход 3'];
    const inputNodes = inputs.map((input, index) => {
      const node = new SRD.DefaultNodeModel(input, 'rgb(0,192,255)');
      node.addPort(new SRD.DefaultPortModel(false, `out-1`, 'Значение'));
      node.x = 100;
      node.y = 100 + index * 50;
      return node;
    });

    const outputs = ['Выход 1', 'Выход 2'];
    const outputNodes = outputs.map((output, index) => {
      const node = new SRD.DefaultNodeModel(output, 'rgb(0,192,255)');
      node.addPort(new SRD.DefaultPortModel(true, `in-1`, 'Значение'));
      node.x = 600;
      node.y = 100 + index * 50;
      return node;
    });

    inputNodes.forEach(i => this.activeModel.addNode(i));
    outputNodes.forEach(o => this.activeModel.addNode(o));
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
