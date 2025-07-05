// src/provider.ts
import { createWalletClient, createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import * as fs from "node:fs";
var WALLET_DATA_FILE = "zora_wallet_data.json";
async function getWalletClient() {
  const privateKey = process.env.ZORA_PRIVATE_KEY;
  const rpcUrl = process.env.ZORA_RPC_URL || "https://sepolia.base.org";
  if (!privateKey) {
    throw new Error("Missing ZORA_PRIVATE_KEY environment variable");
  }
  const account = privateKeyToAccount(privateKey);
  const walletClient = createWalletClient({
    account,
    chain: baseSepolia,
    transport: http(rpcUrl)
  });
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(rpcUrl)
  });
  const walletData = {
    address: account.address,
    privateKey,
    network: "base-sepolia"
  };
  try {
    fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify(walletData, null, 2));
  } catch (error) {
    console.warn("Warning: Could not save wallet data:", error);
  }
  return { walletClient, publicClient, account };
}
var walletProvider = {
  async get(_runtime) {
    try {
      const { account } = await getWalletClient();
      return `Zora Wallet Address: ${account.address} (Base Sepolia)`;
    } catch (error) {
      console.error("Error in Zora wallet provider:", error);
      return `Error initializing Zora wallet: ${error.message}`;
    }
  }
};

// src/actions.ts
import {
  generateText,
  ModelClass,
  composeContext,
  generateObject
} from "@elizaos/core";
import { createCoin, tradeCoin } from "@zoralabs/coins-sdk";
import { parseEther } from "viem";
import { z } from "zod";
var createCoinSchema = z.object({
  name: z.string().describe("The name of the coin to create"),
  symbol: z.string().describe("The symbol/ticker of the coin"),
  payoutRecipient: z.string().optional().describe("The address to receive payouts (optional)"),
  uri: z.string().optional().describe("The metadata URI for the coin (optional)")
});
var tradeCoinSchema = z.object({
  coinAddress: z.string().describe("The contract address of the coin to trade"),
  direction: z.enum(["buy", "sell"]).describe("Whether to buy or sell the coin"),
  amount: z.string().describe("The amount to trade (in ETH for buy, in tokens for sell)"),
  recipient: z.string().optional().describe("The recipient address (optional, defaults to sender)"),
  minAmountOut: z.string().optional().describe("Minimum amount to receive (optional)")
});
async function getZoraActions({
  getWalletClient: getWalletClient2
}) {
  const createCoinAction = {
    name: "CREATE_ZORA_COIN",
    description: "Create a new coin on the Zora protocol",
    similes: ["CREATE_COIN", "DEPLOY_TOKEN", "MINT_COIN", "LAUNCH_TOKEN"],
    validate: async () => true,
    handler: async (runtime, message, state, _options, callback) => {
      try {
        const { walletClient, publicClient, account } = await getWalletClient2();
        let currentState = state ?? await runtime.composeState(message);
        currentState = await runtime.updateRecentMessageState(currentState);
        const parameterContext = composeContext({
          state: currentState,
          template: `{{recentMessages}}

Given the recent messages, extract the following information for creating a Zora coin:
- name: The name of the coin
- symbol: The symbol/ticker of the coin
- payoutRecipient: The address to receive payouts (optional)
- uri: The metadata URI for the coin (optional)

Extract these parameters from the conversation context.`
        });
        const { object: parameters } = await generateObject({
          runtime,
          context: parameterContext,
          modelClass: ModelClass.LARGE,
          schema: createCoinSchema
        });
        const coinParams = {
          name: parameters.name,
          symbol: parameters.symbol,
          uri: parameters.uri || "ipfs://bafybeigoxzqzbnxsn35vq7lls3ljxdcwjafxvbvkivprsodzrptpiguysy",
          payoutRecipient: parameters.payoutRecipient || account.address
        };
        console.log("Creating coin with parameters:", coinParams);
        const result = await createCoin(
          coinParams,
          walletClient,
          publicClient,
          { gasMultiplier: 120 }
        );
        const responseContext = composeContext({
          state: currentState,
          template: `
# Action Examples
{{actionExamples}}

# Knowledge
{{knowledge}}

# Task: Generate dialog and actions for the character {{agentName}}.
About {{agentName}}:
{{bio}}
{{lore}}

{{providers}}

{{attachments}}

# Capabilities
Note that {{agentName}} is capable of reading/seeing/hearing various forms of media, including images, videos, audio, plaintext and PDFs.

The CREATE_ZORA_COIN action was executed successfully.
Coin "${coinParams.name}" (${coinParams.symbol}) has been created!

Transaction Hash: ${result.hash}
Contract Address: ${result.address}

{{actions}}

Respond to the message knowing that the coin creation was successful:
{{recentMessages}}
`
        });
        const response = await generateText({
          runtime,
          context: responseContext,
          modelClass: ModelClass.LARGE
        });
        callback?.({
          text: response,
          content: {
            success: true,
            coinAddress: result.address,
            txHash: result.hash,
            name: coinParams.name,
            symbol: coinParams.symbol
          }
        });
        return true;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        callback?.({
          text: `Error creating Zora coin: ${errorMessage}`,
          content: { error: errorMessage }
        });
        return false;
      }
    },
    examples: [
      [
        {
          user: "{{user1}}",
          content: {
            text: "Create a coin called 'ElizaCoin' with symbol 'ELIZA'"
          }
        },
        {
          user: "{{agent}}",
          content: {
            text: "I'll create the ElizaCoin (ELIZA) for you on the Zora protocol!",
            action: "CREATE_ZORA_COIN"
          }
        }
      ]
    ]
  };
  const tradeCoinAction = {
    name: "TRADE_ZORA_COIN",
    description: "Buy or sell a coin on the Zora protocol",
    similes: ["BUY_COIN", "SELL_COIN", "TRADE_TOKEN", "SWAP_COIN"],
    validate: async () => true,
    handler: async (runtime, message, state, _options, callback) => {
      try {
        const { walletClient, publicClient, account } = await getWalletClient2();
        let currentState = state ?? await runtime.composeState(message);
        currentState = await runtime.updateRecentMessageState(currentState);
        const parameterContext = composeContext({
          state: currentState,
          template: `{{recentMessages}}

Given the recent messages, extract the following information for trading a Zora coin:
- coinAddress: The contract address of the coin to trade
- direction: Whether to "buy" or "sell" the coin
- amount: The amount to trade (in ETH for buy, in tokens for sell)
- recipient: The recipient address (optional)
- minAmountOut: Minimum amount to receive (optional)

Extract these parameters from the conversation context.`
        });
        const { object: parameters } = await generateObject({
          runtime,
          context: parameterContext,
          modelClass: ModelClass.LARGE,
          schema: tradeCoinSchema
        });
        const tradeParams = {
          direction: parameters.direction,
          target: parameters.coinAddress,
          args: {
            recipient: parameters.recipient || account.address,
            orderSize: parseEther(parameters.amount),
            minAmountOut: parameters.minAmountOut ? parseEther(parameters.minAmountOut) : 0n,
            tradeReferrer: account.address
          }
        };
        console.log("Trading coin with parameters:", tradeParams);
        const result = await tradeCoin(
          tradeParams,
          walletClient,
          publicClient,
          { gasMultiplier: 120 }
        );
        const responseContext = composeContext({
          state: currentState,
          template: `
# Action Examples
{{actionExamples}}

# Knowledge
{{knowledge}}

# Task: Generate dialog and actions for the character {{agentName}}.
About {{agentName}}:
{{bio}}
{{lore}}

{{providers}}

{{attachments}}

# Capabilities
Note that {{agentName}} is capable of reading/seeing/hearing various forms of media, including images, videos, audio, plaintext and PDFs.

The TRADE_ZORA_COIN action was executed successfully.
${parameters.direction === "buy" ? "Bought" : "Sold"} ${parameters.amount} ${parameters.direction === "buy" ? "ETH worth of" : "tokens from"} coin at ${parameters.coinAddress}

Transaction Hash: ${result.hash}

{{actions}}

Respond to the message knowing that the coin trade was successful:
{{recentMessages}}
`
        });
        const response = await generateText({
          runtime,
          context: responseContext,
          modelClass: ModelClass.LARGE
        });
        callback?.({
          text: response,
          content: {
            success: true,
            txHash: result.hash,
            direction: parameters.direction,
            amount: parameters.amount,
            coinAddress: parameters.coinAddress
          }
        });
        return true;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        callback?.({
          text: `Error trading Zora coin: ${errorMessage}`,
          content: { error: errorMessage }
        });
        return false;
      }
    },
    examples: [
      [
        {
          user: "{{user1}}",
          content: {
            text: "Buy 0.1 ETH worth of the coin at 0x123..."
          }
        },
        {
          user: "{{agent}}",
          content: {
            text: "I'll buy 0.1 ETH worth of that coin for you!",
            action: "TRADE_ZORA_COIN"
          }
        }
      ]
    ]
  };
  return [createCoinAction, tradeCoinAction];
}

