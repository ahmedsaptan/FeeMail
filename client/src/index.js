import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

const store = createStore(reducers, {}, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.querySelector("#root")
);

console.log("STRIPE KEY -> ", process.env.REACT_APP_STRIPE_KEY);
console.log("Envirnment -> ", process.env.NODE_ENV);
