import Web3 from "web3";
import contract from "truffle-contract";
import Todos from "../contracts/Todos";
import * as types from "../constants/ActionTypes";

export function web3Connect() {
  return dispatch => {
    const web3 = window.web3;
    if (typeof web3 !== "undefined") {
      dispatch({
        type: types.WEB3_CONNECTED,
        payload: new Web3(web3.currentProvider)
      });
    } else {
      dispatch({
        type: types.WEB3_CONNECTED,
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
        type: types.TODOS_CONTRACT_INSTANTIATED,
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
        types: types.TODOS_FETCHED,
        payload: todos.map(todo => web3.toAscii(todo))
      });
    });
  };
}

export function addTodo(payload) {
  return (dispatch, getState) => {
    const state = getState();
    const web3 = state.web3;
    const contract = state.contract;
    web3.eth
      .getAccounts((err, accounts) => {
        contract.addTodo(web3.fromAscii(payload), { from: accounts[0] });
      })
      .then(() => {
        dispatch({
          type: types.TODO_ADDED,
          payload
        });
      });
  };
}
