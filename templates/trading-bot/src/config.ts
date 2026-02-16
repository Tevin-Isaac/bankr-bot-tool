import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

// Configuration schema for type safety
const configSchema = z.object({
  BANKR_API_KEY: z.string().min(1, 'Bankr API key is required'),
  BANKR_BASE_URL: z.string().url().default('https://api.bankr.bot'),
  PROJECT_NAME: z.string().default('bankr-trading-bot'),
  TEMPLATE: z.string().default('trading-bot'),
  BLOCKCHAIN: z.string().default('base'),
  TYPESCRIPT: z.string().transform(val => val === 'true').default('true'),
  
  // Trading Configuration
  DEFAULT_CHAIN: z.string().default('base'),
  TRADE_AMOUNT_USD: z.number().default(10),
  MAX_TRADES_PER_HOUR: z.number().default(20),
  STOP_LOSS_PERCENTAGE: z.number().default(5),
  TAKE_PROFIT_PERCENTAGE: z.number().default(10),
  
  // Risk Management
  MAX_POSITION_SIZE_USD: z.number().default(1000),
  MIN_TRADE_AMOUNT_USD: z.number().default(5),
  
  // Alert Configuration
  PRICE_ALERTS_ENABLED: z.string().transform(val => val === 'true').default('true'),
  ALERT_WEBHOOK_URL: z.string().url().optional(),
});

// Parse and validate configuration
const parsedConfig = configSchema.parse({
  BANKR_API_KEY: process.env.BANKR_API_KEY,
  BANKR_BASE_URL: process.env.BANKR_BASE_URL,
  PROJECT_NAME: process.env.PROJECT_NAME,
  TEMPLATE: process.env.TEMPLATE,
  BLOCKCHAIN: process.env.BLOCKCHAIN,
  TYPESCRIPT: process.env.TYPESCRIPT,
  DEFAULT_CHAIN: process.env.DEFAULT_CHAIN,
  TRADE_AMOUNT_USD: Number(process.env.TRADE_AMOUNT_USD) || 10,
  MAX_TRADES_PER_HOUR: Number(process.env.MAX_TRADES_PER_HOUR) || 20,
  STOP_LOSS_PERCENTAGE: Number(process.env.STOP_LOSS_PERCENTAGE) || 5,
  TAKE_PROFIT_PERCENTAGE: Number(process.env.TAKE_PROFIT_PERCENTAGE) || 10,
  MAX_POSITION_SIZE_USD: Number(process.env.MAX_POSITION_SIZE_USD) || 1000,
  MIN_TRADE_AMOUNT_USD: Number(process.env.MIN_TRADE_AMOUNT_USD) || 5,
  PRICE_ALERTS_ENABLED: process.env.PRICE_ALERTS_ENABLED,
  ALERT_WEBHOOK_URL: process.env.ALERT_WEBHOOK_URL,
});

export const config = parsedConfig;

// Export configuration type for use in other modules
export type Config = z.infer<typeof configSchema>;

// Configuration validation helper
export function validateConfig(): boolean {
  try {
    configSchema.parse(parsedConfig);
    return true;
  } catch (error) {
    console.error('❌ Configuration validation failed:', error);
    return false;
  }
}
