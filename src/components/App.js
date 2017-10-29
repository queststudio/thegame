import React from 'react';
import { connect } from 'react-redux';
import Nodes from './Nodes';
import AlgorithmPanel from './AlgorithmPanel';
import Options from './Options';
import Console from './Console';
import actions from '../actions';

const StartButton = props => (
  <div className="btn" onClick={props.onClick}>
    <span className="txt">начать</span>
  </div>
);

class App extends React.Component {
  render() {
    const {
      activeNodeId,
      nodes,
      messages,
      rounds,
      dragNode,
      changeNode,
      mistakes,
    } = this.props;
    const activeNode = nodes.find(x => x.id === activeNodeId);

    return (
      <div className="app">
        <div className="algorithm-panel-wrapper">
          <AlgorithmPanel />
        </div>
        <div className="tray">
          <Nodes onNodeDrag={dragNode} />
          <Options node={activeNode} onNodeChanged={changeNode} />
          <div>
            <Console messages={messages} rounds={rounds} mistakes={mistakes} />
          </div>
          <StartButton onClick={this.props.startGame} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeNodeId: state.algorithmPanel.activeNodeId,
    nodes: state.nodes,
    messages: state.messages,
    rounds: state.game.rounds,
    mistakes: state.algorithmPanel.mistakes,
  };
};

const mapDispatchToProps = {
  dragNode: payload => ({
    type: actions.ALGORITHM_PANEL.DRAG_NODE,
    payload,
  }),
  changeNode: payload => ({
    type: actions.NODES.CHANGE_NODE,
    payload,
  }),
  startGame: payload => ({
    type: actions.GAME.STARTED,
    payload,
  }),
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
