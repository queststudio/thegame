import { guid } from '../utils/index';

const ACTIONS = {
  ALGORITHM_PANEL: {
    DRAG_NODE: 'DRAG_NODE',
    DROP_NODE: 'DROP_NODE',
    SELECT_NODE: 'SELECT_NODE',
    ABANDON_NODE: 'ABANDON_NODE',
  },
  NODES: {
    CREATE_NODE: 'CREATE_NODE',
    CHANGE_NODE: 'CHANGE_NODE',
    REMOVE_NODE: 'REMOVE_NODE',
  },
  MESSAGES: {
    CREATE_MESSAGE: 'CREATE_MESSAGE',
  },
  GAME: {
    STARTED: 'GAME_STARTED',
    ROUND_STARTED: 'ROUND_STARTED',
    ROUND_FINISHED: 'ROUND_FINISHED',
    FINISHED: 'GAME_FINISHED',
  },
};

export const createMessage = text => ({
  type: ACTIONS.MESSAGES.CREATE_MESSAGE,
  payload: {
    text,
    timestamp: Date.now(),
  },
});

export const startRound = payload => ({
  type: ACTIONS.GAME.ROUND_STARTED,
  payload: {
    id: guid(),
    timestamp: Date.now(),
    ...payload,
  },
});

export const finishRound = payload => ({
  type: ACTIONS.GAME.ROUND_FINISHED,
  payload,
});

export const finishGame = payload => ({
  type: ACTIONS.GAME.FINISHED,
  payload,
});

export default ACTIONS;
