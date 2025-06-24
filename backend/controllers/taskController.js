const { validationResult } = require('express-validator');
const { Task } = require('../models');

// Get all tasks for the authenticated user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { user_id: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    // Group tasks by status
    const groupedTasks = {
      'To Do': [],
      'In Progress': [],
      'Done': []
    };

    tasks.forEach(task => {
      groupedTasks[task.status].push(task);
    });

    res.json({
      message: 'Tasks retrieved successfully',
      tasks: groupedTasks,
      totalTasks: tasks.length
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, status = 'To Do' } = req.body;

    const task = await Task.create({
      title,
      status,
      user_id: req.user.id
    });

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    console.error('Create task error:', error);
    
    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors.map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }

    res.status(500).json({
      message: 'Internal server error'
    });
  }
};

// Update task status
const updateTask = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { status, title } = req.body;

    // Find task by ID and user
    const task = await Task.findOne({
      where: {
        id,
        user_id: req.user.id
      }
    });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    // Update task
    const updateData = {};
    if (status) updateData.status = status;
    if (title) updateData.title = title;

    await task.update(updateData);

    res.json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    console.error('Update task error:', error);
    
    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors.map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }

    res.status(500).json({
      message: 'Internal server error'
    });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Find task by ID and user
    const task = await Task.findOne({
      where: {
        id,
        user_id: req.user.id
      }
    });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    await task.destroy();

    res.json({
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
};

// Get task by ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: {
        id,
        user_id: req.user.id
      }
    });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    res.json({
      message: 'Task retrieved successfully',
      task
    });
  } catch (error) {
    console.error('Get task by ID error:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById
};
