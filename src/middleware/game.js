import actions, { createMessage, startRound, finishRound } from '../actions';
import { getAlgorithm } from '../algorithm';
import { servos } from '../api';
import { startManos } from '../mechanics';

const sideEffects = {
  [actions.GAME.STARTED]: (dispatch, action, getState) => {
    dispatch(createMessage('Начало игры'));
    const manos = startManos();
    dispatch(startRound({ manos }));
  },
  [actions.GAME.ROUND_STARTED]: (dispatch, action, getState) => {
    const algorithm = getAlgorithm();
    const ventiles = algorithm
      .execute(action.payload.manos)
      .map(x => (x < 0 ? 0 : x))
      .map(x => (x > 100 ? 100 : x));

    dispatch(finishRound({ manos: newManos, ventiles }));
  },
  [actions.GAME.ROUND_FINISHED]: (dispatch, action, getState) => {
    const { ventiles, manos } = action.payload;
    const servoState = manos.concat(ventiles);
    servos(servoState);

    //ToDo check if the game is finished
    //ToDo otherwise start a new round
  },
  [actions.GAME.FINISHED]: (dispatch, action, getState) => {
    if (action.payload.win)
      dispatch(
        createMessage(
          'Поздравляем, ваш алгоритм успешно справился с заданием!',
        ),
      );
    else
      dispatch(
        createMessage('Алгоритм привел систему к аварии. Требуются доработки.'),
      );
  },
};

const gameMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    if (sideEffects[action.type])
      sideEffects[action.type](dispatch, action, getState);

    return next(action);
  };
};

export default gameMiddleware;
