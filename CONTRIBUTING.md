# Contributing to Health Hub

Thank you for your interest in contributing to Health Hub! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Docker and Docker Compose
- Git
- Basic knowledge of React, TypeScript, and Node.js

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/health-hub.git
   cd health-hub
   ```

2. **Install Dependencies**
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. **Start Development Environment**
   ```bash
   docker-compose up --build
   ```

## 📋 How to Contribute

### Reporting Bugs
- Use the GitHub issue tracker
- Include detailed reproduction steps
- Provide system information (OS, browser, etc.)
- Include screenshots if applicable

### Suggesting Features
- Check existing issues first
- Provide clear use cases and benefits
- Include mockups or examples if possible

### Code Contributions

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow the coding standards
   - Write tests for new features
   - Update documentation

3. **Test Your Changes**
   ```bash
   npm run test
   npm run lint
   ```

4. **Commit Changes**
   ```bash
   git commit -m "feat: add new health tracking feature"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🎨 Coding Standards

### TypeScript/React
- Use TypeScript for all new code
- Follow React best practices
- Use functional components with hooks
- Implement proper error handling

### Styling
- Use Tailwind CSS for styling
- Follow the existing design system
- Ensure responsive design
- Use consistent spacing and colors

### Code Style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Follow the existing code structure

### Git Commit Messages
Use conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for formatting
- `refactor:` for code refactoring
- `test:` for tests
- `chore:` for maintenance

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run test
npm run test:coverage
```

### Backend Testing
```bash
cd backend
npm test
```

### E2E Testing
```bash
npm run test:e2e
```

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for functions
- Document complex algorithms
- Include examples in comments

### README Updates
- Update README.md for new features
- Include setup instructions
- Add screenshots for UI changes

## 🔍 Code Review Process

1. **Automated Checks**
   - All tests must pass
   - Code must pass linting
   - Build must succeed

2. **Manual Review**
   - Code quality and style
   - Security considerations
   - Performance implications
   - Documentation completeness

3. **Approval**
   - At least one maintainer approval required
   - Address all review comments
   - Ensure CI/CD passes

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment**
   - OS and version
   - Browser and version
   - Node.js version

2. **Steps to Reproduce**
   - Clear, numbered steps
   - Expected vs actual behavior
   - Screenshots or videos

3. **Additional Context**
   - Error messages
   - Console logs
   - Related issues

## 💡 Feature Requests

When suggesting features:

1. **Problem Statement**
   - What problem does this solve?
   - Who would benefit from this?

2. **Proposed Solution**
   - How should it work?
   - Any design considerations?

3. **Alternatives**
   - Other ways to solve this?
   - Why this approach?

## 🏷️ Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `priority: high`: High priority issue
- `priority: low`: Low priority issue

## 📞 Getting Help

- **GitHub Discussions**: For questions and general discussion
- **GitHub Issues**: For bug reports and feature requests
- **Discord**: Join our community server
- **Email**: dev@healthhub.com

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Health Hub! 🎉
