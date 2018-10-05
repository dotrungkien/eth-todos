import {
  WEB3_CONNECTED,
  TODO_ADDED,
  TODO_DELETED,
  TODO_UPDATED,
  TODOS_CONTRACT_INSTANTIATED,
  TODOS_FETCHED
} from "../constants/ActionTypes";

const initialState = {
  web3: null,
  todos: []
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case WEB3_CONNECTED:
      return {
        ...state,
        web3: action.payload
      };
    case TODOS_CONTRACT_INSTANTIATED:
      return {
        ...state,
        contract: action.payload
      };
    case TODOS_FETCHED:
      return {
        ...state,
        todos: action.payload
      };
    case TODO_ADDED:
      return {
        ...state,
        todos: [...state.todos, { content: action.payload, completed: false }]
      };
    case TODO_DELETED:
      let todos = state.todos.slice();
      todos.splice(action.id, 1);
      return {
        ...state,
        todos: todos
      };
    case TODO_UPDATED:
      return {
        ...state,
        todos: state.todos.splice(action.payload.id, 1, {
          content: action.payload.content,
          completed: action.payload.completed
        })
      };
    default:
      return state;
  }
};

export default todos;
