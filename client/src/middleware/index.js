import algorithmPanelMiddleware from './algorithm-panel'
import gameMiddleware from './game'
import onStateChanged from 'redux-on-state-change'
import saveSchemeMiddleware from './save-scheme'

const loggingMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    console.log(action)
    return next(action)
  }
}

export default [
  loggingMiddleware,
  algorithmPanelMiddleware,
  onStateChanged(gameMiddleware),
  saveSchemeMiddleware
]
