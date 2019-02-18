import React, { useState, useEffect } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Input
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const TodoHook = props => {
  const [id, setID] = useState(null);
  useEffect(() => {
    setID(props.id);
  });
  const [content, setContent] = useState(null);
  useEffect(() => {
    setContent(props.content);
  });
  const [completed, setCompleted] = useState(null);
  useEffect(() => {
    setCompleted(props.completed || false);
  });
  const [editing, setEditing] = useState(false);

  const startEditing = e => {
    setEditing(true);
  };

  const handleChange = e => {
    setContent(e.target.value);
  };

  const handleBoxCheck = e => {
    e.preventDefault();
    const { updateTodo } = props;
    setCompleted(e.target.checked);
    updateTodo(id, content, e.target.checked);
  };

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      submitUpdate(e.target.value);
    }
  };

  const handleBlur = e => {
    e.preventDefault();
    submitUpdate(e.target.value);
  };

  const submitUpdate = content => {
    const { updateTodo } = props;
    updateTodo(id, content, completed);
    setContent(content);
    setEditing(false);
  };

  return (
    <ListItem>
      <Checkbox checked={completed} onChange={handleBoxCheck} />
      {editing ? (
        <Input
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      ) : (
        <ListItemText onDoubleClick={startEditing}>{content}</ListItemText>
      )}
      <ListItemSecondaryAction>
        <IconButton onClick={() => props.deleteTodo(props.id)}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoHook;
