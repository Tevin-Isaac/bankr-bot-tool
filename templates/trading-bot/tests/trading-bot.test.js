import { test, describe } from 'node:test';
import assert from 'node:assert';
import { TradingBot } from '../src/trading-bot.js';
import { config } from '../src/config.js';

describe('TradingBot', () => {
  let bot;

  test('should initialize with valid config', () => {
    bot = new TradingBot(config);
    assert(bot instanceof TradingBot);
  });

  test('should throw error without API key', async () => {
    const invalidConfig = { ...config, BANKR_API_KEY: '' };
    const invalidBot = new TradingBot(invalidConfig);
    
    await assert.rejects(
      () => invalidBot.initialize(),
      /Failed to connect to Bankr API/
    );
  });

  test('should validate trade amounts', async () => {
    bot = new TradingBot(config);
    
    await assert.rejects(
      () => bot.executeTrade({
        type: 'buy',
        amount: 1, // Below minimum
        fromToken: 'USDC',
        toToken: 'ETH'
      }),
      /Trade amount \$1 is below minimum/
    );
  });

  test('should get price information', async () => {
    bot = new TradingBot(config);
    
    // This would require a valid API key in real testing
    // For now, we'll test the structure
    const priceInfo = await bot.getPrice('ETH');
    assert(typeof priceInfo.price === 'number');
    assert(priceInfo.symbol === 'ETH');
  });
});

describe('Configuration', () => {
  test('should have required environment variables', () => {
    assert(typeof config.BANKR_API_KEY === 'string');
    assert(typeof config.DEFAULT_CHAIN === 'string');
    assert(typeof config.TRADE_AMOUNT_USD === 'number');
  });

  test('should have sensible defaults', () => {
    assert(config.DEFAULT_CHAIN === 'base');
    assert(config.TRADE_AMOUNT_USD === 10);
    assert(config.MAX_TRADES_PER_HOUR === 20);
  });
});
