import React, { useState, useEffect } from 'react';
import Todo from '../components/Todo';
import { connect } from 'react-redux';
import { deleteTodo, updateTodo } from '../actions';
import { List } from '@material-ui/core';

const TodoListContainer = props => {
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    setTodos(props.todos);
  });

  return (
    <List>
      {todos && todos.length
        ? todos.map((todo, index) => (
            <Todo
              key={index}
              {...todo}
              deleteTodo={props.deleteTodo}
              updateTodo={props.updateTodo}
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
