import { RequestHandler } from 'express'

import { Todo } from './../models/todo'

const TODOS: Todo[] = []

// POST  - createTodos
export const createTodos: RequestHandler = ((req, resp, next) => {
    const text = (req.body as { text: string }).text
    const newTodo = new Todo(Math.random().toString(), text)

    TODOS.push(newTodo);

    resp.status(201).json({ message: 'Created the todo', createdTodo: newTodo })
})

// GET - getTodos
export const getTodos: RequestHandler = ((req, resp, next) => {
    resp.status(200).json({ todos: TODOS })
})

// PATCH (Update) - updateTodo
export const updateTodo: RequestHandler<{ id: string }> = ((req, resp, next) => {
    const todoId = req.params.id;

    const updatedText = (req.body as { text: string }).text
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId)

    if (todoIndex < 0)
        throw new Error('Could not find Todo')

    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText)

    resp.status(200).json({ message: 'Updated Todo !!!', updatedTodo: TODOS[todoIndex] })
})

// DELETE - deleteTodo

export const deleteTodo: RequestHandler<{ id: string }> = ((req, resp, next) => {
    const todoId = req.params.id

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId)

    if (todoIndex < 0)
        throw new Error('Could not find Todo')

    TODOS.splice(todoIndex, 1)

    resp.status(200).json({ message: 'Todo Deleted !!!' })
})