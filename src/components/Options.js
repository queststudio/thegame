import React from 'react';
import constants from '../constants';

const Nothing = () => <div />;
const NoOptions = () => <div>Настройка не доступна</div>;
const Formula = props =>
  <div>
    <div>
      <label>операция</label>
      <select>
        <option>+</option>
        <option>-</option>
        <option>*</option>
        <option>/</option>
      </select>
    </div>
    <div>
      <label>второй аргумент</label>
      <select>
        <option>вход</option>
        <option>константа</option>
      </select>
    </div>
    <div>
      <input placeholder="Значение" />
    </div>
  </div>;

class Options extends React.Component {
  render() {
    const { node } = this.props;

    if (!node) return <Nothing />;

    switch (node.type) {
      case constants.NODE_TYPES.FORMULA:
        return <Formula node />;
        break;
      default:
        return <NoOptions />;
    }
  }
}

export default Options;
