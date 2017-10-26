import React from 'react';
import CONSTANTS from '../constants';

const classes = {
  [CONSTANTS.NODES.FORMULA]: 'formula',
  [CONSTANTS.NODES.CONDITION]: 'condition',
};

const Node = props => (
  <div
    className={`nodes-menu-item ${classes[props.type]}`}
    draggable={true}
    onDragStart={() => props.onDrag({ ...props })}
  >
    {props.label}
  </div>
);

class Nodes extends React.Component {
  render() {
    const elements = [
      {
        operation: CONSTANTS.OPERATORS.SUM,
        parameterValue: undefined,
        secondOperand: CONSTANTS.OPERANDS.PARAMETER,
        type: CONSTANTS.NODES.FORMULA,
        label: 'формула',
      },
      {
        operation: CONSTANTS.COMPARISON_OPERATORS.GREATER,
        comparisonValue: undefined,
        trueValue: undefined,
        falseValue: undefined,
        type: CONSTANTS.NODES.CONDITION,
        label: 'условие',
      },
    ].map(e => <Node {...e} onDrag={this.props.onNodeDrag} />);

    return <div className="nodes-menu">{elements}</div>;
  }
}

export default Nodes;
