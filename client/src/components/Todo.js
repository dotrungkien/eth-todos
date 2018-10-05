import React, { Component } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";

class Todo extends Component {
  render() {
    const { id, todo } = this.props;
    return (
      <ListItem>
        <Checkbox checked={todo.completed} />
        <ListItemText>{todo.content}</ListItemText>
        <ListItemSecondaryAction>
          <IconButton onClick={() => this.props.deleteTodo(id)}>
            <Delete />
          </IconButton>
          <IconButton onClick={() => this.props.updateTodo(id)}>
            <Edit />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Todo;
