import React, { Component } from "react";
import Todo from "../components/Todo";
import { connect } from "react-redux";
import { deleteTodo, updateTodo } from "../actions";
import { List } from "@material-ui/core";

class TodoListContainer extends Component {
  render() {
    const todoList = this.props.todos.length
      ? this.props.todos.map((todo, index) => (
          <Todo
            key={index}
            id={index}
            todo={todo}
            deleteTodo={() => this.props.deleteTodo(index)}
            updateTodo={() => this.props.updateTodo(index)}
          />
        ))
      : null;
    return <List>{todoList}</List>;
  }
}

const mapDispatchToProps = {
  deleteTodo,
  updateTodo
};

export default connect(
  null,
  mapDispatchToProps
)(TodoListContainer);
