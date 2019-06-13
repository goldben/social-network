import React from "react";
import ReactDOM from "react-dom";
import { Welcome } from "./welcome";
import { App } from "./app";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";

const store = createStore(reducer, applyMiddleware(reduxPromise));

import "../public/normalize.css";

import "../public/style.css";
let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
