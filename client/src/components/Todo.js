import React, { Component } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";

import { connect } from "react-redux";
import { deleteTodo } from "../actions";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.updateTodo = this.updateTodo.bind(this);
  }
  updateTodo(id) {}

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
          <IconButton onClick={() => this.updateTodo(id)}>
            <Edit />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

const mapDispatchToProps = {
  deleteTodo
};

export default connect(
  null,
  mapDispatchToProps
)(Todo);
