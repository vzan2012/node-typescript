"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodos = void 0;
const todo_1 = require("./../models/todo");
const TODOS = [];
// POST  - createTodos
exports.createTodos = ((req, resp, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    resp.status(201).json({ message: 'Created the todo', createdTodo: newTodo });
});
// GET - getTodos
exports.getTodos = ((req, resp, next) => {
    resp.status(200).json({ todos: TODOS });
});
// PATCH (Update) - updateTodo
exports.updateTodo = ((req, resp, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0)
        throw new Error('Could not find Todo');
    TODOS[todoIndex] = new todo_1.Todo(TODOS[todoIndex].id, updatedText);
    resp.status(200).json({ message: 'Updated Todo !!!', updatedTodo: TODOS[todoIndex] });
});
// DELETE - deleteTodo
exports.deleteTodo = ((req, resp, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0)
        throw new Error('Could not find Todo');
    TODOS.splice(todoIndex, 1);
    resp.status(200).json({ message: 'Todo Deleted !!!' });
});
