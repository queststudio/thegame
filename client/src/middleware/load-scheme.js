import { loadJson } from '../utils'
import ACTIONS from '../actions'

const loadSchemeMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    if (action.type === ACTIONS.MENU.LOAD) {
      loadJson(action.payload)
        .then(result => console.log(result))
        .catch(ex => console.log("couldn't read file. exception: ", ex))
    }
    return next(action)
  }
}

export default loadSchemeMiddleware
