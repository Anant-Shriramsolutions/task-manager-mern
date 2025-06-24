const { sequelize } = require('../config/database');
const { User, Task } = require('../models');

const initDatabase = async () => {
  try {
    console.log('🔄 Initializing database...');
    
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Sync all models
    await sequelize.sync({ force: false, alter: false });
    console.log('✅ Database models synchronized successfully.');
    
    // Check if tables exist and show their structure
    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log('📊 Available tables:', tables);
    
    // Show model associations
    console.log('🔗 Model associations:');
    console.log('- User hasMany Tasks');
    console.log('- Task belongsTo User');
    
    console.log('🎉 Database initialization completed successfully!');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

// Run if called directly
if (require.main === module) {
  initDatabase()
    .then(() => {
      console.log('Database initialization script completed.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database initialization script failed:', error);
      process.exit(1);
    });
}

module.exports = { initDatabase };
