import { useState, useEffect } from 'react'
import { TodoForm } from './TodoForm'
import './styles.css'
import { TodoList } from './TodoList';

export default function App() {
  const [todos, setTodos] = useState(() => {
    let localData = localStorage.getItem('ITEMS');
    if(localData === null) return [];

    return JSON.parse(localData);
  });

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos, 
        { id: crypto.randomUUID(), title, completed: false }
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id == id) {
          return {...todo, completed}
        } else {
          return todo
        }
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id);
    })
  }

  return (
  <>
    <TodoForm submit={addTodo}/>
    <h1 className='header'>Todo List</h1>

    <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
  </>
  )
}
