import actions from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case actions.MESSAGES.CREATE_MESSAGE:
      return [action.payload, ...state];
    default:
      return state;
      break;
  }
};
