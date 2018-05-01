import React from 'react';
import CONSTANTS from '../../constants';
import ParameterValue from './ParameterValue';

class ComparisonOperations extends React.Component {
  constructor(props) {
    super(props);
    this.onChanged = this.onChanged.bind(this);
  }

  onChanged(e) {
    this.props.onChanged(e.target.value);
  }

  render() {
    const operations = Object.keys(CONSTANTS.COMPARISON_OPERATORS).map(
      key => CONSTANTS.COMPARISON_OPERATORS[key],
    );

    return (
      <select onChange={this.onChanged} value={this.props.value}>
        {operations.map(o => <option value={o}> {o} </option>)}
      </select>
    );
  }
}

class Condition extends React.Component {
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
    const { operation, trueValue, falseValue, comparisonValue } = this.props.node;

    return (
      <div>
        <div>
          <label>операция</label>
          <ComparisonOperations
            onChanged={this.onChanged('operation')}
            value={operation}
          />
          <ParameterValue
            onChanged={this.onChanged('comparisonValue')}
            value={comparisonValue}
            placeholder="значение для сравнения"
          />
        </div>
        <div>
          <ParameterValue
            onChanged={this.onChanged('trueValue')}
            value={trueValue}
            placeholder="истинное значение"
          />
          <ParameterValue
            onChanged={this.onChanged('falseValue')}
            value={falseValue}
            placeholder="ложное значение"
          />
        </div>
      </div>
    );
  }
}

export default Condition;