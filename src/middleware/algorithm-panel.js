import actions from '../actions';
import { getAlgorithm } from '../algorithm';

const algorithmPanelMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    switch (action.type) {
      case actions.ALGORITHM_PANEL.DROP_NODE:
        const algorithm = getAlgorithm();
        algorithm.addNode({
          ...action.payload,
          ...getState().algorithmPanel.dragNode
        });
        break;
    }

    return next(action);
  };
};

export default algorithmPanelMiddleware;
