const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Task title is required'
      },
      len: {
        args: [1, 255],
        msg: 'Task title must be between 1 and 255 characters'
      }
    }
  },
  status: {
    type: DataTypes.ENUM('To Do', 'In Progress', 'Done'),
    allowNull: false,
    defaultValue: 'To Do',
    validate: {
      isIn: {
        args: [['To Do', 'In Progress', 'Done']],
        msg: 'Status must be one of: To Do, In Progress, Done'
      }
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'tasks',
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['status']
    },
    {
      fields: ['user_id', 'status']
    }
  ]
});

module.exports = Task;
