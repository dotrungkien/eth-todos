import React, { Component } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import { connect } from "react-redux";
import { deleteTodo } from "../actions";

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
