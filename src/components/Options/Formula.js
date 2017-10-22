import React from 'react';
import CONSTANTS from '../../constants';
import ParameterValue from './ParameterValue';

class Operations extends React.Component {
  constructor(props) {
    super(props);
    this.onChanged = this.onChanged.bind(this);
  }

  onChanged(e) {
    this.props.onChanged(e.target.value);
  }

  render() {
    const operations = Object.keys(CONSTANTS.OPERATORS).map(
      key => CONSTANTS.OPERATORS[key],
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

class Formula extends React.Component {
  constructor(props) {
    super(props);
  }

  onChanged = field => value => {
    this.props.onChanged({
      ...this.props.node,
      [field]: value,
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
        {secondOperand === CONSTANTS.ARGUMENTS.CONSTANT ? (
          <div>
            <ParameterValue
              placeholder="значение константы"
              onChanged={this.onChanged('parameterValue')}
              value={parameterValue}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Formula;
