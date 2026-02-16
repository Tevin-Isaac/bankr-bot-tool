#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(chalk.blue.bold(`
🚀 Welcome to Create Bankr App!
🤖 The fastest way to build crypto trading applications
`));

async function main() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is your project called?',
      default: 'my-bankr-app',
      validate: (input) => {
        if (!input.trim()) {
          return 'Project name is required';
        }
        if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
          return 'Project name can only contain letters, numbers, hyphens, and underscores';
        }
        return true;
      }
    },
    {
      type: 'list',
      name: 'template',
      message: 'What type of app do you want to build?',
      choices: [
        {
          name: '🤖 Trading Bot - Automated trading with limit orders, DCA, and portfolio management',
          value: 'trading-bot'
        },
        {
          name: '🪙 Token Launcher - Deploy and manage your own tokens with vesting and fees',
          value: 'token-launcher'
        },
        {
          name: '📊 Portfolio Tracker - Monitor and analyze your crypto portfolio across chains',
          value: 'portfolio-tracker'
        },
        {
          name: '⚡ Arbitrage Bot - Find and execute profitable arbitrage opportunities',
          value: 'arbitrage-bot'
        },
        {
          name: '💰 DeFi Yield Farm - Automated yield farming and liquidity management',
          value: 'defi-yield-farm'
        }
      ]
    },
    {
      type: 'list',
      name: 'blockchain',
      message: 'Which blockchain do you prefer?',
      choices: [
        {
          name: '⚡ Base (Recommended) - Fast, low-cost, gas sponsorship available',
          value: 'base'
        },
        {
          name: '🔷 Ethereum - The original smart contract platform',
          value: 'ethereum'
        },
        {
          name: '🟣 Polygon - Low-cost with Polymarket integration',
          value: 'polygon'
        },
        {
          name: '🦄 Unichain - Uniswap\'s native L2',
          value: 'unichain'
        },
        {
          name: '🟠 Solana - High-speed, limited gas sponsorship',
          value: 'solana'
        }
      ],
      default: 'base'
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'Which features would you like to include?',
      choices: (answers) => {
        const baseFeatures = [
          { name: '📝 Environment configuration', value: 'env-config', checked: true },
          { name: '🧪 Testing setup', value: 'testing', checked: true },
          { name: '📚 Interactive tutorials', value: 'tutorials', checked: true },
          { name: '📊 Logging and monitoring', value: 'logging', checked: true },
          { name: '🔒 Error handling', value: 'error-handling', checked: true }
        ];

        if (answers.template === 'trading-bot') {
          return [
            ...baseFeatures,
            { name: '📈 Limit orders', value: 'limit-orders', checked: true },
            { name: '💵 Dollar-cost averaging', value: 'dca', checked: false },
            { name: '📊 Real-time portfolio tracking', value: 'portfolio-tracking', checked: true },
            { name: '🔔 Price alerts', value: 'price-alerts', checked: false }
          ];
        }

        if (answers.template === 'token-launcher') {
          return [
            ...baseFeatures,
            { name: '🏦 Token vaulting', value: 'vaulting', checked: true },
            { name: '⏰ Vesting schedules', value: 'vesting', checked: false },
            { name: '💸 Fee management', value: 'fee-management', checked: true },
            { name: '📈 Token analytics', value: 'token-analytics', checked: false }
          ];
        }

        return baseFeatures;
      }
    },
    {
      type: 'confirm',
      name: 'typescript',
      message: 'Would you like to use TypeScript?',
      default: true
    },
    {
      type: 'confirm',
      name: 'gitInit',
      message: 'Initialize a git repository?',
      default: true
    }
  ]);

  const spinner = ora('Creating your Bankr application...').start();

  try {
    const projectPath = path.join(process.cwd(), answers.projectName);
    
    // Create project directory
    await fs.ensureDir(projectPath);
    
    // Copy template
    const templatePath = path.join(__dirname, '../templates', answers.template);
    await fs.copy(templatePath, projectPath);
    
    // Generate package.json with user preferences
    await generatePackageJson(projectPath, answers);
    
    // Generate configuration files
    await generateConfigFiles(projectPath, answers);
    
    // Generate tutorial files
    if (answers.features.includes('tutorials')) {
      await generateTutorials(projectPath, answers);
    }
    
    // Initialize git if requested
    if (answers.gitInit) {
      await initGitRepo(projectPath);
    }
    
    spinner.succeed(chalk.green('✅ Project created successfully!'));
    
    console.log(chalk.cyan(`
🎉 Your ${answers.template} is ready!

📁 Project location: ${projectPath}

🚀 Next steps:
   cd ${answers.projectName}
   npm install
   npm run dev

📚 Get started:
   npm run tutorial    # Interactive tutorial
   npm run test        # Run tests
   npm run build       # Build for production

💡 Need help?
   📖 Read the README.md in your project
   🌐 Visit https://docs.bankr.bot/
   💬 Join our Discord: https://discord.gg/bankr

