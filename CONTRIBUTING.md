# Contributing to D.R.I.P

Thank you for your interest in contributing to D.R.I.P! This document provides guidelines for contributing to the project.

## 🤝 How to Contribute

### 1. Fork the Repository
- Click the "Fork" button on the top right of the repository page
- Clone your fork to your local machine:
  ```bash
  git clone https://github.com/yourusername/drip-marketplace.git
  cd drip-marketplace
  ```

### 2. Set Up Development Environment
```bash
# Install dependencies
npm install

# Set up environment variables
cp env.example .env.local

# Set up database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

### 3. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 4. Make Your Changes
- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly

### 5. Commit Your Changes
```bash
git add .
git commit -m "Add: your feature description"
```

### 6. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 📝 Code Style Guidelines

### TypeScript
- Use TypeScript for all new files
- Define proper interfaces for props and data structures
- Use meaningful variable and function names

### React Components
- Use functional components with hooks
- Keep components small and focused
- Use proper prop types and interfaces

### Styling
- Use Tailwind CSS classes
- Follow the existing color scheme
- Maintain responsive design

### File Structure
```
components/
  ├── ComponentName.tsx
  ├── ComponentName.module.css (if needed)
app/
  ├── page.tsx
  ├── layout.tsx
  └── api/
      └── route.ts
```

## 🐛 Reporting Issues

When reporting issues, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: How to reproduce the issue
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Browser, OS, Node.js version
6. **Screenshots**: If applicable

## ✨ Feature Requests

When suggesting new features:

1. **Use Case**: Describe the problem it solves
2. **Proposed Solution**: How you envision it working
3. **Alternatives**: Other solutions you've considered
4. **Additional Context**: Any other relevant information

## 🧪 Testing

Before submitting a PR:

1. **Test Locally**: Ensure the app runs without errors
2. **Test Features**: Verify your changes work as expected
3. **Test Responsiveness**: Check on different screen sizes
4. **Test MetaMask**: Ensure wallet integration works

## 📋 Pull Request Guidelines

### Before Submitting
- [ ] Code follows the project's style guidelines
- [ ] Self-review of your code
- [ ] Code is properly commented
- [ ] No console.log statements left in code
- [ ] All tests pass (if applicable)

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Tested with MetaMask
- [ ] Tested responsive design

## Screenshots (if applicable)
Add screenshots here

## Additional Notes
Any additional information
```

## 🏷️ Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements or additions to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `question`: Further information is requested

## 🎯 Development Focus Areas

### High Priority
- Security improvements
- Performance optimizations
- Mobile responsiveness
- MetaMask integration enhancements

### Medium Priority
- UI/UX improvements
- Additional content types
- Analytics features
- Admin dashboard enhancements

### Low Priority
- Code refactoring
- Documentation updates
- Minor bug fixes

## 📞 Getting Help

- **Discord**: Join our community server
- **GitHub Discussions**: Use the Discussions tab
- **Issues**: Create an issue for bugs or feature requests

## 🎉 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Given credit in the project

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to D.R.I.P! 🚀
