import { combineReducers } from 'redux';
import algorithmPanel from './algorithm-panel';
import nodes from './nodes';
import messages from './messages';

export default combineReducers({
  algorithmPanel,
  nodes,
  messages,
});
