import React from 'react';
import { connect } from 'react-redux';
import Counter from './Counter';
import AlgorithmPanel from './AlgorithmPanel';
import { getAlgorithm } from '../algorithm';

class App extends React.Component {
  render() {
    const algorithm = getAlgorithm();
    return (
      <div>
        <Counter
          value={this.props.value}
          onIncrement={this.props.increment}
          onDecrement={this.props.decrement}
        />
        <div style={{ width: '100%', height: '100%' }}>
          <AlgorithmPanel algorithm={algorithm} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    value: state.value
  };
};

const mapDispatchToProps = {
  increment: () => ({
    type: 'INCREMENT'
  }),
  decrement: () => ({
    type: 'DECREMENT'
  })
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
