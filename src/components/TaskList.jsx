import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

function TaskList() {
    const { tasks, setTasks } = useContext(TaskContext);
  
    const toggleComplete = (id) => {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
    };
  
    const deleteTask = (id) => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    };
  
    return (
      <ul className="w-full max-w-md bg-white shadow-md rounded-md">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between p-3 border-b last:border-b-0 ${
              task.completed ? 'bg-green-100 line-through' : ''
            }`}
          >
            <span
              className="flex-1 cursor-pointer"
              onClick={() => toggleComplete(task.id)}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    );
  }
  

export default TaskList;
