const { sequelize } = require('../config/database');
const { User, Task } = require('../models');

const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding database with sample data...');
    
    // Create sample users
    const users = await User.bulkCreate([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123'
      }
    ], {
      individualHooks: true // This ensures password hashing hooks run
    });
    
    console.log(`✅ Created ${users.length} sample users`);
    
    // Create sample tasks for the first user
    const sampleTasks = [
      {
        title: 'Complete project documentation',
        status: 'To Do',
        user_id: users[0].id
      },
      {
        title: 'Review code changes',
        status: 'In Progress',
        user_id: users[0].id
      },
      {
        title: 'Deploy to production',
        status: 'Done',
        user_id: users[0].id
      },
      {
        title: 'Update user interface',
        status: 'To Do',
        user_id: users[0].id
      },
      {
        title: 'Write unit tests',
        status: 'In Progress',
        user_id: users[0].id
      }
    ];
    
    const tasks = await Task.bulkCreate(sampleTasks);
    console.log(`✅ Created ${tasks.length} sample tasks`);
    
    // Create some tasks for the second user
    const moreTasks = [
      {
        title: 'Design new landing page',
        status: 'To Do',
        user_id: users[1].id
      },
      {
        title: 'Optimize database queries',
        status: 'In Progress',
        user_id: users[1].id
      }
    ];
    
    const additionalTasks = await Task.bulkCreate(moreTasks);
    console.log(`✅ Created ${additionalTasks.length} additional tasks`);
    
    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📝 Sample login credentials:');
    console.log('Email: john@example.com | Password: password123');
    console.log('Email: jane@example.com | Password: password123');
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  }
};

// Run if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Database seeding script completed.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database seeding script failed:', error);
      process.exit(1);
    });
}

module.exports = { seedDatabase };
