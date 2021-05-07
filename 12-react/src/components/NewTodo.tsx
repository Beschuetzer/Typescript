import React, { useRef } from 'react';

interface NewTodoProps {
  onAddTodo: (todoText: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = ({onAddTodo}) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const todoSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredText = textInputRef.current?.value;
  }
  
  return (
    <form onSubmit={todoSubmitHandler}>
      <div>
        <label htmlFor="todo-text">Todo Text</label>
        <input ref={textInputRef} id='todo-text' type="text"/>
      </div>
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default NewTodo;