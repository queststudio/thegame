import algorithmPanelMiddleware from './algorithm-panel';

const loggingMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    console.log('will dispatch', action);
    return next(action);
  };
};

export default [loggingMiddleware, algorithmPanelMiddleware];
