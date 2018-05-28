import { downloadAsJson } from '../utils'
import ACTIONS from '../actions'

const saveSchemeMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    if (action.type === ACTIONS.MENU.SAVE) {
      const { nodes } = getState()
      downloadAsJson({ nodes })
    }
    return next(action)
  }
}

export default saveSchemeMiddleware
