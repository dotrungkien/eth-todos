import { connect } from "react-redux";
import Todo from "../components/Todo";
import EditTodo from "../components/EditTodo";

import { deleteTodo, updateTodo } from "../actions";

const mapDispatchToProps = {
  deleteTodo,
  updateTodo
};

export default connect(
  null,
  mapDispatchToProps
)(EditTodo);
