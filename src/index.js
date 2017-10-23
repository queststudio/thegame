import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App';
import counter from './reducers';
import { Provider } from 'react-redux';
import middleware from './middleware';

const store = createStore(
  counter,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
);

const rootEl = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl
  );
};
render();
store.subscribe(render);



/*ToDo temporary here
+ execute algorithm
+ send state to the server
+ calculate inputs for the next cycle

+ (?) validate infinite loops
+ (?) validate hanging links

+ prevent wrong connections
+ prevent deleting ins and outs

+ show inputs
+ show outputs
+ show formulas
+ show conditions
+ show pending

+ make inactive while execute

*/