import React, { PropTypes } from "react";
import { DiagramWidget } from "storm-react-diagrams";
import "./src.css";
import {getAlgorithm} from '../algorithm'

class AlgorithmPanel extends React.Component {
  render() {
    const {algorithm} = this.props;
    return (
      <div
        style={{
          width: 800 + "px",
          height: 600 + "px",
          border: "1px solid red"
        }}
      >
        <DiagramWidget diagramEngine={algorithm.getDiagramEngine()} />
      </div>
    );
  }
}

export default AlgorithmPanel;
