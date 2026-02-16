# 🧪 Trials Directory

This directory is used for testing and development of the Create Bankr App CLI tool.

## 🎯 Purpose

- **Development Testing**: Create test projects during development
- **Integration Testing**: Test different template combinations
- **Debugging**: Isolate and fix CLI issues
- **Temporary Projects**: Short-lived test projects

## 📁 Usage Examples

### Create Test Projects
```bash
# Navigate to trials directory
cd trials

# Test different templates
../bin/index.js test-trading-bot
../bin/index.js test-token-launcher
../bin/index.js test-portfolio-tracker
../bin/index.js test-arbitrage-bot
../bin/index.js test-defi-yield-farm

# Test with different options
echo -e "quick-test\ntrading-bot\nbase\nenv-config\ntesting\ny\ny" | ../bin/index.js
```

### Test Generated Projects
```bash
# Test a generated project
cd test-trading-bot
npm install
npm test
npm run tutorial
npm run dev
```

### Clean Up
```bash
# Remove all test projects
rm -rf test-*

# Remove specific project
rm -rf test-trading-bot
```

## 🔍 What to Test

### CLI Functionality
- [ ] Project name validation
- [ ] Template selection
- [ ] Blockchain choice
- [ ] Feature selection
- [ ] TypeScript/JavaScript choice
- [ ] Git initialization

### Generated Projects
- [ ] Dependencies install correctly
- [ ] Scripts work as expected
- [ ] Tutorials run without errors
- [ ] Configuration files are valid
- [ ] Source code is functional

### Edge Cases
- [ ] Invalid project names
- [ ] Empty feature selection
- [ ] Network interruptions
- [ ] Permission issues
- [ ] Existing directory conflicts

## 📝 Test Scripts

Create test scripts in this directory for automated testing:

```bash
#!/bin/bash
# test-all-templates.sh

echo "Testing all templates..."

templates=("trading-bot" "token-launcher" "portfolio-tracker" "arbitrage-bot" "defi-yield-farm")

for template in "${templates[@]}"; do
    echo "Testing $template..."
    ../bin/index.js "test-$template" --template "$template" --blockchain "base" --typescript
done
```

## 🚨 Important

- **DO NOT** commit test projects to version control
- **DO NOT** store real API keys in test projects
- **DO** clean up after testing
- **DO** use this directory for development only

---

**Happy testing! 🧪**
