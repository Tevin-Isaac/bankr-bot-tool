# 🤝 Contributing to Create Bankr App

Thank you for your interest in contributing to Create Bankr App! This guide will help you get started with contributing to this project.

## 🚀 Getting Started

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn package manager
- Git
- Basic knowledge of JavaScript/TypeScript
- Familiarity with CLI tools

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/create-bankr-app.git
   cd create-bankr-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Link for Local Testing**
   ```bash
   npm link
   ```

4. **Test Your Setup**
   ```bash
   create-bankr-app test-project
   ```

## 🏗️ Project Structure

```
create-bankr-app/
├── bin/
│   └── index.js              # Main CLI entry point
├── templates/                 # Application templates
│   ├── trading-bot/          # Trading bot template
│   ├── token-launcher/       # Token launcher template
│   ├── portfolio-tracker/    # Portfolio tracker template
│   ├── arbitrage-bot/        # Arbitrage bot template
│   └── defi-yield-farm/      # DeFi yield farm template
├── babank/                    # Example generated project
├── trials/                    # Test projects directory
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

## 📝 How to Contribute

### 1. Reporting Issues

- Use the [GitHub Issues](https://github.com/bankr-bot/create-bankr-app/issues) page
- Provide clear, descriptive titles
- Include steps to reproduce
- Add relevant error messages and screenshots
- Specify your OS and Node.js version

### 2. Adding New Features

#### Feature Request Process
1. Check existing issues for similar requests
2. Create a new issue with the "enhancement" label
3. Describe the feature and its use case
4. Wait for maintainer approval before starting

#### Implementation Steps
1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Implement your changes
3. Add tests if applicable
4. Update documentation
5. Submit a pull request

### 3. Adding New Templates

We welcome new application templates! Here's how to add one:

#### Step 1: Create Template Directory
```bash
mkdir templates/your-new-template
```

#### Step 2: Add Template Files
Your template should include:
- `README.md` - Template-specific documentation
- `src/` - Source code files
- `package.json` - Template dependencies
- `.env.example` - Environment variables template
- `tsconfig.json` - TypeScript configuration (if applicable)

#### Step 3: Update CLI Configuration
Edit `bin/index.js` to add your template to the choices array:

```javascript
{
  name: '🔥 Your Template - Brief description',
  value: 'your-template'
}
```

#### Step 4: Add Template-Specific Features
Update the features section in `bin/index.js`:

```javascript
if (answers.template === 'your-template') {
  return [
    ...baseFeatures,
    { name: '🔥 Your Feature', value: 'your-feature', checked: true }
  ];
}
```

#### Step 5: Update Documentation
- Add your template to the main README.md
- Include use cases and features
- Add setup instructions

### 4. Improving Existing Templates

#### Code Quality
- Follow existing code style
- Add proper error handling
- Include helpful comments
- Ensure TypeScript compatibility

#### Documentation
- Update README files
- Add code examples
- Include troubleshooting sections
- Document configuration options

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Testing CLI Functionality
```bash
# Test different templates
create-bankr-app test-trading-bot
create-bankr-app test-token-launcher

# Test with different options
echo -e "test-project\ntrading-bot\nbase\nenv-config\ntesting\ny\ny" | create-bankr-app
```

### Testing Generated Projects
```bash
cd test-project
npm install
npm test
npm run dev
```

## 📋 Code Style Guidelines

### JavaScript/TypeScript
- Use ES6+ features
- Prefer `const` over `let`
- Use arrow functions for callbacks
- Include JSDoc comments for functions
- Follow existing naming conventions

### File Organization
- Keep files focused and small
- Use descriptive file names
- Group related functionality
- Maintain consistent directory structure

### Error Handling
- Always include try-catch blocks
- Provide meaningful error messages
- Include recovery suggestions
- Log errors appropriately

## 🔄 Pull Request Process

### Before Submitting
1. **Test thoroughly**: Ensure your changes work as expected
2. **Update documentation**: Include relevant docs updates
3. **Check formatting**: Follow existing code style
4. **Run tests**: Ensure all tests pass

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Template addition

## Testing
- [ ] Tested manually
- [ ] Added automated tests
- [ ] Tested generated projects

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

### Review Process
1. Automated checks must pass
2. At least one maintainer review required
3. All feedback must be addressed
4. Maintainer will merge when ready

## 🏷️ Labels and Milestones

### Issue Labels
- `bug` - Bug reports
- `enhancement` - Feature requests
- `documentation` - Docs improvements
- `template` - Template-related issues
- `cli` - CLI tool issues
- `good first issue` - Beginner-friendly
- `help wanted` - Community contributions welcome

### Milestones
- `v1.0.0` - Initial release
- `v1.1.0` - Template additions
- `v1.2.0` - CLI improvements
- `v2.0.0` - Major feature updates

## 🌟 Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes for significant contributions
- Discord community announcements
- Annual contributor highlights

## 💬 Getting Help

### Discord Community
Join our [Discord server](https://discord.gg/bankr) for:
- Real-time help with contributions
- Discussion of new ideas
- Code review and feedback
- Community support

### Maintainers
- **Primary Maintainer**: @bankr-team
- **Template Maintainers**: Check GitHub repository
- **CLI Maintainers**: Check GitHub repository

### Resources
- [Bankr Documentation](https://docs.bankr.bot/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [CLI Tool Guidelines](https://clig.dev/)

## 📄 Legal

By contributing, you agree that:
- Your contributions are your own original work
- You have the right to contribute the code
- The contribution is licensed under the MIT License
- You follow the code of conduct

## 🎯 Priority Areas

We're currently focusing on:
1. **New Templates**: DeFi protocols, NFT tools, analytics
2. **CLI Improvements**: Better UX, more options
3. **Documentation**: More examples, better guides
4. **Testing**: Improved test coverage
5. **Performance**: Faster template generation

---

Thank you for contributing to Create Bankr App! Your help makes this project better for everyone. 🚀💰
