import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styles from '../css/ListAllTodos.module.css';
import { BounceLoader } from 'react-spinners';
import { base_url } from '../data';

function ListTodos() {
 
    const [todos, setTodos] = useState([]);
    const [loader, setLoader] = useState(false)

  const fetchTodos = async () => {
    setLoader(true)
    try {
      const response = await axios.get(`${base_url}/api/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
    setLoader(false)
  };

  const handleDelete = async (id) => {
    setLoader(true)
    try {
      await axios.delete(`${base_url}/api/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
     setLoader(false)
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loader) {
    return <div className={styles.loader}> <BounceLoader color="#0056b3" /> </div> 
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>All Todos</h2>
      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <ul className={styles.todoList}>
          {todos.map(todo => (
            <li key={todo.id} className={styles.todoItem}>
              <span className={styles.title}>{todo.title}</span>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
}

export default ListTodos