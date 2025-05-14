import React from "react";
import { ListGroup } from "react-bootstrap";
import TodoItem from "./TodoItem";

export default function Todos(props) {
  const { todos, deleteTodo } = props;
  return (
    <div className="todos mt-4">
      <h2>Your Todos</h2>
      <ListGroup>
      {todos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} deleteTodo={deleteTodo} />
        ))}
      </ListGroup>
      <ul>
        
        
      </ul>
    </div>
  );
}