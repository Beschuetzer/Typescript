import React from 'react';
import './App.css';

import TodoList from './components/TodoList';

function App() {
  const todos = [{id:'t1', text: 'finish the course'}]


  return (
    <div className="App">
      <TodoList todos={todos}/>
    </div>
  );
}

export default App;
