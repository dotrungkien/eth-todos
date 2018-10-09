import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import Account from "./components/Account";
import AddTodoContainer from "./containers/AddTodoContainer";
import TodoListContainer from "./containers/TodoListContainer";

import {
  web3Connect,
  getAccountInfo,
  instantiateContract,
  fetchTodos
} from "./actions";

class App extends Component {
  componentWillMount() {
    window.addEventListener("load", async () => {
      await this.props.web3Connect();
      await this.props.getAccountInfo();
      await this.props.instantiateContract();
      await this.props.fetchTodos();
    });
  }

  render() {
    if (!this.props.web3) return "Loading web3....";
    return (
      <Grid
        container
        spacing={16}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <h1>Todos</h1>
        <Account account={this.props.account} balance={this.props.balance} />
        <br />
        <AddTodoContainer />
        <br />
        <TodoListContainer todos={this.props.todos} />
      </Grid>
    );
  }
}

const mapDispatchToProps = {
  web3Connect,
  getAccountInfo,
  instantiateContract,
  fetchTodos
};

const mapsStateToProps = state => ({
  ...state
});

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(App);
