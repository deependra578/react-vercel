import './App.css';
import Header from './MyComponents/Header';
import Todos from './MyComponents/Todos';
import Footer from './MyComponents/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddTodoItem from './MyComponents/AddTodoItem';
import About from './pages/About';
import { Container } from 'react-bootstrap';
import React, {use, useEffect} from 'react';
import { fetchData, setAuthToken, postData, deleteData } from './utils/api';
import { useState } from 'react';


function App() {

const [authToken, setAuthTokenState] = useState(sessionStorage.getItem('authToken') || null);

useEffect(() => {
    if (authToken) {
      setAuthToken(authToken);
      console.log('Auth token set:', authToken);
    }
  }, [authToken]);

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


  const handleLogin = () => {
    // Simulate login API call
    postData('api/auth/login', { email: 'test2@example.com', password: 'password$578' })
      .then(response => {
        const token = response.token;
        sessionStorage.setItem('authToken', token);
        setAuthTokenState(token);
      })
      .catch(error => console.error('Error during login:', error));
  }

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    setAuthTokenState(null);
    setTodos([]);
  }


  return (
    <BrowserRouter>
      <Header onLogin={handleLogin} onLogout={handleLogout} isLoggedIn={!!authToken} />
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
