import React, { Component } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Input
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      content: null,
      completed: null,
      editding: false
    };
    this.startEditing = this.startEditing.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBoxCheck = this.handleBoxCheck.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillMount() {
    this.updateState();
  }
  updateState() {
    this.setState({
      id: this.props.id,
      content: this.props.content,
      completed: this.props.completed
    });
  }

  startEditing = e => {
    this.setState({ editing: true });
  };

  handleChange = e => {
    this.setState({ content: e.target.value });
  };

  handleBoxCheck = e => {
    this.setState({ completed: e.target.checked });
    this.props.updateTodo(this.state.id, this.state.content, e.target.checked);
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.submitUpdate(e.target.value);
    }
  };

  handleBlur = e => {
    this.submitUpdate(e.target.value);
  };

  submitUpdate(content) {
    this.props.updateTodo(this.state.id, content, this.state.completed);
    this.setState({ content: content, editing: false });
  }

  render() {
    return (
      <ListItem>
        <Checkbox
          checked={this.state.completed}
          onChange={this.handleBoxCheck}
        />
        {this.state.editing ? (
          <Input
            value={this.state.content}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleBlur}
          />
        ) : (
          <ListItemText onDoubleClick={this.startEditing}>
            {this.state.content}
          </ListItemText>
        )}
        <ListItemSecondaryAction>
          <IconButton onClick={() => this.props.deleteTodo(this.state.id)}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Todo;
