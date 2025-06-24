import React from 'react';
import TaskCard from './TaskCard';

const TaskColumn = ({ status, tasks, onUpdateStatus, onDeleteTask }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do':
        return 'bg-gray-100 text-gray-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Done':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'To Do':
        return 'In Progress';
      case 'In Progress':
        return 'Done';
      case 'Done':
        return null; // No next status for completed tasks
      default:
        return null;
    }
  };

  const getPreviousStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'In Progress':
        return 'To Do';
      case 'Done':
        return 'In Progress';
      case 'To Do':
        return null; // No previous status for to-do tasks
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
            {status}
          </span>
          <span className="text-gray-500 text-sm">
            ({tasks.length})
          </span>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No tasks in {status.toLowerCase()}</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdateStatus={onUpdateStatus}
              onDeleteTask={onDeleteTask}
              nextStatus={getNextStatus(task.status)}
              previousStatus={getPreviousStatus(task.status)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
