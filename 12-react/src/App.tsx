import React from 'react';
import { useState } from 'react';
import './App.css';

import { Todo } from './todo.model'
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo'

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const todoAddHandler = (text: string) => {
    setTodos(prevTodos => [
      ...prevTodos, 
      {
        id: Math.random.toString(),
        text: text,
      }
  ])
  }

  const todoDeleteHandler = (todoId: string, todoText: string) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== todoId)
    })
  }

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler}/>     
      <TodoList todoDeleteHandler={todoDeleteHandler} todos={todos}/>
    </div>
  );
}

export default App;
