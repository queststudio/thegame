import React from 'react';
import { connect } from 'react-redux';
import Counter from './Counter';
import Nodes from './Nodes';
import AlgorithmPanel from './AlgorithmPanel';
import { getAlgorithm } from '../algorithm';

class App extends React.Component {
  render() {
    const algorithm = getAlgorithm();
    return (
      <div className="app">
        <div className="algorithm-panel-wrapper">
          <AlgorithmPanel algorithm={algorithm} />
        </div>
        <Nodes onNodeDragStart={this.props.startDraggingNode} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    value: state.value
  };
};

const mapDispatchToProps = {
  increment: () => ({
    type: 'INCREMENT'
  }),
  decrement: () => ({
    type: 'DECREMENT'
  }),
  startDraggingNode: () => ({
    type: 'DRAG_NODE_START'
  })
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
