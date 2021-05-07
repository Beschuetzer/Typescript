import React from 'react';

interface TodoListProps {
  todos: {id:string, text:string }[],
  todoDeleteHandler: (id: string, text: string) => void,
}

const TodoList:  React.FC<TodoListProps> = ({todos, todoDeleteHandler}) => {
  return (
    <ul>
      {todos.map(todo => {
        return (
          <li key={todo.id}>
            <span>{todo.text}</span>

            {/* NOTE: This what the second parameter of .bind() does;  it lets you specify the first received parameter on the callback function given */}
            <button onClick={todoDeleteHandler.bind(null, todo.id, todo.text)}>Delete</button>
          </li>
        )
      })}
    </ul>
  )
}

export default TodoList;