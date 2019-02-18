import Web3 from 'web3';
import contract from 'truffle-contract';
import Todos from '../contracts/Todos';
import {
  WEB3_CONNECTED,
  ACCOUNT_INFO,
  TODO_ADDED,
  TODO_DELETED,
  TODO_UPDATED,
  TODOS_CONTRACT_INSTANTIATED,
  TODOS_FETCHED
} from '../constants/ActionTypes';

export const web3Connect = () => dispatch => {
  const web3 = window.web3;
  if (typeof web3 !== 'undefined') {
    dispatch({
      type: WEB3_CONNECTED,
      payload: new Web3(web3.currentProvider)
    });
  } else {
    dispatch({
      type: WEB3_CONNECTED,
      payload: new Web3(
        new Web3.providers.HttpProvider('http://127.0.0.1:9545')
      )
    });
  }
};

export const instantiateContract = () => (dispatch, getState) => {
  const web3 = getState().web3;
  const todos = contract(Todos);
  todos.setProvider(web3.currentProvider);
  return todos.deployed().then(contract => {
    dispatch({
      type: TODOS_CONTRACT_INSTANTIATED,
      payload: contract
    });
  });
};

export const getAccountInfo = () => (dispatch, getState) => {
  const state = getState();
  const web3 = state.web3;
  web3.eth.getAccounts((err, result) => {
    if (!err) {
      const account = result[0];
      web3.eth.getBalance(account, (err, result) => {
        if (!err) {
          const balance = web3.fromWei(result.toNumber());
          dispatch({
            type: ACCOUNT_INFO,
            payload: { account, balance }
          });
        }
      });
    }
  });
};

export const fetchTodos = () => async (dispatch, getState) => {
  const state = getState();
  const web3 = state.web3;
  const contract = state.contract;
  const numberOfTodos = await contract.numberOfTodos();
  const todos = [];
  for (let i = 0; i < numberOfTodos; i++) {
    const todo = await contract.getTodo(i);
    const content = web3.toUtf8(todo[0]);
    const completed = todo[1];
    todos.push({ id: i, content, completed });
  }
  dispatch({
    type: TODOS_FETCHED,
    payload: todos
  });
};

export const addTodo = content => async (dispatch, getState) => {
  const state = getState();
  const web3 = state.web3;
  const contract = state.contract;
  await contract.addTodo(content, { from: web3.eth.coinbase });
  const payload = { content };
  dispatch({
    type: TODO_ADDED,
    payload
  });
  console.log('new todo = ', content);
};

export const deleteTodo = id => async (dispatch, getState) => {
  const state = getState();
  const contract = state.contract;
  await contract.deleteTodo(id, { gas: 300000, from: state.account });
  const payload = { id };
  dispatch({
    type: TODO_DELETED,
    payload
  });
  console.log('delete todo id = ', id);
};

export const updateTodo = (id, content, completed) => async (
  dispatch,
  getState
) => {
  const state = getState();
  const web3 = state.web3;
  const contract = state.contract;
  const encodedContent = web3.fromAscii(content);
  await contract.updateTodo(id, encodedContent, completed, {
    from: state.account,
    gas: 300000
  });
  const payload = { id, content, completed };
  dispatch({
    type: TODO_UPDATED,
    payload
  });
  console.log(
    'update todo id = ' +
      id +
      ' content = ' +
      content +
      ' completed = ' +
      completed
  );
};
