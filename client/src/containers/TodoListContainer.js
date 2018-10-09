import React, { Component } from "react";
import Todo from "../components/Todo";
import { connect } from "react-redux";
import { deleteTodo, updateTodo } from "../actions";
import { List } from "@material-ui/core";

class TodoListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: null
    };
  }

  componentWillMount() {
    this.setState({ todos: this.props.todos });
  }

  componentDidUpdate(prevProps) {
    if (this.props.todos !== prevProps.todos) {
      this.setState({ todos: this.props.todos });
    }
  }

  render() {
    return (
      <List>
        {this.state.todos.length
          ? this.state.todos.map((todo, index) => (
              <Todo
                key={index}
                {...todo}
                deleteTodo={this.props.deleteTodo}
                updateTodo={this.props.updateTodo}
              />
            ))
          : null}
      </List>
    );
  }
}
const mapDispatchToProps = {
  deleteTodo,
  updateTodo
};

export default connect(
  null,
  mapDispatchToProps
)(TodoListContainer);
