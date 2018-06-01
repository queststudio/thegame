import { loadJson } from '../utils'
import ACTIONS, { algorithSetState } from '../actions'

const loadSchemeMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    if (action.type === ACTIONS.MENU.LOAD) {
      loadJson(action.payload)
        .catch(ex => console.log("couldn't read file. exception: ", ex))
        .then(result => {
          const action = algorithSetState(result)
          dispatch(action)
        })
    }
    return next(action)
  }
}

export default loadSchemeMiddleware
