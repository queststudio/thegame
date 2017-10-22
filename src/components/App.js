import React from 'react';
import { connect } from 'react-redux';
import Nodes from './Nodes';
import AlgorithmPanel from './AlgorithmPanel';
import Options from './Options';
import Messages from './Messages';
import actions from '../actions';

class App extends React.Component {
  render() {
    const {
      activeNodeId,
      nodes,
      messages,
      dragNode,
      changeNode,
      createMessage,
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
          <div onClick={() => createMessage({ text: `We come in peace! ${Date()}` })}>
            <Messages messages={messages} />
          </div>
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
  createMessage: payload => ({
    type: actions.MESSAGES.CREATE_MESSAGE,
    payload,
  }),
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
