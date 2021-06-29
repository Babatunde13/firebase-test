import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from 'redux-saga'
import timestamp from "./store/reducers/timestamp";
import rootSaga from './store/sagas/timestamp'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  timestamp,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
