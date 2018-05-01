import actions from '../actions';

const reducers = {
  [actions.NODES.CHANGE_NODE]: (action, state) => {
    const index = state.findIndex(x => x.id === action.payload.id);
    return [
      ...state.slice(0, index),
      action.payload,
      ...state.slice(index + 1),
    ];
  },
  [actions.NODES.CREATE_NODE]: (action, state) => {
    return [...state, action.payload];
  },
  [actions.NODES.REMOVE_NODE]: (action, state) => {
    const index = state.findIndex(x => x.id === action.payload.id);
    return [...state.slice(0, index), ...state.slice(index + 1)];
  },
};

export default (state = [], action) => {
  if (reducers[action.type]) return reducers[action.type](action, state);

  return state;
};
