import actions from '../actions';

const initialState = { rounds: [], running: false };

const reducers = {
  [actions.GAME.STARTED]: (state, payload) => {
    return { ...state, running: true };
  },
  [actions.GAME.FINISHED]: (state, payload) => {
    return { ...state, running: false };
  },
  [actions.GAME.ROUND_STARTED]: (state, payload) => {
    return {
      ...state,
      rounds: [
        ...state.rounds,
        { ...payload, number: state.rounds.length, finished: false },
      ],
    };
  },
  [actions.GAME.ROUND_FINISHED]: (state, payload) => {
    const index = state.rounds.findIndex(x => x.id == payload.id);
    return {
      ...state,
      rounds: [
        ...state.rounds.slice(0, index),
        {
          ...state.rounds[index],
          ...payload,
          finished: true,
        },
        ...state.rounds.slice(index + 1),
      ],
    };
  },
};

export default (state = initialState, action) => {
  if (reducers[action.type])
    return reducers[action.type](state, action.payload);
  return state;
};
