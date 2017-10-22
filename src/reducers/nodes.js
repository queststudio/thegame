import actions from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case actions.NODES.CHANGE_NODE:
      const index = state.findIndex(x => x.id === action.payload.id);
      return [
        ...state.slice(0, index),
        action.payload,
        ...state.slice(index + 1),
      ];
    case actions.NODES.CREATE_NODE:
      return [...state, action.payload];
    default:
      return state;
  }
};
