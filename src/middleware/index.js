import algorithmPanelMiddleware from './algorithm-panel';
import stateMachineMiddleware from './state-machine';

const loggingMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    console.log(action);
    return next(action);
  };
};

export default [
  loggingMiddleware,
  algorithmPanelMiddleware,
  stateMachineMiddleware,
];
