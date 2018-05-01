import React from 'react';
import { connect } from 'react-redux';
import Nodes from './Nodes';
import AlgorithmPanel from './AlgorithmPanel';
import Options from './Options';
import Console from './Console';
import actions, { finishGame } from '../actions';

const StartButton = props => {
  const text = props.running ? 'завершить исполнение' : 'начать исполнение';
  const onClick = props.running ? props.stopGame : props.startGame;

  return (
    <div className="btn" onClick={onClick}>
      <span className="txt">{text}</span>
    </div>
  );
};

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
      startGame,
      stopGame,
      running,
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
          <StartButton
            startGame={startGame}
            stopGame={stopGame}
            running={running}
          />
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
    running: state.game.running,
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
  stopGame: () => finishGame({ stop: true }),
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
