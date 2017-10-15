import React from 'react';
import CONSTANTS from '../constants';

//ToDo break into smaller files

const Nothing = () => <div />;
const NoOptions = () => <div>Настройка не доступна</div>;

class Operations extends React.Component {
  constructor(props) {
    super(props);
    this.onChanged = this.onChanged.bind(this);
  }

  onChanged(e) {
    this.props.onChanged(e.target.value);
  }

  render() {
    const operations = Object.keys(CONSTANTS.OPERATIONS).map(
      key => CONSTANTS.OPERATIONS[key]
    );

    return (
      <select onChange={this.onChanged} value={this.props.value}>
        {operations.map(o => <option value={o}> {o} </option>)}
      </select>
    );
  }
}

class Argument extends React.Component {
  constructor(props) {
    super(props);
    this.onChanged = this.onChanged.bind(this);
  }

  onChanged(e) {
    this.props.onChanged(e.target.value);
  }

  render() {
    return (
      <select onChange={this.onChanged} value={this.props.value}>
        <option value={CONSTANTS.ARGUMENTS.PARAMETER}>вход</option>
        <option value={CONSTANTS.ARGUMENTS.CONSTANT}>константа</option>
      </select>
    );
  }
}

class ParameterValue extends React.Component {
  constructor(props) {
    super(props);
    this.onChanged = this.onChanged.bind(this);
  }

  onChanged(e) {
    this.props.onChanged(e.target.value);
  }

  render() {
    return (
      <input
        placeholder="Значение"
        onChange={this.onChanged}
        value={this.props.value}
      />
    );
  }
}

class Formula extends React.Component {
  constructor(props) {
    super(props);
  }

  onChanged = field => value => {
    this.props.onChanged({
      ...this.props.node,
      [field]: value
    });
  };

  render() {
    const { operation, secondOperand, parameterValue } = this.props.node;

    return (
      <div>
        <div>
          <label>операция</label>
          <Operations
            onChanged={this.onChanged('operation')}
            value={operation}
          />
        </div>
        <div>
          <label>второй аргумент</label>
          <Argument
            onChanged={this.onChanged('secondOperand')}
            value={secondOperand}
          />
        </div>
        <div>
          <ParameterValue
            onChanged={this.onChanged('parameterValue')}
            value={parameterValue}
          />
        </div>
      </div>
    );
  }
}

class Options extends React.Component {
  render() {
    const { node, onNodeChanged } = this.props;

    if (!node) return <Nothing />;

    switch (node.type) {
      case CONSTANTS.NODES.FORMULA:
        return <Formula node={node} onChanged={onNodeChanged} />;
        break;
      default:
        return <NoOptions />;
    }
  }
}

export default Options;
