import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TaskColumn from '../components/TaskColumn';
import TaskForm from '../components/TaskForm';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState({
    'To Do': [],
    'In Progress': [],
    'Done': []
  });
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  // Create new task
  const createTask = async (taskData) => {
    try {
      const response = await axios.post('/api/tasks', taskData);
      const newTask = response.data.task;
      
      setTasks(prev => ({
        ...prev,
        [newTask.status]: [...prev[newTask.status], newTask]
      }));
      
      toast.success('Task created successfully!');
      setShowTaskForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task');
    }
  };

  // Update task status
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await axios.put(`/api/tasks/${taskId}`, { status: newStatus });
      const updatedTask = response.data.task;
      
      // Remove task from old status column
      setTasks(prev => {
        const newTasks = { ...prev };
        Object.keys(newTasks).forEach(status => {
          newTasks[status] = newTasks[status].filter(task => task.id !== taskId);
        });
        
        // Add task to new status column
        newTasks[newStatus] = [...newTasks[newStatus], updatedTask];
        
        return newTasks;
      });
      
      toast.success('Task status updated!');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      
      setTasks(prev => {
        const newTasks = { ...prev };
        Object.keys(newTasks).forEach(status => {
          newTasks[status] = newTasks[status].filter(task => task.id !== taskId);
        });
        return newTasks;
      });
      
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Loading your tasks..." />;
  }

  const totalTasks = Object.values(tasks).flat().length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="mt-2 text-gray-600">
            You have {totalTasks} task{totalTasks !== 1 ? 's' : ''} in your workspace
          </p>
        </div>

        {/* Add Task Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowTaskForm(true)}
            className="btn-primary"
          >
            + Add New Task
          </button>
        </div>

        {/* Task Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(tasks).map(([status, statusTasks]) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={statusTasks}
              onUpdateStatus={updateTaskStatus}
              onDeleteTask={deleteTask}
            />
          ))}
        </div>

        {/* Task Form Modal */}
        {showTaskForm && (
          <TaskForm
            onSubmit={createTask}
            onClose={() => setShowTaskForm(false)}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
