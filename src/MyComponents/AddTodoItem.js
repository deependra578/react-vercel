import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export default function AddTodoItem({toAddTodo}) {

const [title, setTitle] = React.useState("");
const [description, setDescription] = React.useState("");
const [loading, setLoading] = React.useState(false);

function handleAddTodo() {
    
    if(title.trim() === ''){
        alert("Please enter a title");
        return;
    }

    setLoading(true);

    // Simulate async operation
    setTimeout(() => {
        toAddTodo({
            text: title,
            description: description,
        });

        setTitle("");
        setDescription("");
        setLoading(false);
    }, 1000); // Replace with actual async operation
}



  return (
    <div className="form-container bg-dark text-white p-4 rounded">
        <Form>
        <Row className="align-items-center">
            <Col>
                <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                    Title
                </Form.Label>
                <Form.Control
                    id="inlineFormInput"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
            </Col>
            <Col>
                <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                    Description
                </Form.Label>
                <InputGroup>
                    <Form.Control 
                    id="inlineFormInputGroup" 
                    placeholder="Description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </InputGroup>
            </Col>
            <Col xs="auto">
                <Button type="button" onClick={handleAddTodo} className="mb-2" disabled={loading}>
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            {' '}Adding...
                        </>
                    ) : (
                        "Add Todo"
                    )}
                </Button>
            </Col>
        </Row>
        </Form>
    </div>
  )
}
