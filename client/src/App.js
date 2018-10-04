import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Account from "./components/Account";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

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

  renderTodos(todos) {
    return todos.map((todo, i) => (
      <li key={i}>
        {todo}

        <IconButton
          tooltip="remove"
          tooltipPosition="bottom-right"
          onClick={this.onClick}
        >
          <DeleteIcon />
        </IconButton>
      </li>
    ));
  }

  addTodo() {
    this.props.addTodo(this.state.textarea);
  }

  render() {
    if (!this.props.web3) return "Loading web3....";
    return (
      <div className="App" align="center">
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
