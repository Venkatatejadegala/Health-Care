# 🔧 Health Hub - Troubleshooting Guide

## Common Issues and Solutions

### 🚨 **Dependency Installation Issues**

#### **Problem**: `npm install` fails or takes too long
**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# Reinstall dependencies
npm install
```

#### **Problem**: Permission errors on Windows
**Solutions**:
```bash
# Run PowerShell as Administrator
# Or use npm with --force flag
npm install --force
```

### 🐍 **Python/ML Service Issues**

#### **Problem**: Python not found or uvicorn not installed
**Solutions**:
```bash
# Install Python dependencies
cd ml-microservice
pip install -r requirements.txt

# If pip not found, try:
python -m pip install -r requirements.txt

# Or use pip3:
pip3 install -r requirements.txt
```

#### **Problem**: Port 8000 already in use
**Solutions**:
```bash
# Find process using port 8000
netstat -ano | findstr :8000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use a different port
uvicorn main:app --reload --port 8001
```

### 🌐 **Port Conflicts**

#### **Problem**: Ports already in use
**Common ports used by Health Hub**:
- Frontend: 5173
- Backend: 5000
- ML Service: 8000
- Database: 3306

**Solutions**:
```bash
# Check which ports are in use
netstat -ano | findstr :5173
netstat -ano | findstr :5000
netstat -ano | findstr :8000

# Kill processes using these ports
taskkill /PID <PID> /F
```

### 🔧 **Development Environment Issues**

#### **Problem**: Services not starting
**Solutions**:
1. **Check Node.js version**:
   ```bash
   node --version  # Should be 16+ or 18+
   npm --version
   ```

2. **Check Python version**:
   ```bash
   python --version  # Should be 3.8+
   ```

3. **Use the startup scripts**:
   ```bash
   # Windows PowerShell
   .\start-dev.ps1
   
   # Windows Command Prompt
   start-dev.bat
   ```

### 🐳 **Docker Issues**

#### **Problem**: Docker not working
**Solutions**:
```bash
# Check if Docker is running
docker --version
docker-compose --version

# Start Docker Desktop if not running
# Then run:
docker-compose up --build
```

### 📱 **Frontend Issues**

#### **Problem**: React app not loading
**Solutions**:
```bash
cd frontend
npm run dev

# If that fails, try:
npm run build
npm run preview
```

#### **Problem**: TypeScript errors
**Solutions**:
```bash
# Check TypeScript version
npx tsc --version

# Reinstall TypeScript
npm install typescript@latest
```

### 🔌 **Backend Issues**

#### **Problem**: Backend API not responding
**Solutions**:
```bash
cd backend
npm start

# Check if server is running
curl http://localhost:5000/health
```

#### **Problem**: Database connection issues
**Solutions**:
```bash
# Check if MySQL is running
# Start MySQL service or use Docker
docker-compose up mysql_db
```

### 🤖 **ML Service Issues**

#### **Problem**: ML service not starting
**Solutions**:
```bash
cd ml-microservice
python -m uvicorn main:app --reload --port 8000

# If Python not found, try:
python3 -m uvicorn main:app --reload --port 8000
```

### 🔑 **Authentication Issues**

#### **Problem**: Login not working
**Solutions**:
1. **Use demo credentials**:
   - Email: `demo@health.com`
   - Password: `password123`

2. **Check browser console** for errors
3. **Clear browser cache** and cookies

### 🌍 **Environment Variables**

#### **Problem**: Missing environment variables
**Solutions**:
1. **Create .env files** in respective directories
2. **Backend .env**:
   ```
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   DB_HOST=localhost
   DB_USERNAME=root
   DB_PASSWORD=root_password
   DB_NAME=health_tracker_dev
   ```

3. **Frontend .env**:
   ```
   VITE_API_URL=http://localhost:5000
   VITE_ML_SERVICE_URL=http://localhost:8000
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

### 🚀 **Quick Fixes**

#### **Complete Reset**:
```bash
# Stop all services
# Delete node_modules in all directories
Remove-Item -Recurse -Force frontend/node_modules
Remove-Item -Recurse -Force backend/node_modules

# Reinstall everything
cd frontend && npm install
cd ../backend && npm install
cd ../ml-microservice && pip install -r requirements.txt
```

#### **Alternative Startup**:
```bash
# Start services individually in separate terminals
# Terminal 1: Backend
cd backend && npm start

# Terminal 2: ML Service  
cd ml-microservice && python -m uvicorn main:app --reload

# Terminal 3: Frontend
cd frontend && npm run dev
```

### 📞 **Getting Help**

If you're still having issues:

1. **Check the logs** in each service terminal
2. **Verify all dependencies** are installed
3. **Check port availability**
4. **Try the startup scripts** provided
5. **Use Docker** as an alternative: `docker-compose up --build`

### 🎯 **Success Indicators**

You'll know everything is working when:
- ✅ Frontend loads at http://localhost:5173
- ✅ Backend responds at http://localhost:5000/health
- ✅ ML service responds at http://localhost:8000/health
- ✅ You can login with demo credentials
- ✅ Dashboard loads with health metrics

---

**Remember**: If one service fails, the others can still work. Start with the backend, then ML service, then frontend for best results.
