import { RequestHandler } from 'express';
import { Todo } from '../models/Todo';
const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  console.log('req.body =', req.body);
  const text = (req.body as {text: string}).text;
  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);

  console.log('TODOS =', TODOS);
  res.status(201).json({message: 'Created the todo.', createTodo: newTodo});
}

export const getTodos: RequestHandler = (req,res, next) => {
  res.json({todos: TODOS})
}

export const updateTodo: RequestHandler<{id: string}> = (req,res, next) => {
  const todoId = req.params.id;
  const newText = (req.body as {text: string}).text;
  const index = TODOS.findIndex(todo => todo.id === todoId);
  if (index === -1) {
    throw new Error('Could not find todo');
  } 

  TODOS[index].text = newText;
  res.json({message: "Updated Todo!", updatedTodos: TODOS});
}

export const deleteTodo: RequestHandler = (req,res, next) => {
  const todoId = req.params.id;
  const index = TODOS.findIndex(todo => todo.id === todoId);
  if (index === -1) {
    throw new Error('Could not find todo');
  } 
  TODOS.splice(index, 1);
  res.json({message: "Todo Deleted!", updatedTodos: TODOS});
}