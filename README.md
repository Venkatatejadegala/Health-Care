# 🏥 Health Hub - Comprehensive Health Management Platform

<div align="center">

![Health Hub Logo](https://img.shields.io/badge/Health%20Hub-🏥-blue?style=for-the-badge&logo=health&logoColor=white)

**A modern, AI-powered health management platform built with cutting-edge technologies**

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-FastAPI-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=flat-square&logo=docker&logoColor=white)](https://docker.com/)
[![AI](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)

[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

</div>

## 🌟 Overview

Health Hub is a comprehensive health management platform that combines modern web technologies with AI-powered insights to help users track, analyze, and improve their health and wellness. The platform features a beautiful, responsive interface with real-time health metrics, goal tracking, AI recommendations, and advanced analytics.

## ✨ Key Features

### 🎯 **Core Functionality**
- **User Authentication & Profiles** - Secure login/signup with JWT tokens
- **Health Dashboard** - Comprehensive overview of health metrics and progress
- **Goal Tracking** - Set and monitor personal health goals with progress visualization
- **Nutrition Tracking** - AI-powered food analysis and nutritional insights
- **Activity Monitoring** - Track daily activities, steps, calories, and sleep
- **Health Insights** - AI-generated personalized recommendations and insights

### 🤖 **AI-Powered Features**
- **Google Gemini Integration** - Advanced AI for food analysis and health recommendations
- **Smart Recommendations** - Personalized health tips based on user profile
- **Food Recognition** - Upload images to get instant nutritional analysis
- **Health Insights** - AI-driven insights and trend analysis

### 🎨 **Modern UI/UX**
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations** - Framer Motion powered animations and transitions
- **Dark/Light Theme** - Customizable theme system
- **Interactive Components** - Engaging user interface with real-time updates
- **Toast Notifications** - User-friendly feedback system

### 📊 **Analytics & Visualization**
- **Real-time Metrics** - Live health data tracking and visualization
- **Progress Charts** - Beautiful charts showing health trends over time
- **Goal Progress** - Visual progress bars and completion tracking
- **Health Trends** - Historical data analysis and trend identification

## 🏗️ Architecture

### **Frontend (React + TypeScript)**
- **Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom components
- **Animations**: Framer Motion for smooth animations
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast

### **Backend (Node.js + Express)**
- **Runtime**: Node.js with Express.js
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT tokens with bcrypt password hashing
- **API**: RESTful API design
- **Security**: CORS enabled, input validation

### **ML Microservice (Python + FastAPI)**
- **Framework**: FastAPI for high-performance API
- **AI Integration**: Google Gemini AI for advanced analysis
- **Image Processing**: Food recognition and analysis
- **Scalability**: Microservice architecture for independent scaling

### **Infrastructure**
- **Containerization**: Docker and Docker Compose
- **Database**: MySQL 8.0 with persistent storage
- **Development**: Hot reloading and development tools
- **Production Ready**: Optimized builds and configurations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Docker and Docker Compose
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/health-hub.git
   cd health-hub
   ```

2. **Start with Docker Compose (Recommended)**
   ```bash
   docker-compose up --build
   ```

3. **Or run locally**
   ```bash
   # Install dependencies
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   cd ../ml-microservice && pip install -r requirements.txt
   
   # Start services
   # Terminal 1: Backend
   cd backend && npm start
   
   # Terminal 2: Frontend
   cd frontend && npm run dev
   
   # Terminal 3: ML Service
   cd ml-microservice && uvicorn main:app --reload --port 8000
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - ML Service: http://localhost:8000
   - Database: localhost:3306

### Demo Credentials
```
Email: demo@health.com
Password: password123
```

## 📱 Features in Detail

### 🏠 **Dashboard**
- **Health Metrics Card**: Real-time tracking of steps, calories, water intake, and sleep
- **Goal Tracker**: Set and monitor personal health goals with progress visualization
- **AI Recommendations**: Personalized health tips powered by Google Gemini AI
- **Health Insights**: AI-driven insights and trend analysis
- **Recent Activity**: Timeline of health activities and achievements
- **Nutrition Tracker**: Food logging and nutritional analysis

### 🎯 **Goal Management**
- Create custom health goals (fitness, nutrition, wellness, lifestyle)
- Set target values and deadlines
- Track progress with visual indicators
- Priority-based goal organization
- Achievement celebrations and milestones

### 🤖 **AI Features**
- **Food Analysis**: Upload food images for instant nutritional analysis
- **Health Recommendations**: Personalized suggestions based on user profile
- **Smart Insights**: AI-powered health trend analysis
- **Nutritional Guidance**: Detailed food information and recommendations

### 📊 **Analytics**
- **Real-time Metrics**: Live health data visualization
- **Progress Tracking**: Historical data and trend analysis
- **Goal Progress**: Visual progress bars and completion rates
- **Health Trends**: Pattern recognition and insights

## 🛠️ Development

### Project Structure
```
health-hub/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   └── lib/           # Utility functions
│   ├── public/            # Static assets
│   └── package.json
├── backend/                # Node.js + Express backend
│   ├── routes/            # API routes
│   ├── models/            # Database models
│   ├── config/            # Configuration files
│   └── server.js          # Main server file
├── ml-microservice/        # Python + FastAPI ML service
│   ├── main.py            # FastAPI application
│   └── requirements.txt   # Python dependencies
├── docker-compose.yml     # Docker configuration
└── README.md
```

### Available Scripts

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

**Backend:**
```bash
npm start            # Start server with nodemon
npm test             # Run tests
```

**ML Service:**
```bash
uvicorn main:app --reload    # Start development server
uvicorn main:app --host 0.0.0.0 --port 8000  # Production server
```

### Environment Variables

Create `.env` files in the respective directories:

**Backend (.env):**
```env
PORT=5000
DB_USERNAME=root
DB_PASSWORD=root_password
DB_NAME=health_tracker_dev
DB_HOST=localhost
JWT_SECRET=your_jwt_secret_key
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000
VITE_ML_SERVICE_URL=http://localhost:8000
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## 🔧 Configuration

### Google Gemini AI Setup
1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add the key to your frontend `.env` file
3. The AI features will be automatically enabled

### Database Configuration
The application uses MySQL with the following default configuration:
- Host: localhost
- Port: 3306
- Database: health_tracker_dev
- Username: root
- Password: root_password

## 🚀 Deployment

### Docker Deployment
```bash
# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment
1. **Frontend**: Build and deploy to your preferred hosting service (Vercel, Netlify, etc.)
2. **Backend**: Deploy to cloud services (AWS, Google Cloud, Heroku, etc.)
3. **Database**: Use managed database services (AWS RDS, Google Cloud SQL, etc.)
4. **ML Service**: Deploy to container services (AWS ECS, Google Cloud Run, etc.)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful AI capabilities
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **FastAPI** for the high-performance Python framework
- **Docker** for containerization

## 📞 Support

- **Documentation**: [Wiki](https://github.com/yourusername/health-hub/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/health-hub/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/health-hub/discussions)
- **Email**: support@healthhub.com

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/health-hub&type=Date)](https://star-history.com/#yourusername/health-hub&Date)

---

<div align="center">

**Made with ❤️ by the Health Hub Team**

[⭐ Star this repo](https://github.com/yourusername/health-hub) | [🐛 Report Bug](https://github.com/yourusername/health-hub/issues) | [💡 Request Feature](https://github.com/yourusername/health-hub/issues)

</div>
#   U p d a t e d   b y   V e n k a t a t e j a d e g a l a  
 