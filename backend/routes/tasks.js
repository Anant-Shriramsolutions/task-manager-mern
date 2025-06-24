const express = require('express');
const router = express.Router();
const { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask, 
  getTaskById 
} = require('../controllers/taskController');
const { 
  validateCreateTask, 
  validateUpdateTask, 
  validateTaskId 
} = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// @route   GET /api/tasks
// @desc    Get all tasks for authenticated user
// @access  Private
router.get('/', getTasks);

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', validateCreateTask, createTask);

// @route   GET /api/tasks/:id
// @desc    Get task by ID
// @access  Private
router.get('/:id', validateTaskId, getTaskById);

// @route   PUT /api/tasks/:id
// @desc    Update task by ID
// @access  Private
router.put('/:id', validateUpdateTask, updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete task by ID
// @access  Private
router.delete('/:id', validateTaskId, deleteTask);

module.exports = router;
