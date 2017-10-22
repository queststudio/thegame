import React from 'react';

class ParameterValue extends React.Component {
  constructor(props) {
    super(props);
    this.onChanged = this.onChanged.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onKeyUp(e) {
    if (e.keyCode === 8 || e.keyCode === 46) e.stopPropagation();
  }

  onChanged(e) {
    this.props.onChanged(e.target.value);
  }

  render() {
    return (
      <input
        placeholder={this.props.placeholder}
        onChange={this.onChanged}
        value={this.props.value}
        onKeyUp={this.onKeyUp}
      />
    );
  }
}

export default ParameterValue;
