import { guid } from '../utils/index'
import ACTIONS from './actions'
import { createAction } from 'redux-actions'

export const createMessage = text => ({
  type: ACTIONS.MESSAGES.CREATE_MESSAGE,
  payload: {
    text,
    timestamp: Date.now()
  }
})

export const startRound = payload => ({
  type: ACTIONS.GAME.ROUND_STARTED,
  payload: {
    id: guid(),
    timestamp: Date.now(),
    ...payload
  }
})

export const finishRound = createAction(ACTIONS.GAME.ROUND_FINISHED)
export const finishGame = createAction(ACTIONS.GAME.FINISHED)

export const algorithmicMistake = payload => ({
  type: ACTIONS.ALGORITHM_PANEL.MISTAKE,
  payload: {
    id: guid(),
    timestamp: Date.now(),
    ...payload
  }
})

export const dragNode = createAction(ACTIONS.ALGORITHM_PANEL.DRAG_NODE)
export const changeNode = createAction(ACTIONS.NODES.CHANGE_NODE)
export const startGame = createAction(ACTIONS.GAME.STARTED)

export const menuSave = createAction(ACTIONS.MENU.SAVE)

export default ACTIONS