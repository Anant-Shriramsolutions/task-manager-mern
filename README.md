# Task Manager - MERN Stack with SQL

A full-stack Task Manager web application built with the MERN stack (MongoDB replaced with MySQL/PostgreSQL) featuring user authentication and task management with status tracking.

## 🚀 Features

- **User Authentication**: Sign up and login with JWT tokens
- **Password Security**: Bcrypt password hashing
- **Task Management**: Create, read, update tasks
- **Status Tracking**: Organize tasks by status (To Do, In Progress, Done)
- **Responsive Design**: Mobile-friendly UI with TailwindCSS
- **RESTful API**: Clean API endpoints for all operations

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library with functional components and hooks
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **TailwindCSS** - Utility-first CSS framework
- **React Hook Form** - Form handling and validation
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation and sanitization

### Database
- **SQLite** - Lightweight relational database (for development)
- **MySQL/PostgreSQL** - Production database options
- **Sequelize** - Promise-based ORM for Node.js

## 📁 Project Structure

```
task-manager-mern/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- SQLite (included with Node.js) for development
- MySQL or PostgreSQL for production (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager-mern
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm run install-all
   ```

3. **Environment Configuration**
   ```bash
   cd backend
   cp .env.example .env
   # The app uses SQLite by default for development
   # Edit .env to customize JWT secret and other settings
   ```

4. **Database Setup (Automatic)**
   ```bash
   # The SQLite database will be created automatically
   # Optionally seed with sample data:
   cd backend
   npm run db:seed
   ```

5. **Start the application**
   ```bash
   # From root directory
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:5000
   - Frontend development server on http://localhost:3000

## 🧪 Testing the Application

### Sample Login Credentials
After running `npm run db:seed` in the backend directory, you can use these credentials:
- **Email**: john@example.com | **Password**: password123
- **Email**: jane@example.com | **Password**: password123

### Manual Testing Steps
1. **Authentication Flow**:
   - Visit http://localhost:3000
   - Try signing up with a new account
   - Login with sample credentials
   - Verify JWT token persistence (refresh page)

2. **Task Management**:
   - Create new tasks with different statuses
   - Move tasks between columns (To Do → In Progress → Done)
   - Delete tasks
   - Verify real-time updates

3. **API Testing**:
   ```bash
   # Test health endpoint
   curl http://localhost:5000/api/health

   # Test authentication (replace with actual token)
   curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/api/tasks
   ```

## 🔗 API Endpoints

### Authentication
- `POST /api/signup` - User registration
- `POST /api/login` - User login

### Tasks
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task status

## 📊 Database Schema

### Users Table
```sql
- id (Primary Key)
- name (String)
- email (String, Unique)
- password (String, Hashed)
- createdAt (Timestamp)
- updatedAt (Timestamp)
```

### Tasks Table
```sql
- id (Primary Key)
- title (String)
- status (Enum: 'To Do', 'In Progress', 'Done')
- user_id (Foreign Key)
- createdAt (Timestamp)
- updatedAt (Timestamp)
```

## 🎯 Task Status Flow

```
To Do → In Progress → Done
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Backend (Render/Railway)
1. Create account on Render or Railway
2. Connect your GitHub repository
3. Set environment variables
4. Deploy backend service

### Frontend (Vercel/Netlify)
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `dist` folder to Vercel or Netlify

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name - [Your Email]

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
