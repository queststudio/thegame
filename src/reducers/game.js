import actions from '../actions';

const initialState = { rounds: [], started: false, finished: false };

const reducers = {
  [actions.GAME.STARTED]: (state, payload) => {
    return { ...state, started: true };
  },
  [actions.GAME.FINISHED]: (state, payload) => {
    return { ...state, finished: true };
  },
  [actions.GAME.ROUND_STARTED]: (state, payload) => {
    return {
      ...state,
      rounds: [...state.rounds, { ...payload, number: state.rounds.length }],
    };
  },
  [actions.GAME.ROUND_FINISHED]: (state, payload) => {
    const index = state.rounds.findIndex(x => x.payload.id);
    return {
      ...state,
      rounds: [
        ...state.rounds.slice(0, index),
        {
          ...state.rounds[index],
          ...payload,
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