// src/index.ts
console.log("\n\u250C\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2510");
console.log("\u2502          ZORA PLUGIN                   \u2502");
console.log("\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524");
console.log("\u2502  Initializing Zora Plugin...           \u2502");
console.log("\u2502  Version: 1.0.0                        \u2502");
console.log("\u2514\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2518");
var initializeActions = async () => {
  try {
    const privateKey = process.env.ZORA_PRIVATE_KEY;
    const rpcUrl = process.env.ZORA_RPC_URL || "https://sepolia.base.org";
    if (!privateKey) {
      console.warn("\u26A0\uFE0F Missing ZORA_PRIVATE_KEY - Zora actions will not be available");
      return [];
    }
    const actions = await getZoraActions({
      getWalletClient
    });
    console.log("\u2714 Zora actions initialized successfully.");
    console.log(`\u2714 Available actions: ${actions.map((a) => a.name).join(", ")}`);
    return actions;
  } catch (error) {
    console.error("\u274C Failed to initialize Zora actions:", error);
    return [];
  }
};
var createZoraPlugin = async () => {
  const actions = await initializeActions();
  return {
    name: "[Zora] Integration",
    description: "Zora protocol integration plugin for creating and trading coins",
    providers: [walletProvider],
    evaluators: [],
    services: [],
    actions
  };
};
var zoraPlugin = {
  name: "[Zora] Integration",
  description: "Zora protocol integration plugin for creating and trading coins",
  providers: [walletProvider],
  evaluators: [],
  services: [],
  actions: []
  // Empty actions for synchronous export
};
var index_default = zoraPlugin;
export {
  createZoraPlugin,
  index_default as default,
  zoraPlugin
};
//# sourceMappingURL=index.mjs.map