# 🚀 Publishing Create Bankr App

Complete guide to publishing your CLI tool for public use.

## 📋 Publishing Options

### Option 1: npm Registry (Recommended)
Publish to npm for global installation with `npm install -g create-bankr-app`

### Option 2: GitHub Release
Distribute via GitHub releases for manual download

### Option 3: Docker Container
Package as a Docker image for cross-platform distribution

---

## 🎯 Option 1: npm Publishing (Recommended)

### Prerequisites
- npm account ([create one here](https://www.npmjs.com/signup))
- Package name availability check
- Proper package.json configuration

### Step 1: Check Package Name Availability
```bash
npm view create-bankr-app
```

If it returns "404 Not Found", the name is available.

### Step 2: Prepare Package.json
Your `package.json` should look like this:

```json
{
  "name": "create-bankr-app",
  "version": "1.0.0",
  "description": "Interactive CLI tool to create Bankr applications with best practices and tutorials",
  "main": "bin/index.js",
  "bin": {
    "create-bankr-app": "./bin/index.js"
  },
  "type": "module",
  "scripts": {
    "start": "node bin/index.js",
    "test": "node --test",
    "dev": "node bin/index.js"
  },
  "keywords": [
    "bankr",
    "cli",
    "crypto",
    "trading",
    "bot",
    "template",
    "generator",
    "web3",
    "blockchain"
  ],
  "author": "Bankr DevRel Team",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/create-bankr-app.git"
  },
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/create-bankr-app/issues"
  },
  "homepage": "https://github.com/YOUR_USERNAME/create-bankr-app#readme",
  "engines": {
    "node": ">=16.0.0"
  }
}
```

### Step 3: Update Repository URLs
Replace `YOUR_USERNAME` with your actual GitHub username in:
- `package.json` repository URL
- `package.json` bugs URL  
- `package.json` homepage URL
- `CONTRIBUTING.md` clone URL

### Step 4: Add .npmignore File
```bash
# Dependencies
node_modules/

# Development files
.trials/
examples/
.git/
.gitignore

# Documentation (optional - keep if you want)
CONTRIBUTING.md
TEMPLATES.md
PUBLISHING.md

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db
```

### Step 5: Test Your Package
```bash
# Test locally
npm pack

# Install from local package
npm install -g ./create-bankr-app-1.0.0.tgz

# Test the CLI
create-bankr-app test-project
```

### Step 6: Login to npm
```bash
npm login
```

### Step 7: Publish!
```bash
# Publish to public registry
npm publish

# Or publish with tag
npm publish --tag beta
```

### Step 8: Verify Installation
```bash
# Test installation from npm
npm install -g create-bankr-app
create-bankr-app my-test-app
```

---

## 🎯 Option 2: GitHub Release

### Step 1: Create GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/create-bankr-app.git
git push -u origin main
```

### Step 2: Create Release
1. Go to your repository on GitHub
2. Click "Releases" → "Create a new release"
3. Choose a tag (e.g., `v1.0.0`)
4. Add release notes
5. Attach the packaged file if desired

### Step 3: Installation Instructions
Users can install via:
```bash
# Clone and install globally
git clone https://github.com/YOUR_USERNAME/create-bankr-app.git
cd create-bankr-app
npm install -g .
```

---

## 🎯 Option 3: Docker Distribution

### Step 1: Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN npm pack
RUN npm install -g create-bankr-app-*.tgz

ENTRYPOINT ["create-bankr-app"]
```

### Step 2: Build and Push
```bash
docker build -t create-bankr-app .
docker tag create-bankr-app YOUR_USERNAME/create-bankr-app
docker push YOUR_USERNAME/create-bankr-app
```

### Step 3: Usage
```bash
docker run -it --rm -v $(pwd):/app YOUR_USERNAME/create-bankr-app my-project
```

---

## 📁 About the `trials` Folder

The `trials` folder is intended for:
- **Testing CLI functionality** during development
- **Temporary test projects** created during development
- **Integration testing** of different template combinations
- **Debugging** CLI issues without cluttering the main directory

### Usage Examples:
```bash
# Create test projects in trials folder
cd trials
../bin/index.js test-trading-bot
../bin/index.js test-token-launcher
../bin/index.js test-portfolio-tracker

# Clean up test projects
rm -rf test-*
```

---

## 🚀 Pre-Launch Checklist

### ✅ Code Quality
- [ ] All tutorials work correctly
- [ ] CLI handles edge cases gracefully
- [ ] Error messages are helpful
- [ ] Documentation is complete and accurate

### ✅ Package Configuration
- [ ] `package.json` is properly configured
- [ ] Binaries are correctly specified
- [ ] Repository URLs are updated
- [ ] License is appropriate

### ✅ Testing
- [ ] Test all templates generate correctly
- [ ] Test with different Node.js versions
- [ ] Test on different operating systems
- [ ] Test npm global installation

### ✅ Documentation
- [ ] README.md is comprehensive
- [ ] CONTRIBUTING.md is clear
- [ ] Installation instructions work
- [ ] Examples are accurate

### ✅ Legal & Branding
- [ ] License is appropriate (MIT recommended)
- [ ] No trademark issues with "Bankr"
- [ ] Attribution to Bankr is included
- [ ] Privacy policy if collecting data

---

## 📈 Post-Launch

### Monitor Usage
```bash
# Check npm downloads
npm view create-bankr-app

# Set up GitHub analytics
# Monitor issues and PRs
```

### Community Building
- Respond to issues promptly
- Welcome contributions
- Share on social media
- Write blog posts
- Create video tutorials

### Maintenance
- Regular updates for security
- Add new templates based on demand
- Fix bugs quickly
- Keep dependencies updated

---

## 🎯 Recommended Launch Strategy

1. **Start with npm publishing** (easiest for developers)
2. **Create GitHub repository** for source code and issues
3. **Write blog post** announcing the tool
4. **Share in relevant communities** (crypto, Node.js, CLI tools)
5. **Create video tutorial** showing the CLI in action
6. **Gather feedback** and iterate quickly

---

## 🔗 Helpful Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/publishing-packages)
- [CLI Best Practices](https://clig.dev/)
- [Node.js Package Guidelines](https://github.com/goldbergyoni/nodebestpractices)
- [Open Source License Guide](https://choosealicense.com/)

---

**Ready to launch your powerful CLI tool? 🚀**
