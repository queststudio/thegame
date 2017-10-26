import actions from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case actions.ALGORITHM_PANEL.DRAG_NODE:
      return {
        ...state,
        dragNode: action.payload
      };
      break;
    case actions.ALGORITHM_PANEL.DROP_NODE:
      return {
        ...state,
        refresher: Math.random(),
        dragNode: undefined
      };
    case actions.ALGORITHM_PANEL.SELECT_NODE:
      return {
        ...state,
        activeNodeId: action.payload.id
      };
    case actions.NODES.CHANGE_NODE:
      return {
        ...state,
        refresher: Math.random()
      };
    default:
      return state;
  }
};
