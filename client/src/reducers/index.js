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
  todos: [],
  contract: null
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
        todos: [
          ...state.todos,
          {
            id: state.todos.length,
            content: action.payload.content,
            completed: false
          }
        ]
      };
    case TODO_DELETED:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      };
    case TODO_UPDATED:
      return {
        ...state,
        todos: state.todos.map(
          todo =>
            todo.id === action.payload.id
              ? {
                  id: action.payload.id,
                  content: action.payload.content,
                  completed: action.payload.completed
                }
              : todo
        )
      };
    default:
      return state;
  }
};

export default todos;
