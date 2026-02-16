#!/usr/bin/env node

import chalk from 'chalk';
import { TradingBot } from './trading-bot.js';
import { config } from './config.js';

console.log(chalk.blue.bold(`
🤖 Bankr Trading Bot
🚀 Starting automated trading on ${config.DEFAULT_CHAIN}
`));

async function main() {
  try {
    const bot = new TradingBot(config);
    
    console.log(chalk.cyan('🔧 Initializing trading bot...'));
    await bot.initialize();
    
    console.log(chalk.green('✅ Trading bot initialized successfully!'));
    
    // Display portfolio overview
    console.log(chalk.cyan('📊 Fetching portfolio overview...'));
    const portfolio = await bot.getPortfolio();
    console.log(chalk.green('💰 Portfolio:'), portfolio);
    
    // Start main trading loop
    console.log(chalk.cyan('🔄 Starting trading loop...'));
    await bot.startTradingLoop();
    
  } catch (error) {
    console.error(chalk.red('❌ Error starting trading bot:'), error.message);
    
    if (error.message.includes('API key')) {
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
  console.log(chalk.yellow('\n🛑 Shutting down trading bot gracefully...'));
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(chalk.yellow('\n🛑 Shutting down trading bot gracefully...'));
  process.exit(0);
});

main();
