# 🪙 Bankr Token Launcher

A production-ready token deployment and management system built with Bankr's powerful API. Launch tokens with vaulting, vesting schedules, fee management, and comprehensive analytics.

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure your API key**
   ```bash
   cp .env.example .env
   # Edit .env and add your BANKR_API_KEY from https://bankr.bot/api
   ```

3. **Test the connection**
   ```bash
   npm test
   ```

4. **Launch your first token**
   ```bash
   npm run dev
   ```

## 📋 Available Commands

- `npm run dev` - Start token launcher in development mode
- `npm start` - Start token launcher in production mode
- `npm test` - Run tests and validate configuration
- `npm run tutorial` - Launch interactive tutorial
- `npm run build` - Build TypeScript to JavaScript (if using TypeScript)

## 🎯 Features

### Core Token Features
- **Token Deployment**: Launch tokens on Base, Ethereum, Polygon, and more
- **Vault Configuration**: Set up token lock-up schedules and vesting
- **Fee Management**: Configure and claim trading fees automatically
- **Multi-Chain Support**: Deploy on any supported blockchain
- **Custom Parameters**: Name, symbol, supply, and metadata configuration

### Advanced Features
- **Vesting Schedules**: Time-based token release for team/investors
- **Fee Analytics**: Track trading volume and fee revenue
- **Holder Analytics**: Monitor token distribution and holder growth
- **Liquidity Management**: Automatic liquidity provision
- **Security Features**: Anti-rug protection and ownership controls

## 🔧 Configuration

Edit `.env` file to customize your token launcher:

```bash
# Required
BANKR_API_KEY=your_api_key_here

# Token Configuration
TOKEN_NAME=MyToken
TOKEN_SYMBOL=MTK
TOKEN_SUPPLY=1000000
TOKEN_DECIMALS=18

# Deployment Configuration
DEFAULT_CHAIN=base
TOKEN_VAULT_PERCENTAGE=20
TOKEN_VESTING_DAYS=30

# Fee Configuration
FEE_RECIPIENT=your_wallet_address
FEE_PERCENTAGE=2

# Security Configuration
ANTI_RAG_ENABLED=true
OWNERSHIP_RENOUNCE=false
```

## 💡 Usage Examples

### Basic Token Deployment
```javascript
import { TokenLauncher } from './src/token-launcher.js';

const launcher = new TokenLauncher();

// Deploy a basic token
await launcher.deployToken({
  name: 'MyToken',
  symbol: 'MTK',
  chain: 'base',
  supply: 1000000
});
```

### Advanced Token with Vaulting
```javascript
// Deploy token with vesting and fees
await launcher.deployToken({
  name: 'VaultedToken',
  symbol: 'VAULT',
  chain: 'base',
  supply: 1000000,
  vaultPercentage: 30,
  vestingDays: 90,
  feeRecipient: '0x...',
  feePercentage: 2
});
```

### Fee Management
```javascript
// Check accumulated fees
const fees = await launcher.checkFees('MyToken');

// Claim fees to recipient
await launcher.claimFees('MyToken');

// Get fee analytics
const analytics = await launcher.getFeeAnalytics('MyToken');
```

### Token Analytics
```javascript
// Get holder statistics
const holders = await launcher.getHolders('MyToken');

// Get trading volume
const volume = await launcher.getTradingVolume('MyToken');

// Get token price
const price = await launcher.getTokenPrice('MyToken');
```

## 📚 Interactive Tutorial

Run the interactive tutorial to learn step-by-step:

```bash
npm run tutorial
```

The tutorial covers:
1. Setting up your API key
2. Understanding token economics
3. Deploying your first token
4. Configuring vaulting and vesting
5. Setting up fee management
6. Monitoring token performance

## 🎨 Token Templates

### Meme Token
```javascript
await launcher.deployMemeToken({
  name: 'DogeKiller',
  symbol: 'DOGEK',
  description: 'The ultimate meme coin',
  image: 'path/to/logo.png'
});
```

### Utility Token
```javascript
await launcher.deployUtilityToken({
  name: 'GameToken',
  symbol: 'GAME',
  utility: 'In-game currency',
  features: ['staking', 'governance', 'rewards']
});
```

### DeFi Token
```javascript
await launcher.deployDeFiToken({
  name: 'YieldFarm',
  symbol: 'YIELD',
  protocol: 'Yield farming',
  features: ['staking', 'liquidity-mining', 'governance']
});
```

## 🔒 Security Best Practices

- **Never commit** `.env` file to version control
- **Use multi-sig wallets** for team tokens
- **Enable vesting** for team and investor tokens
- **Set appropriate fee percentages** (2-5% recommended)
- **Test on testnet** before mainnet deployment
- **Enable anti-rag protection** for community tokens

## 📊 Supported Blockchains

- **Base** (recommended): Fast, low-cost, gas sponsorship available
- **Ethereum**: High-value projects, established ecosystem
- **Polygon**: Low-cost, DeFi focused
- **Unichain**: Uniswap ecosystem integration
- **Solana**: High-speed, different token model

## 🚨 Important Disclaimers

- Token deployment creates **real smart contracts** on blockchain
- **Gas fees** apply for deployments and transactions
- **Legal compliance** is your responsibility
- Token prices can be **highly volatile**
- **Do your own research** before launching tokens

## 🛠 Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Start the launcher
npm start
```

## 📖 Learn More

- [Bankr Token Docs](https://docs.bankr.bot/tokens)
- [Token Economics Guide](https://docs.bankr.bot/guides/tokenomics)
- [Security Best Practices](https://docs.bankr.bot/security)
- [Discord Community](https://discord.gg/bankr)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ using [Bankr](https://bankr.bot)**

*Happy token launching! 🚀🪙*
