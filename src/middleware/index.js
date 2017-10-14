const loggingMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    console.log('will dispatch', action);
    return next(action);
  };
};
const algorithmPanelMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    return next(action);
  };
};

export default {
  loggingMiddleware,
  algorithmPanelMiddleware
};
