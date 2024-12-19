import { TaskProvider } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';


function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        <h1 className="text-3xl font-bold text-blue-600 mb-5">Todo List</h1>
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;
