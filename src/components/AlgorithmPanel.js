import React, { PropTypes } from 'react';
import { DiagramWidget } from 'storm-react-diagrams';
import './src.css';

//ToDo evolve to container
class AlgorithmPanel extends React.Component {
  constructor(props) {
    super(props);
    this.onNodeDrop = this.onNodeDrop.bind(this);
  }
  onNodeDrop(event) {
    const { algorithm } = this.props;
    const dropPoint = algorithm.getDiagramEngine().getRelativeMousePoint(event);
    this.props.onNodeDrop({
      x: dropPoint.x,
      y: dropPoint.y
    });
  }
  componentDidMount() {
    const { algorithm, onNodeSelect, onNodeAbandon } = this.props;
    algorithm.onSelectionChanged = (node, isSelected) => {
      if (isSelected) onNodeSelect(node);
      else onNodeAbandon(node);
    };
  }

  render() {
    const { algorithm } = this.props;
    return (
      <div
        style={{
          width: 800 + 'px',
          height: 600 + 'px',
          border: '1px solid red'
        }}
        onDrop={this.onNodeDrop}
        onDragOver={event => {
          event.preventDefault();
        }}
      >
        <DiagramWidget diagramEngine={algorithm.getDiagramEngine()} />
      </div>
    );
  }
}

export default AlgorithmPanel;
