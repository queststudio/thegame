import React from 'react';
import CONSTANTS from '../../constants/index';
import Formula from './Formula';
import Condition from './Condition';

//ToDo break into smaller files

const Nothing = () => <div />;
const NoOptions = () => <div>Настройка не доступна</div>;

class Options extends React.Component {
  render() {
    const { node, onNodeChanged } = this.props;

    if (!node) return <Nothing />;

    switch (node.type) {
      case CONSTANTS.NODES.FORMULA:
        return <Formula node={node} onChanged={onNodeChanged} />;
        break;
      case CONSTANTS.NODES.CONDITION:
        return <Condition node={node} onChanged={onNodeChanged} />;
        break;
      default:
        return <NoOptions />;
    }
  }
}

export default Options;
