import { createContext, useContext } from "react";

export const TodoContext = createContext({
    //property
    todos: [
        {
            id: 1,
            todo: "todo msg",
            completed: false,
        }
    ],

    //define functions/ methods
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})

export const useTodo =() => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider