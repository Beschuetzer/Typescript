import React from 'react';

interface TodoListProps {
  todos: {id:string, text:string }[];
}

const TodoList:  React.FC<TodoListProps> = ({todos}) => {
  return (
    <ul>
      {todos.map(todo => {
        return (
          <li key={todo.id}>
            {todo.text}
          </li>
        )
      })}
    </ul>
  )
}

export default TodoList;