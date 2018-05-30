import ACTIONS from '../actions'
import { getAlgorithm } from '../algorithm'

const sideEffects = {
  [ACTIONS.ALGORITHM_PANEL.SET_STATE]: (action, getState) => {
    const algorithm = getAlgorithm()
    const { nodes } = action.payload

    algorithm.cleanUp()
    nodes.forEach(node => algorithm.addNode(node))
  },
  [ACTIONS.ALGORITHM_PANEL.DROP_NODE]: (action, getState) => {
    const algorithm = getAlgorithm()
    const node = getState().algorithmPanel.dragNode
    if (node)
      algorithm.addNode({
        ...action.payload,
        ...node
      })
  },
  [ACTIONS.NODES.CHANGE]: (action, getState) => {
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
