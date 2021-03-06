pragma solidity ^0.4.23;

contract Todos {
  struct Todo {
    bytes32 content;
    bool completed;
  }

  Todo[] public todos;
  address public owner;

  constructor () public {
    owner = msg.sender;
  }

  function numberOfTodos() public view returns (uint) {
    return todos.length;
  }

  function getTodo(uint id) public view returns (bytes32 content, bool completed) {
    return (todos[id].content, todos[id].completed);
  }

  function addTodo(bytes32 content) public {
    todos.push(Todo(content, false));
  }

  function updateTodo(uint id, bytes32 content, bool completed) public {
    require(id < todos.length);
    todos[id].content = content;
    todos[id].completed = completed;
  }

  function deleteTodo(uint id) public {
    require(id < todos.length);
    for (uint i = id; i < todos.length - 1; i++) {
      todos[i] = todos[i+1];
    }
    todos.length--;
  }

  function kill() public {
    require(msg.sender == owner);
    selfdestruct(owner);
  }
}