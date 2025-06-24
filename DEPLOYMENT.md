# Deployment Guide

This guide covers deploying the Task Manager MERN application to various platforms.

## 🚀 Quick Deployment Options

### Option 1: Render (Recommended for Full-Stack)

#### Backend Deployment on Render
1. **Create a Render account** at [render.com](https://render.com)
2. **Connect your GitHub repository**
3. **Create a new Web Service**:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment: Node
   - Root Directory: Leave empty

4. **Set Environment Variables**:
   ```
   NODE_ENV=production
   JWT_SECRET=your_production_jwt_secret_here
   DB_PATH=/opt/render/project/src/backend/database.sqlite
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```

5. **For Production Database** (Optional):
   - Add PostgreSQL database service on Render
   - Update environment variables:
   ```
   DB_HOST=your-postgres-host
   DB_PORT=5432
   DB_NAME=your-database-name
   DB_USER=your-username
   DB_PASSWORD=your-password
   ```
   - Update `backend/config/database.js` to use PostgreSQL in production

#### Frontend Deployment on Vercel
1. **Create a Vercel account** at [vercel.com](https://vercel.com)
2. **Import your GitHub repository**
3. **Configure build settings**:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Set Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

5. **Update frontend API calls** to use environment variable:
   ```javascript
   // In frontend/src/context/AuthContext.jsx and other API calls
   const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
   ```

### Option 2: Railway (Alternative)

#### Backend on Railway
1. **Create Railway account** at [railway.app](https://railway.app)
2. **Deploy from GitHub**
3. **Configure**:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Add PostgreSQL database** from Railway marketplace
5. **Set environment variables** similar to Render

### Option 3: Heroku (Traditional)

#### Backend on Heroku
1. **Install Heroku CLI**
2. **Create Heroku app**:
   ```bash
   heroku create your-app-name-backend
   ```

3. **Add PostgreSQL addon**:
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

4. **Set environment variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your_secret
   ```

5. **Create Procfile** in backend directory:
   ```
   web: npm start
   ```

6. **Deploy**:
   ```bash
   git subtree push --prefix backend heroku main
   ```

## 🔧 Production Configuration

### Backend Production Setup

1. **Update database configuration** for production:
   ```javascript
   // backend/config/database.js
   const sequelize = new Sequelize(
     process.env.NODE_ENV === 'production' 
       ? process.env.DATABASE_URL || {
           dialect: 'postgres',
           host: process.env.DB_HOST,
           port: process.env.DB_PORT,
           database: process.env.DB_NAME,
           username: process.env.DB_USER,
           password: process.env.DB_PASSWORD,
           dialectOptions: {
             ssl: {
               require: true,
               rejectUnauthorized: false
             }
           }
         }
       : {
           dialect: 'sqlite',
           storage: process.env.DB_PATH || './database.sqlite'
         }
   );
   ```

2. **Add production dependencies**:
   ```bash
   cd backend
   npm install pg pg-hstore  # For PostgreSQL
   ```

### Frontend Production Setup

1. **Update API configuration**:
   ```javascript
   // frontend/src/utils/api.js
   const API_BASE_URL = import.meta.env.VITE_API_URL || 
     (import.meta.env.PROD ? 'https://your-backend.onrender.com/api' : '/api');
   
   export default API_BASE_URL;
   ```

2. **Update axios configuration**:
   ```javascript
   // frontend/src/context/AuthContext.jsx
   import API_BASE_URL from '../utils/api';
   
   // Replace '/api' with API_BASE_URL in all axios calls
   const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
   ```

## 🔒 Security Considerations

### Environment Variables
- Never commit `.env` files to version control
- Use strong, unique JWT secrets in production
- Enable HTTPS in production
- Set secure CORS origins

### Database Security
- Use connection pooling
- Enable SSL for database connections
- Regular backups
- Monitor for unusual activity

## 📊 Monitoring and Maintenance

### Health Checks
- Set up monitoring for `/api/health` endpoint
- Configure alerts for downtime
- Monitor database performance

### Logging
- Implement structured logging
- Use services like LogRocket or Sentry for error tracking
- Monitor API response times

## 🚀 CI/CD Pipeline (Optional)

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to Render
      # Add deployment steps
```

## 📝 Post-Deployment Checklist

- [ ] Backend health check responds correctly
- [ ] Frontend loads and connects to backend
- [ ] User registration works
- [ ] User login works
- [ ] Task CRUD operations work
- [ ] JWT tokens persist across sessions
- [ ] Database migrations run successfully
- [ ] Environment variables are set correctly
- [ ] HTTPS is enabled
- [ ] CORS is configured properly

## 🆘 Troubleshooting

### Common Issues
1. **CORS errors**: Check CLIENT_URL environment variable
2. **Database connection fails**: Verify database credentials
3. **JWT errors**: Ensure JWT_SECRET is set
4. **Build failures**: Check Node.js version compatibility
5. **API not found**: Verify API_URL configuration in frontend

### Debug Commands
```bash
# Check backend logs
heroku logs --tail -a your-app-name

# Test API endpoints
curl https://your-backend-url.com/api/health

# Check environment variables
heroku config -a your-app-name
```
