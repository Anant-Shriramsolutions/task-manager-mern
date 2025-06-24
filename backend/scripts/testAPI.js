const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

const testTask = {
  title: 'Test Task from API',
  status: 'To Do'
};

let authToken = '';

// Helper function to make authenticated requests
const authenticatedRequest = (method, url, data = null) => {
  const config = {
    method,
    url: `${BASE_URL}${url}`,
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : {}
  };
  
  if (data) {
    config.data = data;
  }
  
  return axios(config);
};

// Test functions
const testHealthEndpoint = async () => {
  console.log('\n🔍 Testing Health Endpoint...');
  try {
    const response = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check passed:', response.data.message);
    return true;
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return false;
  }
};

const testUserSignup = async () => {
  console.log('\n🔍 Testing User Signup...');
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, testUser);
    authToken = response.data.token;
    console.log('✅ User signup successful:', response.data.user.email);
    return true;
  } catch (error) {
    console.error('❌ User signup failed:', error.response?.data?.message || error.message);
    return false;
  }
};

const testUserLogin = async () => {
  console.log('\n🔍 Testing User Login...');
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'john@example.com',
      password: 'password123'
    });
    authToken = response.data.token;
    console.log('✅ User login successful:', response.data.user.email);
    return true;
  } catch (error) {
    console.error('❌ User login failed:', error.response?.data?.message || error.message);
    return false;
  }
};

const testGetProfile = async () => {
  console.log('\n🔍 Testing Get Profile...');
  try {
    const response = await authenticatedRequest('get', '/auth/profile');
    console.log('✅ Profile retrieved:', response.data.user.email);
    return true;
  } catch (error) {
    console.error('❌ Get profile failed:', error.response?.data?.message || error.message);
    return false;
  }
};

const testCreateTask = async () => {
  console.log('\n🔍 Testing Create Task...');
  try {
    const response = await authenticatedRequest('post', '/tasks', testTask);
    console.log('✅ Task created:', response.data.task.title);
    return response.data.task.id;
  } catch (error) {
    console.error('❌ Create task failed:', error.response?.data?.message || error.message);
    return null;
  }
};

const testGetTasks = async () => {
  console.log('\n🔍 Testing Get Tasks...');
  try {
    const response = await authenticatedRequest('get', '/tasks');
    const totalTasks = response.data.totalTasks;
    console.log(`✅ Tasks retrieved: ${totalTasks} total tasks`);
    console.log('   - To Do:', response.data.tasks['To Do'].length);
    console.log('   - In Progress:', response.data.tasks['In Progress'].length);
    console.log('   - Done:', response.data.tasks['Done'].length);
    return true;
  } catch (error) {
    console.error('❌ Get tasks failed:', error.response?.data?.message || error.message);
    return false;
  }
};

const testUpdateTask = async (taskId) => {
  if (!taskId) return false;
  
  console.log('\n🔍 Testing Update Task...');
  try {
    const response = await authenticatedRequest('put', `/tasks/${taskId}`, {
      status: 'In Progress'
    });
    console.log('✅ Task updated:', response.data.task.status);
    return true;
  } catch (error) {
    console.error('❌ Update task failed:', error.response?.data?.message || error.message);
    return false;
  }
};

const testDeleteTask = async (taskId) => {
  if (!taskId) return false;
  
  console.log('\n🔍 Testing Delete Task...');
  try {
    await authenticatedRequest('delete', `/tasks/${taskId}`);
    console.log('✅ Task deleted successfully');
    return true;
  } catch (error) {
    console.error('❌ Delete task failed:', error.response?.data?.message || error.message);
    return false;
  }
};

// Main test runner
const runTests = async () => {
  console.log('🚀 Starting API Tests...\n');
  
  const results = [];
  
  // Test health endpoint
  results.push(await testHealthEndpoint());
  
  // Test authentication flow
  results.push(await testUserLogin());
  results.push(await testGetProfile());
  
  // Test task CRUD operations
  const taskId = await testCreateTask();
  results.push(taskId !== null);
  results.push(await testGetTasks());
  results.push(await testUpdateTask(taskId));
  results.push(await testDeleteTask(taskId));
  
  // Summary
  const passed = results.filter(Boolean).length;
  const total = results.length;
  
  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}/${total}`);
  console.log(`❌ Failed: ${total - passed}/${total}`);
  
  if (passed === total) {
    console.log('\n🎉 All tests passed! API is working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Check the output above for details.');
  }
};

// Run tests if called directly
if (require.main === module) {
  runTests()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('Test runner failed:', error);
      process.exit(1);
    });
}

module.exports = { runTests };
