import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import Account from './components/Account';
import AddTodoContainer from './containers/AddTodoContainer';
import TodoListContainer from './containers/TodoListContainer';

const App = props => {
  const [web3, setWeb3] = useState(null);
  useEffect(() => {
    setWeb3(props.web3);
  });
  const [account, setAccount] = useState(null);
  useEffect(() => {
    setAccount(props.account);
  });
  const [balance, setBalance] = useState(null);
  useEffect(() => {
    setBalance(props.balance);
  });
  const [todos, setTodos] = useState(null);
  useEffect(() => {
    setTodos(props.todos);
  });

  return web3 ? (
    <Grid
      container
      spacing={16}
      direction='column'
      justify='center'
      alignItems='center'
    >
      <h1>Todos</h1>
      <Account account={account} balance={balance} />
      <br />
      <AddTodoContainer />
      <br />
      <TodoListContainer todos={todos} />
    </Grid>
  ) : (
    'Loading web3....'
  );
};

const mapsStateToProps = state => ({
  ...state
});

export default connect(
  mapsStateToProps,
  null
)(App);
