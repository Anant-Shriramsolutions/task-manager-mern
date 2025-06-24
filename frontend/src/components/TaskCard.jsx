import React, { useState } from 'react';

const TaskCard = ({ task, onUpdateStatus, onDeleteTask, nextStatus, previousStatus }) => {
  const [showActions, setShowActions] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleStatusUpdate = (newStatus) => {
    onUpdateStatus(task.id, newStatus);
    setShowActions(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDeleteTask(task.id);
    }
    setShowActions(false);
  };

  return (
    <div className="task-card relative">
      {/* Task Content */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {task.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Created {formatDate(task.createdAt)}
          </p>
        </div>
        
        {/* Actions Button */}
        <div className="relative ml-2">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
          >
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>

          {/* Actions Dropdown */}
          {showActions && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              {previousStatus && (
                <button
                  onClick={() => handleStatusUpdate(previousStatus)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Move to {previousStatus}
                </button>
              )}
              {nextStatus && (
                <button
                  onClick={() => handleStatusUpdate(nextStatus)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Move to {nextStatus}
                </button>
              )}
              <hr className="my-1" />
              <button
                onClick={handleDelete}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Delete Task
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Status Indicator */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex space-x-2">
          {previousStatus && (
            <button
              onClick={() => handleStatusUpdate(previousStatus)}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
              title={`Move to ${previousStatus}`}
            >
              ← {previousStatus}
            </button>
          )}
          {nextStatus && (
            <button
              onClick={() => handleStatusUpdate(nextStatus)}
              className="text-xs px-2 py-1 bg-primary-100 text-primary-600 rounded hover:bg-primary-200 transition-colors"
              title={`Move to ${nextStatus}`}
            >
              {nextStatus} →
            </button>
          )}
        </div>
      </div>

      {/* Overlay to close actions */}
      {showActions && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowActions(false)}
        />
      )}
    </div>
  );
};

export default TaskCard;
