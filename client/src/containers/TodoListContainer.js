import React from "react";
import Todo from "../components/Todo";
import { connect } from "react-redux";
import { deleteTodo, updateTodo } from "../actions";
import { List } from "@material-ui/core";

const TodoListContainer = ({ todos, deleteTodo, updateTodo }) => {
  return (
    <List>
      {todos.length
        ? todos.map((todo, index) => (
            <Todo
              key={index}
              id={index}
              {...todo}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          ))
        : null}
    </List>
  );
};
const mapDispatchToProps = {
  deleteTodo,
  updateTodo
};

export default connect(
  null,
  mapDispatchToProps
)(TodoListContainer);
