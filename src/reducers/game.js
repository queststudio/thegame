import actions from '../actions';

const initialState = { rounds: [], started: false };

const reducers = {
  [actions.GAME.STARTED]: (state, payload) => {
    return { ...state, started: true };
  },
  [actions.GAME.FINISHED]: (state, payload) => {
    return { ...state, started: false };
  },
  [actions.GAME.ROUND_STARTED]: (state, payload) => {
    return {
      ...state,
      rounds: [...state.rounds, { ...payload, number: state.rounds.length }],
    };
  },
  [actions.GAME.ROUND_FINISHED]: (state, payload) => {
    const lastIndex = state.rounds.length - 1;
    const lastRound = state.rounds[lastIndex];
    return {
      ...state,
      rounds: [
        ...state.rounds.slice(0, lastIndex),
        { ...lastRound, ...payload },
      ],
    };
  },
};

export default (state = initialState, action) => {
  if (reducers[action.type])
    return reducers[action.type](state, action.payload);
  return state;
};