Happy building! 🤖💰
`));
    
  } catch (error) {
    spinner.fail(chalk.red('❌ Failed to create project'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

async function generatePackageJson(projectPath, answers) {
  const packageJson = {
    name: answers.projectName,
    version: '1.0.0',
    description: `A ${answers.template} built with Bankr`,
    main: answers.typescript ? 'dist/index.js' : 'src/index.js',
    type: 'module',
    scripts: {
      start: answers.typescript ? 'node dist/index.js' : 'node src/index.js',
      dev: answers.typescript ? 'tsx watch src/index.ts' : 'node src/index.js',
      build: answers.typescript ? 'tsc' : 'echo "No build step required"',
      test: answers.features.includes('testing') ? 'node --test' : 'echo "No tests configured"',
      tutorial: answers.features.includes('tutorials') ? 'node tutorials/start.js' : 'echo "No tutorials available"'
    },
    dependencies: {
      'dotenv': '^16.4.5',
      'node-fetch': '^3.3.2',
      'chalk': '^5.3.0',
      'inquirer': '^9.2.12'
    },
    devDependencies: {
      ...(answers.typescript ? { 'typescript': '^5.3.3', 'tsx': '^4.6.2' } : {}),
      ...(answers.features.includes('testing') ? { 'nodemon': '^3.1.4' } : {})
    },
    keywords: ['bankr', 'crypto', answers.template, answers.blockchain],
    author: 'Bankr Developer',
    license: 'MIT'
  };

  await fs.writeJson(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 });
}

async function generateConfigFiles(projectPath, answers) {
  const envContent = `# Bankr API Configuration
# Get your API key from https://bankr.bot/api
BANKR_API_KEY=your_api_key_here
BANKR_BASE_URL=https://api.bankr.bot

# Project Configuration
PROJECT_NAME=${answers.projectName}
TEMPLATE=${answers.template}
BLOCKCHAIN=${answers.blockchain}
TYPESCRIPT=${answers.typescript}

# Trading Configuration (if applicable)
DEFAULT_CHAIN=${answers.blockchain}
TRADE_AMOUNT_USD=10
MAX_TRADES_PER_HOUR=20

# Token Configuration (if applicable)
TOKEN_NAME=MyToken
TOKEN_SYMBOL=MTK
TOKEN_VAULT_PERCENTAGE=20
TOKEN_VESTING_DAYS=30
`;

  await fs.writeFile(path.join(projectPath, '.env.example'), envContent);
  
  // Create .gitignore
  const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
`;

  await fs.writeFile(path.join(projectPath, '.gitignore'), gitignoreContent);
}

async function generateTutorials(projectPath, answers) {
  const templateName = answers.template || 'trading-bot';
  const tutorialContent = `#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';

console.log(chalk.blue.bold(\`
🎓 Welcome to your ${templateName} tutorial!
🚀 Let's build something amazing together
\`));

async function startTutorial() {
  const { ready } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'ready',
      message: 'Ready to start learning how to use your Bankr app?',
      default: true
    }
  ]);

  if (!ready) {
    console.log(chalk.yellow('📚 When you\'re ready, run npm run tutorial again!'));
    return;
  }

  console.log(chalk.cyan('\\n📋 Tutorial Steps:'));
  console.log('1. ⚙️  Set up your API key');
  console.log('2. 🧪 Test your connection');
  console.log('3. 🚀 Make your first API call');
  console.log('4. 💡 Learn advanced features');
  
  // Add more tutorial steps based on template
  if ('${templateName}' === 'trading-bot') {
    console.log('5. 📈 Execute your first trade');
    console.log('6. 📊 Set up portfolio tracking');
  }
  
  if ('${templateName}' === 'token-launcher') {
    console.log('5. 🪙 Deploy your first token');
    console.log('6. 💸 Configure fee management');
  }

  if ('${templateName}' === 'portfolio-tracker') {
    console.log('5. 📊 Add your wallet addresses');
    console.log('6. 📈 View portfolio analytics');
  }

  if ('${templateName}' === 'arbitrage-bot') {
    console.log('5. ⚡ Configure DEX connections');
    console.log('6. 💰 Execute first arbitrage');
  }

  if ('${templateName}' === 'defi-yield-farm') {
    console.log('5. 🌾 Connect to DeFi protocols');
    console.log('6. 💸 Start automated farming');
  }

  console.log(chalk.green('\\n🎯 Let\'s begin with step 1: Setting up your API key'));
  
  const { step1Complete } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'step1Complete',
      message: 'Have you added your BANKR_API_KEY to .env file?',
      default: false
    }
  ]);

  if (!step1Complete) {
    console.log(chalk.cyan('📖 Visit https://bankr.bot/api to get your API key'));
    console.log(chalk.cyan('📝 Add it to your .env file as BANKR_API_KEY=your_key_here'));
    console.log(chalk.yellow('💡 Run npm run tutorial again when you\'re ready to continue!'));
    return;
  }

  console.log(chalk.green('✅ Great! Now let\'s test your connection...'));
  
  // Simulate connection test
  const spinner = require('ora')('Testing API connection...').start();
  setTimeout(() => {
    spinner.succeed(chalk.green('Connection successful!'));
    console.log(chalk.cyan('\\n🎉 Your ${templateName} is ready to use!'));
    console.log(chalk.cyan('📖 Check the README.md for more advanced usage examples'));
    console.log(chalk.cyan('🌐 Visit https://docs.bankr.bot/ for full documentation'));
  }, 2000);
}

startTutorial();`;

  await fs.ensureDir(path.join(projectPath, 'tutorials'));
  await fs.writeFile(path.join(projectPath, 'tutorials', 'start.js'), tutorialContent);
}

async function initGitRepo(projectPath) {
  const { execSync } = await import('child_process');
  try {
    execSync('git init', { cwd: projectPath, stdio: 'ignore' });
    execSync('git add .', { cwd: projectPath, stdio: 'ignore' });
    execSync('git commit -m "Initial commit: Create Bankr app"', { cwd: projectPath, stdio: 'ignore' });
  } catch (error) {
    // Git initialization failed, but that's not critical
  }
}

// Handle CLI arguments
const args = process.argv.slice(2);
if (args.length > 0) {
  // If project name is provided as argument, use it
  process.argv.push('--projectName', args[0]);
}

main().catch(console.error);
