const { body, param } = require('express-validator');

// User validation rules
const validateSignup = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Task validation rules
const validateCreateTask = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Task title is required')
    .isLength({ min: 1, max: 255 })
    .withMessage('Task title must be between 1 and 255 characters'),
  
  body('status')
    .optional()
    .isIn(['To Do', 'In Progress', 'Done'])
    .withMessage('Status must be one of: To Do, In Progress, Done')
];

const validateUpdateTask = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Task ID must be a positive integer'),
  
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Task title cannot be empty')
    .isLength({ min: 1, max: 255 })
    .withMessage('Task title must be between 1 and 255 characters'),
  
  body('status')
    .optional()
    .isIn(['To Do', 'In Progress', 'Done'])
    .withMessage('Status must be one of: To Do, In Progress, Done')
];

const validateTaskId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Task ID must be a positive integer')
];

module.exports = {
  validateSignup,
  validateLogin,
  validateCreateTask,
  validateUpdateTask,
  validateTaskId
};
