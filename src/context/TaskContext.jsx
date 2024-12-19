import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({children}) =>{
    const [tasks, setTasks] = useState([]);

    // Cargar tareas desde localStorage
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    // Guardar tareas en localStorage
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <TaskContext.Provider value={{tasks, setTasks}}>
            {children}
        </TaskContext.Provider>
    );
};