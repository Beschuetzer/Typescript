"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const Todo_1 = require("../models/Todo");
const TODOS = [];
const createTodo = (req, res, next) => {
    console.log('req.body =', req.body);
    const text = req.body.text;
    const newTodo = new Todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    console.log('TODOS =', TODOS);
    res.status(201).json({ message: 'Created the todo.', createTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const newText = req.body.text;
    const index = TODOS.findIndex(todo => todo.id === todoId);
    if (index === -1) {
        throw new Error('Could not find todo');
    }
    TODOS[index].text = newText;
    res.json({ message: "Updated Todo!", updatedTodos: TODOS });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const index = TODOS.findIndex(todo => todo.id === todoId);
    if (index === -1) {
        throw new Error('Could not find todo');
    }
    TODOS.splice(index, 1);
    res.json({ message: "Todo Deleted!", updatedTodos: TODOS });
};
exports.deleteTodo = deleteTodo;
