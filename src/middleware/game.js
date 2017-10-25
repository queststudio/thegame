import actions, { createMessage, startRound, finishRound } from '../actions';

const sideEffects = {
  [actions.GAME.STARTED]: (dispatch, action, getState) => {
    console.log(getState());
    dispatch(createMessage('Начало игры'));
    dispatch(startRound());
  },
  [actions.GAME.ROUND_STARTED]: (dispatch, action, getState) => {
    dispatch(createMessage('Начало цикла'));
    //todo get an algorithm
    //todo execute the algorigthm
    //todo submit the round finished actions
  },
  [actions.GAME.ROUND_FINISHED]: (dispatch, action, getState) => {
    //todo dispatch submittotheserver
  },
};

const gameMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    if (sideEffects[action.type]) sideEffects[action.type](dispatch, action, getState);

    return next(action);
  };
};

export default gameMiddleware;
