import React from 'react';
import { connect } from 'react-redux';
import Nodes from './Nodes';
import AlgorithmPanel from './AlgorithmPanel';
import { getAlgorithm } from '../algorithm';
import actions from '../actions';
import Options from './Options';

class App extends React.Component {
  render() {
    const algorithm = getAlgorithm();
    return (
      <div className="app">
        <div className="algorithm-panel-wrapper">
          <AlgorithmPanel
            refresher={this.props.algorithmPanel.refresher}
            algorithm={algorithm}
            onNodeDrop={this.props.dropNode}
            onNodeSelect={this.props.selectNode}
            onNodeAbandon={this.props.abandonNode}
          />
        </div>
        <div className="tray">
          <Nodes onNodeDrag={this.props.dragNode} />
          <Options node={this.props.algorithmPanel.activeNode} />
        </div>
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
  }),
  selectNode: payload => ({
    type: actions.ALGORITHM_PANEL.SELECT_NODE,
    payload: payload
  }),
  abandonNode: payload => ({
    type: actions.ALGORITHM_PANEL.ABANDON_NODE,
    payload: payload
  })
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
