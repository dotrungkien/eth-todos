import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddTodo from '../components/AddTodo'
import { addTodo } from '../actions'

class AddTodoContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todoText: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = e => {
    if (e.target.value !== 'undefined')
      this.setState({ todoText: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.addTodo(this.state.todoText)
  }

  render() {
    return (
      <AddTodo
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

const mapDispatchToProps = {
  addTodo
}

export default connect(
  null,
  mapDispatchToProps
)(AddTodoContainer)
