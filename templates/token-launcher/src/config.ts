import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  BANKR_API_KEY: process.env.BANKR_API_KEY || '',
  BANKR_BASE_URL: process.env.BANKR_BASE_URL || 'https://api.bankr.bot',
  PROJECT_NAME: process.env.PROJECT_NAME || 'bankr-token-launcher',
  TEMPLATE: process.env.TEMPLATE || 'token-launcher',
  BLOCKCHAIN: process.env.BLOCKCHAIN || 'base',
  TYPESCRIPT: process.env.TYPESCRIPT === 'true',
  
  // Token Configuration
  TOKEN_NAME: process.env.TOKEN_NAME || 'MyToken',
  TOKEN_SYMBOL: process.env.TOKEN_SYMBOL || 'MTK',
  TOKEN_SUPPLY: Number(process.env.TOKEN_SUPPLY) || 1000000,
  TOKEN_DECIMALS: Number(process.env.TOKEN_DECIMALS) || 18,
  
  // Deployment Configuration
  DEFAULT_CHAIN: process.env.DEFAULT_CHAIN || 'base',
  TOKEN_VAULT_PERCENTAGE: Number(process.env.TOKEN_VAULT_PERCENTAGE) || 20,
  TOKEN_VESTING_DAYS: Number(process.env.TOKEN_VESTING_DAYS) || 30,
  
  // Fee Configuration
  FEE_RECIPIENT: process.env.FEE_RECIPIENT || '',
  FEE_PERCENTAGE: Number(process.env.FEE_PERCENTAGE) || 2,
  
  // Security Configuration
  ANTI_RUG_ENABLED: process.env.ANTI_RAG_ENABLED === 'true',
  OWNERSHIP_RENOUNCE: process.env.OWNERSHIP_RENOUNCE === 'true',
};

export type Config = typeof config;
