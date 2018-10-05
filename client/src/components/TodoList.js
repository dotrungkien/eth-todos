import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, updateTodo }) => (
  <ul>
    {todos.map((todo, index) => (
      <Todo
        key={index}
        {...todo}
        deleteTodo={() => deleteTodo(index)}
        updateTodo={() => updateTodo(index)}
      />
    ))}
  </ul>
);

export default TodoList;
