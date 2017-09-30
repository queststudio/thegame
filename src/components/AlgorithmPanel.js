import React, { PropTypes } from "react";
import {
  DiagramEngine,
  DefaultNodeFactory,
  DefaultLinkFactory,
  DiagramModel,
  DefaultNodeModel,
  LinkModel,
  DefaultPortModel,
  DiagramWidget
} from "storm-react-diagrams";
import "./src.css";

class AlgorithmPanel extends React.Component {
  componentWillMount() {
    const engine = new DiagramEngine();
    let model = new DiagramModel();
    this.setState({ engine });
    engine.registerNodeFactory(new DefaultNodeFactory());
    engine.registerLinkFactory(new DefaultLinkFactory());

    let algorythm;
    //3-A) create a default node
    var node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
    var port1 = node1.addPort(new DefaultPortModel(false, "out-1", "Out"));
    node1.x = 10;
    node1.y = 10;

    //3-B) create another default node
    var node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
    var port2 = node2.addPort(new DefaultPortModel(true, "in-1", "IN"));
    node2.x = 200;
    node2.y = 10;

    //3-C) link the 2 nodes together
    var link1 = new LinkModel();
    link1.setSourcePort(port1);
    link1.setTargetPort(port2);

    //4) add the models to the root graph
    model.addNode(node1);
    model.addNode(node2);
    model.addLink(link1);

    //5) load model into engine
    engine.setDiagramModel(model);
  }

  render() {
    const { engine } = this.state;
    return (
      <div
        style={{
          width: 800 + "px",
          height: 600 + "px",
          border: "1px solid red"
        }}
      >
        <DiagramWidget diagramEngine={engine} />
      </div>
    );
  }
}

export default AlgorithmPanel;
