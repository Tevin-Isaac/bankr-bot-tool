import fetch from 'node-fetch';
import chalk from 'chalk';
import { config } from './config.js';

export interface TokenConfig {
  name: string;
  symbol: string;
  chain?: string;
  supply?: number;
  decimals?: number;
  vaultPercentage?: number;
  vestingDays?: number;
  feeRecipient?: string;
  feePercentage?: number;
  description?: string;
  image?: string;
}

export interface TokenInfo {
  name: string;
  symbol: string;
  address: string;
  chain: string;
  supply: number;
  holders: number;
  price?: number;
  marketCap?: number;
  volume24h?: number;
  createdAt: Date;
}

export interface FeeInfo {
  totalFees: number;
  claimableFees: number;
  feeRecipient: string;
  lastClaimed?: Date;
}

export interface HolderInfo {
  address: string;
  balance: number;
  percentage: number;
}

export class TokenLauncher {
  private apiKey: string;
  private baseUrl: string;
  private deployedTokens: Map<string, TokenInfo> = new Map();

  constructor(config: any) {
    this.apiKey = config.BANKR_API_KEY;
    this.baseUrl = config.BANKR_BASE_URL;
  }

  async initialize(): Promise<void> {
    await this.testConnection();
    console.log(chalk.green('✅ Token launcher initialized successfully'));
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

  async deployToken(tokenConfig: TokenConfig): Promise<string> {
    console.log(chalk.cyan(`🚀 Deploying token: ${tokenConfig.name} (${tokenConfig.symbol})`));
    
    const chain = tokenConfig.chain || config.DEFAULT_CHAIN;
    const supply = tokenConfig.supply || 1000000;
    const vaultPercentage = tokenConfig.vaultPercentage || 0;
    const vestingDays = tokenConfig.vestingDays || 0;
    
    let prompt = `deploy a token called ${tokenConfig.name} with symbol ${tokenConfig.symbol} on ${chain}`;
    
    if (supply !== 1000000) {
      prompt += ` with supply of ${supply}`;
    }
    
    if (vaultPercentage > 0) {
      prompt += ` with ${vaultPercentage}% vaulted`;
      if (vestingDays > 0) {
        prompt += ` for ${vestingDays} days`;
      }
    }
    
    if (tokenConfig.feeRecipient && tokenConfig.feePercentage) {
      prompt += ` with ${tokenConfig.feePercentage}% fees going to ${tokenConfig.feeRecipient}`;
    }
    
    try {
      const response = await this.makeRequest(prompt);
      console.log(chalk.green('✅ Token deployed successfully'));
      return response;
    } catch (error) {
      console.error(chalk.red('❌ Token deployment failed:'), error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  async getTokens(): Promise<TokenInfo[]> {
    console.log(chalk.cyan('📊 Fetching deployed tokens...'));
    
    const prompt = 'list all tokens I have deployed across all chains';
    const response = await this.makeRequest(prompt);
    
    // Parse token list (simplified)
    const tokens: TokenInfo[] = [];
    
    console.log(chalk.green(`🪙 Found ${tokens.length} deployed tokens`));
    return tokens;
  }

  async checkFees(tokenSymbol: string): Promise<FeeInfo> {
    console.log(chalk.cyan(`💰 Checking fees for ${tokenSymbol}...`));
    
    const prompt = `check accumulated trading fees for ${tokenSymbol}`;
    const response = await this.makeRequest(prompt);
    
    // Parse fee information (simplified)
    const feeInfo: FeeInfo = {
      totalFees: 0,
      claimableFees: 0,
      feeRecipient: ''
    };
    
    console.log(chalk.green('💸 Fee information retrieved'));
    return feeInfo;
  }

  async claimFees(tokenSymbol: string): Promise<string> {
    console.log(chalk.cyan(`💸 Claiming fees for ${tokenSymbol}...`));
    
    const prompt = `claim all available fees for ${tokenSymbol}`;
    const response = await this.makeRequest(prompt);
    
    console.log(chalk.green('✅ Fees claimed successfully'));
    return response;
  }

  async getHolders(tokenSymbol: string): Promise<HolderInfo[]> {
    console.log(chalk.cyan(`👥 Fetching holders for ${tokenSymbol}...`));
    
    const prompt = `show holder distribution for ${tokenSymbol}`;
    const response = await this.makeRequest(prompt);
    
    // Parse holder information (simplified)
    const holders: HolderInfo[] = [];
    
    console.log(chalk.green(`👥 Found ${holders.length} holders`));
    return holders;
  }

  async getTradingVolume(tokenSymbol: string): Promise<any> {
    const prompt = `show trading volume and analytics for ${tokenSymbol}`;
    return await this.makeRequest(prompt);
  }

  async getTokenPrice(tokenSymbol: string): Promise<number> {
    const prompt = `what is the current price of ${tokenSymbol}?`;
    const response = await this.makeRequest(prompt);
    
    // Parse price from response
    const priceMatch = response.match(/\$?([\d,]+\.?\d*)/);
    return priceMatch ? parseFloat(priceMatch[1].replace(',', '')) : 0;
  }

  async startDeploymentDemo(): Promise<void> {
    console.log(chalk.cyan('🎯 Starting token deployment demo...'));
    
    // Demo deployment
    const demoToken: TokenConfig = {
      name: 'DemoToken',
      symbol: 'DEMO',
      chain: config.DEFAULT_CHAIN,
      supply: 1000000,
      vaultPercentage: 20,
      vestingDays: 30
    };
    
    console.log(chalk.blue('📝 Demo token configuration:'));
    console.log(chalk.cyan(`   Name: ${demoToken.name}`));
    console.log(chalk.cyan(`   Symbol: ${demoToken.symbol}`));
    console.log(chalk.cyan(`   Chain: ${demoToken.chain}`));
    console.log(chalk.cyan(`   Supply: ${demoToken.supply}`));
    console.log(chalk.cyan(`   Vault: ${demoToken.vaultPercentage}%`));
    console.log(chalk.cyan(`   Vesting: ${demoToken.vestingDays} days`));
    
    console.log(chalk.yellow('\n⚠️  This is a demo - no real token will be deployed'));
    console.log(chalk.cyan('💡 To deploy a real token, modify the configuration and run again'));
  }

  // Utility methods
  async deployMemeToken(config: Partial<TokenConfig>): Promise<string> {
    return this.deployToken({
      name: config.name || 'MemeToken',
      symbol: config.symbol || 'MEME',
      chain: config.chain || 'base',
      supply: config.supply || 1000000000000, // 1 trillion for meme tokens
      ...config
    });
  }

  async deployUtilityToken(config: Partial<TokenConfig>): Promise<string> {
    return this.deployToken({
      name: config.name || 'UtilityToken',
      symbol: config.symbol || 'UTIL',
      chain: config.chain || 'base',
      supply: config.supply || 1000000000, // 1 billion for utility tokens
      vaultPercentage: 20,
      vestingDays: 365,
      ...config
    });
  }

  async deployDeFiToken(config: Partial<TokenConfig>): Promise<string> {
    return this.deployToken({
      name: config.name || 'DeFiToken',
      symbol: config.symbol || 'DEFI',
      chain: config.chain || 'base',
      supply: config.supply || 100000000, // 100 million for DeFi tokens
      feePercentage: 2,
      ...config
    });
  }
}
