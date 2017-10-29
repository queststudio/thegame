import actions from '../actions';

export default (state = { mistakes: [] }, action) => {
  switch (action.type) {
    case actions.ALGORITHM_PANEL.DRAG_NODE:
      return {
        ...state,
        dragNode: action.payload,
      };
      break;
    case actions.ALGORITHM_PANEL.DROP_NODE:
      return {
        ...state,
        refresher: Math.random(),
        dragNode: undefined,
      };
    case actions.ALGORITHM_PANEL.SELECT_NODE:
      return {
        ...state,
        activeNodeId: action.payload.id,
      };
    case actions.ALGORITHM_PANEL.MISTAKE:
      return {
        ...state,
        mistakes: [...state.mistakes, action.payload],
      };
    case actions.NODES.CHANGE_NODE:
      return {
        ...state,
        refresher: Math.random(),
      };
    default:
      return state;
  }
};
