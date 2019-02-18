import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

import {
  web3Connect,
  getAccountInfo,
  instantiateContract,
  fetchTodos
} from './actions';

window.addEventListener('load', async () => {
  if (window.web3) {
    await store.dispatch(web3Connect());
    await store.dispatch(getAccountInfo());
    await store.dispatch(instantiateContract());
    await store.dispatch(fetchTodos());
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
