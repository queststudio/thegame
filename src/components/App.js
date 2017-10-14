import React from 'react';
import { connect } from 'react-redux';
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
          <AlgorithmPanel
            algorithm={algorithm}
            onNodeDrop={this.props.dropNode}
          />
        </div>
        <Nodes onNodeDrag={this.props.dragNode} />
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
  dragNode: payload => ({
    type: actions.ALGORITHM_PANEL.DRAG_NODE,
    payload
  }),
  dropNode: payload => ({
    type: actions.ALGORITHM_PANEL.DROP_NODE,
    payload
  })
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
