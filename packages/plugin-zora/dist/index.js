var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  createZoraPlugin: () => createZoraPlugin,
  default: () => index_default,
  zoraPlugin: () => zoraPlugin
});
module.exports = __toCommonJS(index_exports);

// src/provider.ts
var import_viem = require("viem");
var import_accounts = require("viem/accounts");
var import_chains = require("viem/chains");
var fs = __toESM(require("fs"));
var WALLET_DATA_FILE = "zora_wallet_data.json";
async function getWalletClient() {
  const privateKey = process.env.ZORA_PRIVATE_KEY;
  const rpcUrl = process.env.ZORA_RPC_URL || "https://sepolia.base.org";
  if (!privateKey) {
    throw new Error("Missing ZORA_PRIVATE_KEY environment variable");
  }
  const account = (0, import_accounts.privateKeyToAccount)(privateKey);
  const walletClient = (0, import_viem.createWalletClient)({
    account,
    chain: import_chains.baseSepolia,
    transport: (0, import_viem.http)(rpcUrl)
  });
  const publicClient = (0, import_viem.createPublicClient)({
    chain: import_chains.baseSepolia,
    transport: (0, import_viem.http)(rpcUrl)
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
var import_core = require("@elizaos/core");
var import_coins_sdk = require("@zoralabs/coins-sdk");
var import_viem2 = require("viem");
var import_zod = require("zod");
var createCoinSchema = import_zod.z.object({
  name: import_zod.z.string().describe("The name of the coin to create"),
  symbol: import_zod.z.string().describe("The symbol/ticker of the coin"),
  payoutRecipient: import_zod.z.string().optional().describe("The address to receive payouts (optional)"),
  uri: import_zod.z.string().optional().describe("The metadata URI for the coin (optional)")
});
var tradeCoinSchema = import_zod.z.object({
  coinAddress: import_zod.z.string().describe("The contract address of the coin to trade"),
  direction: import_zod.z.enum(["buy", "sell"]).describe("Whether to buy or sell the coin"),
  amount: import_zod.z.string().describe("The amount to trade (in ETH for buy, in tokens for sell)"),
  recipient: import_zod.z.string().optional().describe("The recipient address (optional, defaults to sender)"),
  minAmountOut: import_zod.z.string().optional().describe("Minimum amount to receive (optional)")
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
        const parameterContext = (0, import_core.composeContext)({
          state: currentState,
          template: `{{recentMessages}}

Given the recent messages, extract the following information for creating a Zora coin:
- name: The name of the coin
- symbol: The symbol/ticker of the coin
- payoutRecipient: The address to receive payouts (optional)
- uri: The metadata URI for the coin (optional)

Extract these parameters from the conversation context.`
        });
        const { object: parameters } = await (0, import_core.generateObject)({
          runtime,
          context: parameterContext,
          modelClass: import_core.ModelClass.LARGE,
          schema: createCoinSchema
        });
        const coinParams = {
          name: parameters.name,
          symbol: parameters.symbol,
          uri: parameters.uri || "ipfs://bafybeigoxzqzbnxsn35vq7lls3ljxdcwjafxvbvkivprsodzrptpiguysy",
          payoutRecipient: parameters.payoutRecipient || account.address
        };
        console.log("Creating coin with parameters:", coinParams);
        const result = await (0, import_coins_sdk.createCoin)(
          coinParams,
          walletClient,
          publicClient,
          { gasMultiplier: 120 }
        );
        const responseContext = (0, import_core.composeContext)({
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
        const response = await (0, import_core.generateText)({
          runtime,
          context: responseContext,
          modelClass: import_core.ModelClass.LARGE
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
        const parameterContext = (0, import_core.composeContext)({
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
        const { object: parameters } = await (0, import_core.generateObject)({
          runtime,
          context: parameterContext,
          modelClass: import_core.ModelClass.LARGE,
          schema: tradeCoinSchema
        });
        const tradeParams = {
          direction: parameters.direction,
          target: parameters.coinAddress,
          args: {
            recipient: parameters.recipient || account.address,
            orderSize: (0, import_viem2.parseEther)(parameters.amount),
            minAmountOut: parameters.minAmountOut ? (0, import_viem2.parseEther)(parameters.minAmountOut) : 0n,
            tradeReferrer: account.address
          }
        };
        console.log("Trading coin with parameters:", tradeParams);
        const result = await (0, import_coins_sdk.tradeCoin)(
          tradeParams,
          walletClient,
          publicClient,
          { gasMultiplier: 120 }
        );
        const responseContext = (0, import_core.composeContext)({
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
        const response = await (0, import_core.generateText)({
          runtime,
          context: responseContext,
          modelClass: import_core.ModelClass.LARGE
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createZoraPlugin,
  zoraPlugin
});
//# sourceMappingURL=index.js.map