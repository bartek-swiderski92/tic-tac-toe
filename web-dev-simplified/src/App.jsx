/** @format */
import {useEffect, useState} from 'react';
import './style.css';
import {NewTodoForm} from './NewTodoForm';
import TodoList from './TodoList';

export default function App() {
    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem('ITEMS');
        if (localValue == null) {
            return [];
        } else {
            return JSON.parse(localValue);
        }
    });

    useEffect(() => {
        localStorage.setItem('ITEMS', JSON.stringify(todos));
    }, [todos]);

    function addTodo(newItem) {
        setTodos((currentTodos) => {
            return [...currentTodos, {id: crypto.randomUUID(), title: newItem, completed: false}];
        });
    }

    function toggleTodo(id, completed) {
        setTodos((currentTodos) => {
            return currentTodos.map((todo) => {
                if (todo.id === id) {
                    return {...todo, completed};
                } else {
                    return todo;
                }
            });
        });
    }

    function deleteTodo(id) {
        setTodos((currentTodos) => {
            return currentTodos.filter((todo) => todo.id !== id);
        });
    }

    return (
        <>
            <NewTodoForm onSubmit={addTodo} />
            <h1 className="header">Todo list</h1>
            <TodoList
                todos={todos}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
            />
        </>
    );
}
