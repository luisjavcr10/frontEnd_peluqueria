import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

function TaskForm() {
    const [task, setTask] = useState('');
    const { tasks, setTasks } = useContext(TaskContext);
  
    const handleAddTask = () => {
      if (task.trim() === '') return;
  
      const newTask = { id: Date.now(), text: task, completed: false };
      setTasks([...tasks, newTask]);
      setTask('');
    };
  
    return (
      <div className="w-full max-w-md flex items-center gap-3 mb-5">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Nueva tarea"
          className="flex-1 p-2 border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Agregar
        </button>
      </div>
    );
  }
  

export default TaskForm;