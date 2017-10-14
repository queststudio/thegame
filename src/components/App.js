import React from 'react';
import { connect } from 'react-redux';
import Counter from './Counter';
import Nodes from './Nodes';
import AlgorithmPanel from './AlgorithmPanel';
import { getAlgorithm } from '../algorithm';
import actions from '../actions';

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
  startDraggingNode: payload => ({
    type: actions.ALGORITHM_PANEL.DRAG_NODE_START,
    payload
  })
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
