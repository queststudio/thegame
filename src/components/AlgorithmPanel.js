import React, { PropTypes } from 'react';
import { DiagramWidget } from 'storm-react-diagrams';
import './src.css';
import { getAlgorithm } from '../algorithm';
import actions from '../actions';
import { connect } from 'react-redux';

const Loading = () => <div>Загружаю</div>;

class AlgorithmPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onNodeDrop = this.onNodeDrop.bind(this);
  }
  onNodeDrop(event) {
    const { algorithm } = this.state;
    const { dropNode } = this.props;
    const dropPoint = algorithm.getDiagramEngine().getRelativeMousePoint(event);
    dropNode({
      x: dropPoint.x,
      y: dropPoint.y
    });
  }
  componentDidMount() {
    const { selectNode, abandonNode, createNode } = this.props;
    const algorithm = getAlgorithm();

    this.setState({
      ...this.state,
      algorithm
    });

    algorithm.onNodeCreated = node => {
      createNode(node);
    };

    algorithm.onSelectionChanged = (node, isSelected) => {
      if (isSelected) selectNode(node);
      else abandonNode(node);
    };

    algorithm.initialize();
  }

  render() {
    const { algorithm } = this.state;

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
        {algorithm ? (
          <DiagramWidget diagramEngine={algorithm.getDiagramEngine()} />
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    algorithmPanel: state.algorithmPanel
  };
};

const mapDispatchToProps = {
  dropNode: payload => ({
    type: actions.ALGORITHM_PANEL.DROP_NODE,
    payload
  }),
  selectNode: payload => ({
    type: actions.ALGORITHM_PANEL.SELECT_NODE,
    payload
  }),
  abandonNode: payload => ({
    type: actions.ALGORITHM_PANEL.ABANDON_NODE,
    payload
  }),
  createNode: payload => ({
    type: actions.ALGORITHM_PANEL.CREATE_NODE,
    payload
  })
};
export default connect(mapStateToProps, mapDispatchToProps)(AlgorithmPanel);
