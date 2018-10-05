import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Account from "./components/Account";
import { List, Grid } from "@material-ui/core";

import TodoContainer from "./containers/TodoContainer";

import {
  web3Connect,
  instantiateContract,
  fetchTodos,
  addTodo
} from "./actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textarea: ""
    };
    this.renderTodos = this.renderTodos.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  componentWillMount() {
    window.addEventListener("load", () => {
      this.props.web3Connect();
      this.props.instantiateContract().then(() => {
        this.props.fetchTodos();
      });
    });
  }

  handleTextareaChange(e) {
    this.setState({
      textarea: e.target.value
    });
  }

  deleteTodo(e) {}

  renderTodos(todos) {
    var todoList = todos.map((todo, i) => (
      <TodoContainer key={i} id={i} todo={todo} />
    ));

    return (
      <List dense={false} style={{ marginLeft: "5%" }}>
        {todoList}
      </List>
    );
  }

  addTodo() {
    this.props.addTodo(this.state.textarea);
  }

  render() {
    if (!this.props.web3) return "Loading web3....";
    return (
      <div className="App" align="center">
        <Grid item xs={12} md={3}>
          <h1>Todos</h1>
          <Account web3={this.props.web3} />
          <textarea
            id="textarea"
            value={this.state.textarea}
            onChange={this.handleTextareaChange}
          />
          <br />
          <Button onClick={this.addTodo} variant="contained" color="primary">
            Add Todo
          </Button>
          <ul>{this.renderTodos(this.props.todos)}</ul>
        </Grid>
      </div>
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
