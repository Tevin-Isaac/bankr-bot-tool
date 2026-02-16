#!/usr/bin/env node

import chalk from 'chalk';
import { TokenLauncher } from './token-launcher.js';
import { config } from './config.js';

console.log(chalk.blue.bold(`
🪙 Bankr Token Launcher
🚀 Starting token deployment on ${config.DEFAULT_CHAIN}
`));

async function main() {
  try {
    const launcher = new TokenLauncher(config);
    
    console.log(chalk.cyan('🔧 Initializing token launcher...'));
    await launcher.initialize();
    
    console.log(chalk.green('✅ Token launcher initialized successfully!'));
    
    // Display existing tokens
    console.log(chalk.cyan('📊 Checking existing tokens...'));
    const tokens = await launcher.getTokens();
    console.log(chalk.green('🪙 Tokens found:'), tokens.length);
    
    // Start token deployment demo
    console.log(chalk.cyan('🚀 Ready to deploy tokens!'));
    await launcher.startDeploymentDemo();
    
  } catch (error) {
    console.error(chalk.red('❌ Error starting token launcher:'), error instanceof Error ? error.message : 'Unknown error');
    
    if (error instanceof Error && error.message.includes('API key')) {
      console.log(chalk.yellow('\n💡 Setup Help:'));
      console.log(chalk.cyan('1. Get your API key from https://bankr.bot/api'));
      console.log(chalk.cyan('2. Add it to your .env file as BANKR_API_KEY'));
      console.log(chalk.cyan('3. Run npm test to verify your setup'));
    }
    
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n🛑 Shutting down token launcher gracefully...'));
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(chalk.yellow('\n🛑 Shutting down token launcher gracefully...'));
  process.exit(0);
});

main();
