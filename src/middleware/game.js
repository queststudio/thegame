import actions, { createMessage, startRound, finishRound } from '../actions';
import { getAlgorithm } from '../algorithm';
import { servos } from '../api';
import { startManos } from '../mechanics/index';

const sideEffects = {
  [actions.GAME.STARTED]: (dispatch, action, state) => {
    dispatch(createMessage('Начало игры'));
    dispatch(startRound({ manos: startManos }));
  },
  [actions.GAME.ROUND_STARTED]: (dispatch, action, state) => {
    const { id, manos } = action.payload;
    const algorithm = getAlgorithm();
    const ventiles = algorithm
      .execute(manos)
      .map(x => (x < 0 ? 0 : x))
      .map(x => (x > 100 ? 100 : x));

    const newManos = manos;

    dispatch(finishRound({ id, manos: newManos, ventiles }));
  },
  [actions.GAME.ROUND_FINISHED]: (dispatch, action, state) => {
    const { ventiles, manos } = action.payload;
    const servoState = manos.concat(ventiles);
    servos(servoState);

    //ToDo check if the game is finished
    //ToDo otherwise start a new round
  },
  [actions.GAME.FINISHED]: (dispatch, action, state) => {
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

const gameMiddleware = (prevState, nextState, action, dispatch) => {
  if(!action)
    return;

  if (sideEffects[action.type])
    sideEffects[action.type](dispatch, action, nextState);
};

export default gameMiddleware;
