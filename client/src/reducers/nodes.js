import actions from '../actions'

const reducers = {
  [actions.NODES.CHANGE]: (action, state) => {
    const index = state.findIndex(x => x.id === action.payload.id)
    return [...state.slice(0, index), action.payload, ...state.slice(index + 1)]
  },
  [actions.NODES.CREATE]: (action, state) => {
    return [...state, action.payload]
  },
  [actions.NODES.REMOVE]: (action, state) => {
    const index = state.findIndex(x => x.id === action.payload.id)

    return index >= 0
      ? [...state.slice(0, index), ...state.slice(index + 1)]
      : state
  }
}

export default (state = [], action) => {
  if (reducers[action.type]) return reducers[action.type](action, state)

  return state
}
