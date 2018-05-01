import actions, {
  createMessage,
  startRound,
  finishRound,
  finishGame,
  algorithmicMistake,
} from '../actions';
import { getAlgorithm } from '../algorithm';
import { servos } from '../api';
import {
  startManos,
  isLoseCondition,
  checkWinCondition,
  isIdleCondition,
  drop,
  calculateNewState,
} from '../mechanics';

const sanitizeNaNs = value => {
  if (isNaN(value)) {
    console.log('something very bad is happening');
    return 0;
  }

  return value;
};

const sideEffects = {
  [actions.GAME.STARTED]: (dispatch, action, state) => {
    drop();
    dispatch(createMessage('Начало игры'));
    dispatch(startRound({ manos: startManos }));
  },
  [actions.GAME.ROUND_STARTED]: (dispatch, action, state) => {
    if (!state.game.running) return;

    const { id, manos } = action.payload;
    const algorithm = getAlgorithm();

    try {
      const ventiles = algorithm
        .execute(manos)
        .map(x => (x < 0 ? 0 : x))
        .map(x => (x > 100 ? 100 : x))
        .map(sanitizeNaNs);

      const manosAfter = calculateNewState(manos, ventiles).map(sanitizeNaNs);

      dispatch(finishRound({ id, manosAfter: manosAfter, ventiles }));
    } catch (err) {
      dispatch(algorithmicMistake(err));
      dispatch(finishGame({ err: true }));
    }
  },
  [actions.GAME.ROUND_FINISHED]: (dispatch, action, state) => {
    const { ventiles, manosAfter } = action.payload;

    const servoState = manosAfter.concat(ventiles);
    servos(servoState).then(() => {
      if (checkWinCondition(manosAfter)) dispatch(finishGame({ win: true }));
      else if (isLoseCondition(manosAfter))
        dispatch(finishGame({ lose: true }));
      else if (isIdleCondition()) dispatch(finishGame({ idle: true }));
      else dispatch(startRound({ manos: manosAfter }));
    });
  },
  [actions.GAME.FINISHED]: (dispatch, action, state) => {
    if (action.payload.stop)
      dispatch(createMessage('Исполнение алгоритма остановлено.'));
    else if (action.payload.err)
      dispatch(
        createMessage(
          'В алгоритме обнаружена ошибка. Исправьте ее и попробуйте снова.',
        ),
      );
    else if (action.payload.win)
      dispatch(
        createMessage(
          'Поздравляем, ваш алгоритм успешно справился с заданием!',
        ),
      );
    else if (action.payload.lose)
      dispatch(
        createMessage('Алгоритм привел систему к аварии. Требуются доработки.'),
      );
    else
      dispatch(
        createMessage(
          'Алгоритм не справился с задачей за заданное время. Требуются доработки.',
        ),
      );
  },
};

const gameMiddleware = (prevState, nextState, action, dispatch) => {
  if (!action) return;

  if (sideEffects[action.type])
    sideEffects[action.type](dispatch, action, nextState);
};

export default gameMiddleware;
