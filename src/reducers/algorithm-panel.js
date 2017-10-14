import actions from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case actions.ALGORITHM_PANEL.DRAG_NODE:
      return {
        ...state,
        drag_node: action.payload
      };
    default:
      return state;
  }
};
