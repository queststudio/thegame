import { ALGORITHM_PANEL } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case ALGORITHM_PANEL.DRAG_NODE_START:
      return {
        ...state,
        drag_node: action.payload
      };
    default:
      return state;
  }
};
