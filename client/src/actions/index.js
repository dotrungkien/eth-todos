import Web3 from "web3";
import contract from "truffle-contract";
import Todos from "../contracts/Todos";
import {
  WEB3_CONNECTED,
  TODO_ADDED,
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
  return (dispatch, getState) => {
    const state = getState();
    const web3 = state.web3;
    const contract = state.contract;
    contract.getTodos().then(todos => {
      dispatch({
        type: TODOS_FETCHED,
        payload: todos.length > 0 ? todos.map(todo => web3.toAscii(todo)) : []
      });
    });
  };
}

export function addTodo(payload) {
  return (dispatch, getState) => {
    const state = getState();
    const web3 = state.web3;
    const contract = state.contract;
    web3.eth.getAccounts((err, accounts) => {
      contract
        .addTodo(web3.fromAscii(payload), { from: accounts[0] })
        .then(results => {
          dispatch({
            type: TODO_ADDED,
            payload
          });
        });
    });
  };
}
