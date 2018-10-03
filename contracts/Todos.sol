pragma solidity ^0.4.23;

contract Todos {
  bytes32[] public todos;
  address public owner;

  constructor () public {
    owner = msg.sender;
  }

  function addTodo(bytes32 todo) public {
    todos.push(todo);
  }

  function kill() public {
    require(msg.sender == owner);
    selfdestruct(owner);
  }
}