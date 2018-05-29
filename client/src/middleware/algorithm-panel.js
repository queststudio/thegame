import actions from '../actions'
import { getAlgorithm } from '../algorithm'

const sideEffects = {
  [actions.ALGORITHM_PANEL.DROP_NODE]: (action, getState) => {
    const algorithm = getAlgorithm()
    const node = getState().algorithmPanel.dragNode
    if (node)
      algorithm.addNode({
        ...action.payload,
        ...node
      })
  },
  [actions.NODES.CHANGE]: (action, getState) => {
    const algorithm = getAlgorithm()
    algorithm.updateNode(action.payload)
  }
}

const algorithmPanelMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    if (sideEffects[action.type]) sideEffects[action.type](action, getState)

    return next(action)
  }
}

export default algorithmPanelMiddleware
