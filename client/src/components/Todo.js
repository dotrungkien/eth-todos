import React, { Component } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const Todo = ({ id, todo, deleteTodo }) => (
  <ListItem>
    <Checkbox checked={todo.completed} />
    <ListItemText>{todo.content}</ListItemText>
    <ListItemSecondaryAction>
      <IconButton onClick={() => deleteTodo(id)}>
        <Delete />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

export default Todo;
