import './App.css';
import Header from './MyComponents/Header';
import Todos from './MyComponents/Todos';
import Footer from './MyComponents/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddTodoItem from './MyComponents/AddTodoItem';
import About from './pages/About';
import { Container } from 'react-bootstrap';
import React, {useEffect} from 'react';
import { fetchData, setAuthToken, postData, deleteData } from './utils/api';


function App() {

  setAuthToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZlNTQ0N2UwLTI2NzItNDM0MS1iYmFhLTBjMmQ4ZGQzN2RlMiIsImVtYWlsIjoidGVzdDJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDcxMjU1MjksImV4cCI6MTc0NzIxMTkyOX0._e3m6s43h99hA0jqL7bbz44py6HYg45_v_TzP3ML4Hc'); // Set the token if you have one

  // Fetching the data from the API
  fetchData('api/todos')
    .then(data => {
      console.log('Data fetched from API:', data);

      // Parse the data in object format
      const parsedData = data.data.todos.map(item => ({
        id: item.id,
        text: item.title,
        description: item.description,
        completed: false,
      }));
      // Set the data to local storage
      localStorage.setItem('todos', JSON.stringify(parsedData));

      console.log('Fetched data:', data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  // Initializing the localstorage
   const [todos, setTodos] = React.useState(JSON.parse(localStorage.getItem("todos")) || []);
   const [loadingId, setLoadingId] = React.useState(null);
  
  const addTodo = (todo) => {
    

    const postobject = {      
      title: todo.text,
      description: todo.description
    }

    postData('api/todos', postobject)
      .then(response => {
        console.log('Data posted successfully:', response);

        const newTodo = {
          id: response.data.todo.id,
          text: todo.title,
          description: todo.description,
          completed: false,
        };

        setTodos([...todos, newTodo]);
      })
      .catch(error => {
        console.error('Error posting data:', error);
      });

   
  }
  
  const deleteTodo = (id) => {
    setLoadingId(id); // Set the loading state for the specific todo

    deleteData(`api/todos/${id}`)
      .then(response => {
        console.log('Data deleted successfully:', response);
        const index = todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          const newTodos = [...todos];
          newTodos.splice(index, 1);
          setTodos(newTodos);
        }

      })
      .catch(error => {
        console.error('Error deleting data:', error);
      })
      .finally(() => {
        setLoadingId(null); // Reset the loading state
      });
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <BrowserRouter>
      <Header />
      <Container className="my-4">
        <Routes>
          <Route path="/" element={
            <>
              <AddTodoItem toAddTodo={addTodo}/>
              <Todos todos={todos} deleteTodo={deleteTodo} loadingId={loadingId}/>
            </>
          } />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
    
  );
}

export default App;
