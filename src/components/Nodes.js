import React from 'react';
import CONSTANTS from '../constants';

const Node = props =>
  <div
    className="nodes-menu-item"
    draggable={true}
    onDragStart={props.onDragStart}
  >
    {props.label}
  </div>;

class Nodes extends React.Component {
  render() {
    const elements = [
      { type: CONSTANTS.NODE_TYPES.FORMULA, label: 'формула' }
    ].map(e => <Node {...e} onDragStart={this.props.onNodeDragStart} />);

    return (
      <div className="nodes-menu">
        {elements}
      </div>
    );
  }
}

export default Nodes;
