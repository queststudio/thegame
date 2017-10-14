import * as SRD from "storm-react-diagrams";

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

    var node1 = new SRD.DefaultNodeModel("Node 1", "rgb(0,192,255)");
    var port1 = node1.addPort(new SRD.DefaultPortModel(false, "out-1", "Out"));
    node1.x = 100;
    node1.y = 100;

    var node2 = new SRD.DefaultNodeModel("Node 2", "rgb(192,255,0)");
    var port2 = node2.addPort(new SRD.DefaultPortModel(true, "in-1", "IN"));
    node2.x = 400;
    node2.y = 100;


    this.activeModel.addNode(node1);
    this.activeModel.addNode(node2);
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
  if(!instance)
    instance = new Algorithm();
  return instance;
}

export {getAlgorithm};
