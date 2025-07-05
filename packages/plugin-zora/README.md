# Zora Plugin for Eliza

A comprehensive plugin that integrates Zora protocol functionality into Eliza agents, enabling AI agents to create and trade coins on the Zora network.

## Features

- **Create Coins**: Deploy new coins on the Zora protocol with customizable parameters
- **Trade Coins**: Buy and sell coins with flexible trading options
- **Wallet Integration**: Secure wallet management with private key support
- **Base Sepolia Support**: Operates on Base Sepolia testnet
- **Natural Language Processing**: Understands natural language commands for coin operations

## Installation

```bash
npm install @elizaos/plugin-zora
```

## Setup

### Environment Variables

Set the following environment variables:

```env
ZORA_PRIVATE_KEY=your_private_key_here
ZORA_RPC_URL=https://sepolia.base.org  # Optional, defaults to Base Sepolia
```

### Integration

```typescript
import { zoraPlugin } from "@elizaos/plugin-zora";

// Add to your Eliza agent configuration
const agent = {
    plugins: [zoraPlugin],
    // ... other configuration
};
```

## Usage

### Creating a Coin

Users can ask the agent to create coins using natural language:

```
"Create a coin called 'MyToken' with symbol 'MTK'"
"Deploy a new coin named 'ElizaCoin' with ticker 'ELIZA'"
"Launch a token called 'TestCoin' using symbol 'TEST'"
```

### Trading Coins

Users can trade coins using various commands:

```
"Buy 0.1 ETH worth of the coin at 0x1234..."
"Sell 100 tokens from address 0x5678..."
"Trade 0.05 ETH for tokens at 0xabcd..."
```

## Available Actions

### CREATE_ZORA_COIN

Creates a new coin on the Zora protocol.

**Parameters:**
- `name`: The name of the coin
- `symbol`: The ticker symbol
- `payoutRecipient`: Address to receive payouts (optional)
- `uri`: Metadata URI (optional)

**Aliases:** CREATE_COIN, DEPLOY_TOKEN, MINT_COIN, LAUNCH_TOKEN

### TRADE_ZORA_COIN

Trades (buys or sells) a coin on the Zora protocol.

**Parameters:**
- `coinAddress`: Contract address of the coin
- `direction`: "buy" or "sell"
- `amount`: Amount to trade (ETH for buy, tokens for sell)
- `recipient`: Recipient address (optional)
- `minAmountOut`: Minimum output amount (optional)

**Aliases:** BUY_COIN, SELL_COIN, TRADE_TOKEN, SWAP_COIN

## Provider Information

The plugin includes a wallet provider that displays the current wallet address and network status:

```
Zora Wallet Address: 0x... (Base Sepolia)
```

## Security

- Private keys are handled securely using the viem library
- Wallet data is optionally persisted locally for reference
- All transactions require explicit user confirmation through the agent
- Gas multiplier of 120% is applied for reliable transaction execution

## Development

### Building

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Cleaning

```bash
npm run clean
```

## Network Support

Currently supports:
- **Base Sepolia** (testnet): Chain ID 84532

## Dependencies

- `@elizaos/core`: Core Eliza framework
- `@zoralabs/coins-sdk`: Zora protocol SDK
- `viem`: Ethereum interaction library
- `zod`: Schema validation

## Error Handling

The plugin includes comprehensive error handling for:
- Missing environment variables
- Network connectivity issues
- Transaction failures
- Invalid parameters
- Wallet connection problems

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and support:
- Open an issue on GitHub
- Check the Eliza documentation
- Join the Eliza community Discord