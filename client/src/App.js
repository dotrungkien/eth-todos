import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import Account from "./components/Account";
import AddTodoContainer from "./containers/AddTodoContainer";
// import TodoContainer from "./containers/TodoContainer";

import {
  web3Connect,
  instantiateContract,
  fetchTodos,
  addTodo
} from "./actions";

class App extends Component {
  componentWillMount() {
    window.addEventListener("load", () => {
      this.props.web3Connect();
      this.props.instantiateContract().then(() => {
        this.props.fetchTodos();
      });
    });
  }
  // handleTextareaChange(e) {
  //   this.setState({
  //     textarea: e.target.value
  //   });
  // }

  // renderTodos(todos) {
  //   var todoList = todos.map((todo, i) => (
  //     <TodoContainer key={i} id={i} todo={todo} />
  //   ));

  //   return (
  //     <List dense={false} style={{ marginLeft: "5%" }}>
  //       {todoList}
  //     </List>
  //   );
  // }

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
        <Account web3={this.props.web3} />
        <br />
        <AddTodoContainer />
        <br />
        {/* <TodoList /> */}
      </Grid>
    );
  }
}

const mapDispatchToProps = {
  web3Connect,
  instantiateContract,
  fetchTodos,
  addTodo
};

const mapsStateToProps = state => ({
  web3: state.web3,
  todos: state.todos
});

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(App);
