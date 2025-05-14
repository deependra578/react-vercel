import React from "react";
import { ListGroup } from "react-bootstrap";

export default function AddTodoItem({todo, deleteTodo, loadingId}){
    return (
        <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold"> {todo.text}</div>
           {todo.description}
        </div>
        
        <button 
          className="btn btn-danger btn-sm ms-2" 
          onClick={() => { deleteTodo(todo.id) }} 
          disabled={loadingId === todo.id}
        >
          {loadingId === todo.id ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            "Delete"
          )}
        </button>
      </ListGroup.Item>
    );
}