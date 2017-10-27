import actions, {
  createMessage,
  startRound,
  finishRound,
  finishGame,
} from '../actions';
import { getAlgorithm } from '../algorithm';
import { servos } from '../api';
import {
  startManos,
  isLoseCondition,
  checkWinCondition,
  isIdleCondition,
} from '../mechanics';

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
    servos(servoState).then(() => {
      if (checkWinCondition(manos)) dispatch(finishGame({ won: true }));
      else if (isLoseCondition(manos)) dispatch(finishGame({ lose: true }));
      else if (isIdleCondition()) dispatch(finishGame({ idle: true }));
      else dispatch(startRound({ manos }));
    });
  },
  [actions.GAME.FINISHED]: (dispatch, action, state) => {
    if (action.payload.win)
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
