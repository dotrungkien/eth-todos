import Web3 from "web3";
import contract from "truffle-contract";
import Todos from "../contracts/Todos";
import {
  WEB3_CONNECTED,
  TODO_ADDED,
  TODO_DELETED,
  TODO_UPDATED,
  TODOS_CONTRACT_INSTANTIATED,
  TODOS_FETCHED
} from "../constants/ActionTypes";

export function web3Connect() {
  return dispatch => {
    const web3 = window.web3;
    if (typeof web3 !== "undefined") {
      dispatch({
        type: WEB3_CONNECTED,
        payload: new Web3(web3.currentProvider)
      });
    } else {
      dispatch({
        type: WEB3_CONNECTED,
        payload: new Web3(
          new Web3.providers.HttpProvider("http://127.0.0.1:9545")
        )
      });
    }
  };
}

export function instantiateContract() {
  return (dispatch, getState) => {
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
}

export function fetchTodos() {
  return async (dispatch, getState) => {
    const state = getState();
    const web3 = state.web3;
    const contract = state.contract;
    const numberOfTodos = await contract.numberOfTodos();
    const todos = [];
    for (let i = 0; i < numberOfTodos; i++) {
      const todo = await contract.getTodo(i);
      const content = web3.toAscii(todo[0]);
      const completed = todo[1];
      todos.push({ content, completed });
    }
    dispatch({
      type: TODOS_FETCHED,
      payload: todos
    });
  };
}

export function addTodo(payload) {
  return async (dispatch, getState) => {
    const state = getState();
    const web3 = state.web3;
    const contract = state.contract;
    await contract.addTodo(payload, { from: web3.eth.coinbase });
    dispatch({
      type: TODO_ADDED,
      payload
    });
  };
}

export function deleteTodo(id) {
  return async (dispatch, getState) => {
    const state = getState();
    const web3 = state.web3;
    const contract = state.contract;
    await contract.deleteTodo(id, { from: web3.eth.coinbase });
    dispatch({
      type: TODO_DELETED,
      id
    });
  };
}

export function updateTodo(id, content, completed) {
  return async (dispatch, getState) => {
    const state = getState();
    const web3 = state.web3;
    const contract = state.contract;
    await contract.updateTodo(id, content, completed, {
      from: web3.eth.coinbase
    });
    const payload = { id, content, completed };
    dispatch({
      type: TODO_UPDATED,
      payload
    });
  };
}
