# 🚀 Vercel Deployment Guide for Health Hub

This guide will help you deploy your Health Hub frontend to Vercel and set up your backend services on alternative platforms.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Google Gemini API Key**: Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)

## 🎯 Deployment Strategy

Since Vercel is optimized for frontend deployments, we'll:
- **Frontend**: Deploy to Vercel (React + Vite)
- **Backend**: Deploy to Railway/Render/Heroku
- **ML Service**: Deploy to Railway/Render/Heroku
- **Database**: Use a cloud database service

## 🚀 Step 1: Deploy Frontend to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Connect your GitHub repository**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure the project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Set Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   VITE_ML_SERVICE_URL=https://your-ml-service-url.railway.app
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Deploy**: Click "Deploy" and wait for the build to complete.

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from frontend directory**:
   ```bash
   cd frontend
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Set environment variables when prompted

## 🗄️ Step 2: Deploy Backend Services

### Option A: Railway (Recommended)

1. **Sign up at [railway.app](https://railway.app)**
2. **Create new project from GitHub**
3. **Deploy Backend**:
   - Add service from your repository
   - Select `backend` directory
   - Set environment variables:
     ```
     PORT=5000
     DB_USERNAME=your_db_username
     DB_PASSWORD=your_db_password
     DB_NAME=your_db_name
     DB_HOST=your_db_host
     JWT_SECRET=your_secure_jwt_secret
     ```
   - Deploy

4. **Deploy ML Service**:
   - Add another service from your repository
   - Select `ml-microservice` directory
   - Set Python environment
   - Deploy

5. **Set up Database**:
   - Add MySQL service
   - Update backend environment variables with database credentials

### Option B: Render

1. **Sign up at [render.com](https://render.com)**
2. **Create Web Service** for backend:
   - Connect GitHub repository
   - Select `backend` directory
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Set environment variables

3. **Create Web Service** for ML service:
   - Connect GitHub repository
   - Select `ml-microservice` directory
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Option C: Heroku

1. **Install Heroku CLI**
2. **Create Heroku apps**:
   ```bash
   heroku create your-health-hub-backend
   heroku create your-health-hub-ml
   ```

3. **Deploy backend**:
   ```bash
   cd backend
   heroku git:remote -a your-health-hub-backend
   git push heroku main
   ```

4. **Deploy ML service**:
   ```bash
   cd ../ml-microservice
   heroku git:remote -a your-health-hub-ml
   git push heroku main
   ```

## 🗃️ Step 3: Set up Database

### Option A: Railway MySQL
- Add MySQL service in Railway
- Use connection details in backend environment variables

### Option B: PlanetScale (Recommended for production)
1. Sign up at [planetscale.com](https://planetscale.com)
2. Create database
3. Get connection string
4. Update backend environment variables

### Option C: Supabase
1. Sign up at [supabase.com](https://supabase.com)
2. Create new project
3. Use PostgreSQL connection details
4. Update backend to use PostgreSQL instead of MySQL

## 🔧 Step 4: Configure Environment Variables

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend-url.railway.app
VITE_ML_SERVICE_URL=https://your-ml-service-url.railway.app
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Backend (Railway/Render/Heroku)
```
PORT=5000
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_HOST=your_db_host
JWT_SECRET=your_secure_jwt_secret_here
```

### ML Service
```
GEMINI_API_KEY=your_gemini_api_key_here
```

## 🔄 Step 5: Update CORS Settings

Update your backend to allow requests from your Vercel domain:

```javascript
// In backend/server.js
const cors = require('cors');

app.use(cors({
  origin: [
    'https://your-app-name.vercel.app',
    'http://localhost:5173' // for development
  ],
  credentials: true
}));
```

## 📱 Step 6: Test Your Deployment

1. **Frontend**: Visit your Vercel URL
2. **Backend**: Test API endpoints
3. **ML Service**: Test image upload functionality
4. **Database**: Verify data persistence

## 🛠️ Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Node.js version compatibility
   - Ensure all dependencies are in package.json
   - Check build logs in Vercel dashboard

2. **CORS Errors**:
   - Update CORS settings in backend
   - Ensure frontend URL is whitelisted

3. **API Connection Issues**:
   - Verify environment variables are set correctly
   - Check if backend services are running
   - Test API endpoints directly

4. **Database Connection Issues**:
   - Verify database credentials
   - Check if database is accessible from your backend service
   - Ensure proper network configuration

## 📊 Monitoring and Maintenance

1. **Vercel Analytics**: Monitor frontend performance
2. **Railway/Render Logs**: Monitor backend services
3. **Database Monitoring**: Track database performance
4. **Error Tracking**: Set up error monitoring (Sentry, LogRocket)

## 🔐 Security Considerations

1. **Environment Variables**: Never commit sensitive data
2. **JWT Secrets**: Use strong, random secrets
3. **CORS**: Limit origins to your domains only
4. **Rate Limiting**: Implement API rate limiting
5. **HTTPS**: Ensure all services use HTTPS

## 🚀 Production Optimizations

1. **CDN**: Vercel provides automatic CDN
2. **Image Optimization**: Use Vercel's image optimization
3. **Caching**: Implement proper caching strategies
4. **Database Indexing**: Optimize database queries
5. **Monitoring**: Set up comprehensive monitoring

## 📞 Support

If you encounter issues:
1. Check the logs in your deployment platform
2. Verify environment variables
3. Test services individually
4. Check network connectivity between services

---

**Happy Deploying! 🎉**

Your Health Hub should now be live and accessible to users worldwide!
