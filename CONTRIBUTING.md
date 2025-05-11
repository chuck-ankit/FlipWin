# Contributing to FlipWin

Thank you for your interest in contributing to FlipWin! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How Can I Contribute?

### Reporting Bugs

- Check if the bug has already been reported in the Issues section
- Use the bug report template when creating a new issue
- Include detailed steps to reproduce the bug
- Include screenshots if applicable
- Specify your environment (OS, browser, Node.js version, etc.)

### Suggesting Features

- Check if the feature has already been suggested in the Issues section
- Use the feature request template when creating a new issue
- Provide a clear and detailed description of the feature
- Explain why this feature would be useful to most users

### Pull Requests

1. Fork the repository
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Run tests and ensure they pass
5. Commit your changes with a clear commit message
6. Push to your fork
7. Create a Pull Request

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ankitkumar9864/FlipWin.git
   cd FlipWin
   ```

2. Install dependencies:
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both backend and frontend directories
   - Fill in the required environment variables

4. Start development servers:
   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend
   cd ../frontend
   npm run dev
   ```

### Code Style

- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Write tests for new features

### Commit Messages

- Use clear and descriptive commit messages
- Start with a verb (Add, Fix, Update, etc.)
- Keep the first line under 50 characters
- Add more detailed description if needed

Example:
```
Add user authentication middleware

- Implement JWT token validation
- Add user role checking
- Update API routes to use auth middleware
```

### Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Update tests when modifying existing features

### Documentation

- Update README.md if needed
- Add comments to complex code
- Update API documentation
- Document any new environment variables

## Getting Help

- Check the existing documentation
- Search through existing issues
- Join our community chat (if available)
- Contact the maintainers

## Review Process

1. All PRs will be reviewed by maintainers
2. You may be asked to make changes
3. Once approved, your PR will be merged

## License

By contributing to FlipWin, you agree that your contributions will be licensed under the project's MIT License. 