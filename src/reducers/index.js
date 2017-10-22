import { combineReducers } from 'redux';
import algorithmPanel from './algorithm-panel';
import nodes from './nodes';

export default combineReducers({
  algorithmPanel,
  nodes,
});
