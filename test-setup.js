#!/usr/bin/env node

/**
 * Health Hub - Setup and Test Script
 * This script helps verify that all services are running correctly
 */

const http = require('http');
const https = require('https');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(url, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data,
          headers: res.headers
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function testService(name, url, expectedStatus = 200) {
  try {
    log(`\n🔍 Testing ${name}...`, 'cyan');
    const response = await makeRequest(url);
    
    if (response.status === expectedStatus) {
      log(`✅ ${name} is running correctly (${response.status})`, 'green');
      return true;
    } else {
      log(`⚠️  ${name} returned status ${response.status} (expected ${expectedStatus})`, 'yellow');
      return false;
    }
  } catch (error) {
    log(`❌ ${name} is not accessible: ${error.message}`, 'red');
    return false;
  }
}

async function runTests() {
  log('🏥 Health Hub - Service Health Check', 'bright');
  log('=====================================', 'bright');

  const services = [
    { name: 'Frontend (React)', url: 'http://localhost:5173', expectedStatus: 200 },
    { name: 'Backend API', url: 'http://localhost:5000', expectedStatus: 200 },
    { name: 'Backend Health Check', url: 'http://localhost:5000/health', expectedStatus: 200 },
    { name: 'ML Microservice', url: 'http://localhost:8000', expectedStatus: 200 },
    { name: 'ML Health Check', url: 'http://localhost:8000/health', expectedStatus: 200 }
  ];

  let passedTests = 0;
  const totalTests = services.length;

  for (const service of services) {
    const passed = await testService(service.name, service.url, service.expectedStatus);
    if (passed) passedTests++;
  }

  log('\n📊 Test Results Summary', 'bright');
  log('========================', 'bright');
  log(`Total Tests: ${totalTests}`, 'blue');
  log(`Passed: ${passedTests}`, 'green');
  log(`Failed: ${totalTests - passedTests}`, 'red');

  if (passedTests === totalTests) {
    log('\n🎉 All services are running correctly!', 'green');
    log('You can now access the Health Hub application at:', 'bright');
    log('🌐 Frontend: http://localhost:5173', 'cyan');
    log('🔧 Backend API: http://localhost:5000', 'cyan');
    log('🤖 ML Service: http://localhost:8000', 'cyan');
    log('📚 API Docs: http://localhost:8000/docs', 'cyan');
  } else {
    log('\n⚠️  Some services are not running. Please check the following:', 'yellow');
    log('1. Make sure Docker is running', 'yellow');
    log('2. Run: docker-compose up --build', 'yellow');
    log('3. Or start services manually:', 'yellow');
    log('   - Frontend: cd frontend && npm run dev', 'yellow');
    log('   - Backend: cd backend && npm start', 'yellow');
    log('   - ML Service: cd ml-microservice && uvicorn main:app --reload', 'yellow');
  }

  log('\n📝 Demo Credentials:', 'bright');
  log('Email: demo@health.com', 'blue');
  log('Password: password123', 'blue');
}

// Run the tests
runTests().catch(console.error);
