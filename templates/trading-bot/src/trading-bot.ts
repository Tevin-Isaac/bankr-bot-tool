import fetch from 'node-fetch';
import chalk from 'chalk';
import { config } from './config.js';

export interface TradeOrder {
  type: 'buy' | 'sell';
  amount: number;
  fromToken: string;
  toToken: string;
  chain?: string;
}

export interface LimitOrder extends TradeOrder {
  targetPrice: number;
  orderId?: string;
}

export interface DCAOrder {
  token: string;
  amount: number;
  frequency: string;
  active: boolean;
  nextExecution?: Date;
}

export interface Portfolio {
  totalValue: number;
  tokens: Array<{
    symbol: string;
    balance: number;
    value: number;
    chain: string;
  }>;
  lastUpdated: Date;
}

export interface PriceInfo {
  symbol: string;
  price: number;
  marketCap?: number;
  volume24h?: number;
  change24h?: number;
  chain: string;
}

export class TradingBot {
  private apiKey: string;
  private baseUrl: string;
  private rateLimiter: Map<string, number> = new Map();
  private lastTradeTime: number = 0;
  private tradeCount: number = 0;

  constructor(config: any) {
    this.apiKey = config.BANKR_API_KEY;
    this.baseUrl = config.BANKR_BASE_URL;
  }

  async initialize(): Promise<void> {
    // Test API connection
    await this.testConnection();
    console.log(chalk.green('✅ Trading bot initialized successfully'));
  }

  private async testConnection(): Promise<void> {
    try {
      const response = await this.makeRequest('what is my wallet address?');
      if (!response.includes('wallet')) {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      throw new Error(`Failed to connect to Bankr API: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async makeRequest(prompt: string): Promise<string> {
    // Rate limiting
    await this.checkRateLimit();

    const response = await fetch(`${this.baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'bankr-agent',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as any;
    return data.choices[0].message.content;
  }

  private async checkRateLimit(): Promise<void> {
    const now = Date.now();
    const hourAgo = now - 60 * 60 * 1000;
    
    // Clean old entries
    for (const [timestamp] of this.rateLimiter.entries()) {
      if (parseInt(timestamp) < hourAgo) {
        this.rateLimiter.delete(timestamp);
      }
    }

    if (this.rateLimiter.size >= config.MAX_TRADES_PER_HOUR) {
      throw new Error('Rate limit exceeded. Please wait before making more requests.');
    }

    this.rateLimiter.set(now.toString(), 1);
  }

  async checkBalances(): Promise<string> {
    console.log(chalk.cyan('🔍 Checking wallet balances...'));
    
    const prompt = 'what are my balances across all supported chains?';
    const response = await this.makeRequest(prompt);
    
    console.log(chalk.green('💰 Balances retrieved successfully'));
    return response;
  }

  async getPrice(token: string, chain?: string): Promise<PriceInfo> {
    console.log(chalk.cyan(`📈 Getting price for ${token}...`));
    
    const chainQuery = chain ? ` on ${chain}` : '';
    const prompt = `what is the current price of ${token}${chainQuery}? include market cap, volume, and 24h change if available`;
    
    const response = await this.makeRequest(prompt);
    
    // Parse price from response (simplified parsing)
    const priceMatch = response.match(/\$?([\d,]+\.?\d*)/);
    const price = priceMatch ? parseFloat(priceMatch[1].replace(',', '')) : 0;
    
    const priceInfo: PriceInfo = {
      symbol: token,
      price,
      chain: chain || config.DEFAULT_CHAIN
    };
    
    console.log(chalk.green(`💵 ${token} price: $${price.toFixed(2)}`));
    return priceInfo;
  }

  async executeTrade(order: TradeOrder): Promise<string> {
    console.log(chalk.cyan(`🔄 Executing ${order.type} order: ${order.amount} ${order.fromToken} → ${order.toToken}`));
    
    // Validate trade amount
    if (order.amount < config.MIN_TRADE_AMOUNT_USD) {
      throw new Error(`Trade amount $${order.amount} is below minimum $${config.MIN_TRADE_AMOUNT_USD}`);
    }

    const prompt = `${order.type} $${order.amount} of ${order.fromToken} for ${order.toToken}${order.chain ? ` on ${order.chain}` : ''}`;
    
    try {
      const response = await this.makeRequest(prompt);
      this.lastTradeTime = Date.now();
      this.tradeCount++;
      
      console.log(chalk.green('✅ Trade executed successfully'));
      return response;
    } catch (error) {
      console.error(chalk.red('❌ Trade failed:'), error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  async setLimitOrder(order: LimitOrder): Promise<string> {
    console.log(chalk.cyan(`📋 Setting limit order: ${order.type} ${order.amount} ${order.toToken} at $${order.targetPrice}`));
    
    const prompt = `set a limit order to ${order.type} ${order.amount} ${order.toToken} when the price reaches $${order.targetPrice}${order.chain ? ` on ${order.chain}` : ''}`;
    
    const response = await this.makeRequest(prompt);
    console.log(chalk.green('✅ Limit order set successfully'));
    return response;
  }

  async setDCA(token: string, amount: number, frequency: string): Promise<string> {
    console.log(chalk.cyan(`⏰ Setting DCA: ${amount} ${token} ${frequency}`));
    
    const prompt = `set up a dollar-cost averaging strategy to buy $${amount} of ${token} ${frequency}`;
    
    const response = await this.makeRequest(prompt);
    console.log(chalk.green('✅ DCA strategy set successfully'));
    return response;
  }

  async getPortfolio(): Promise<Portfolio> {
    console.log(chalk.cyan('📊 Fetching portfolio overview...'));
    
    const prompt = 'show my complete portfolio including total value and individual token holdings';
    const response = await this.makeRequest(prompt);
    
    // Parse portfolio data (simplified)
    const portfolio: Portfolio = {
      totalValue: 0, // Would parse from response
      tokens: [],
      lastUpdated: new Date()
    };
    
    console.log(chalk.green('📈 Portfolio retrieved successfully'));
    return portfolio;
  }

  async startTradingLoop(): Promise<void> {
    console.log(chalk.cyan('🔄 Starting automated trading loop...'));
    
    // Simple trading loop - in production, this would be more sophisticated
    const tradingInterval = setInterval(async () => {
      try {
        // Check for trading opportunities
        await this.checkTradingOpportunities();
      } catch (error) {
        console.error(chalk.red('❌ Error in trading loop:'), error instanceof Error ? error.message : 'Unknown error');
      }
    }, 60000); // Check every minute

    // Graceful shutdown
    process.on('SIGINT', () => {
      clearInterval(tradingInterval);
      console.log(chalk.yellow('🛑 Trading loop stopped'));
    });
  }

  private async checkTradingOpportunities(): Promise<void> {
    // This would contain your trading strategy logic
    // For now, just log that we're checking
    console.log(chalk.blue('🔍 Checking for trading opportunities...'));
  }

  async getPerformanceMetrics(): Promise<any> {
    const prompt = 'show my trading performance and statistics';
    return await this.makeRequest(prompt);
  }

  // Utility methods
  getTradeCount(): number {
    return this.tradeCount;
  }

  getLastTradeTime(): Date {
    return new Date(this.lastTradeTime);
  }
}
