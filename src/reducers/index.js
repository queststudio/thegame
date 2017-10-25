import { combineReducers } from 'redux';
import algorithmPanel from './algorithm-panel';
import nodes from './nodes';
import messages from './messages';
import game from './game'

export default combineReducers({
  algorithmPanel,
  nodes,
  messages,
  game,
});
