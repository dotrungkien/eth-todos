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
    this.setState({ ...this.props });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.content !== prevProps.content ||
      this.props.completed !== prevProps.completed
    ) {
      this.setState({
        ...this.props
      });
    }
  }

  startEditing = e => {
    this.setState({ editing: true });
  };

  handleChange = key => event => {
    this.setState({ [key]: event.target.value });
  };

  handleBoxCheck = e => {
    e.preventDefault();
    const { updateTodo } = this.props;
    this.setState({ completed: e.target.checked });
    updateTodo(this.state.id, this.state.content, e.target.checked);
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.submitUpdate(e.target.value);
    }
  };

  handleBlur = e => {
    e.preventDefault();
    this.submitUpdate(e.target.value);
  };

  submitUpdate(content) {
    const { updateTodo } = this.props;
    updateTodo(this.state.id, content, this.state.completed);
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
            onChange={this.handleChange("content")}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleBlur}
          />
        ) : (
          <ListItemText onDoubleClick={this.startEditing}>
            {this.state.content}
          </ListItemText>
        )}
        <ListItemSecondaryAction>
          <IconButton onClick={() => this.props.deleteTodo(this.props.id)}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Todo;
