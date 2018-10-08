import React from "react";

import {
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  TextField
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const EditTodo = ({ id, todo, deleteTodo }) => (
  <ListItem>
    <Checkbox checked={todo.completed} />
    <TextField>{todo.content}</TextField>
    <ListItemSecondaryAction>
      <IconButton onClick={() => deleteTodo(id)}>
        <Delete />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

export default EditTodo;
