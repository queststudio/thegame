import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import App from "./components/App";
import counter from "./reducers";
import { Provider } from "react-redux";

const store = createStore(
  counter,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const rootEl = document.getElementById("root");

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
