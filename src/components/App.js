import React from 'react';
import { connect } from 'react-redux';
import Nodes from './Nodes';
import AlgorithmPanel from './AlgorithmPanel';
import Options from './Options';
import actions from '../actions';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="algorithm-panel-wrapper">
          <AlgorithmPanel />
        </div>
        <div className="tray">
          <Nodes onNodeDrag={this.props.dragNode} />
          <Options node={this.props.activeNode} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeNode: state.algorithmPanel.activeNode
  };
};

const mapDispatchToProps = {
  dragNode: payload => ({
    type: actions.ALGORITHM_PANEL.DRAG_NODE,
    payload
  })
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
