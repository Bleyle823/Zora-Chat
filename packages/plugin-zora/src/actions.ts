import {
    type Action,
    generateText,
    type HandlerCallback,
    type IAgentRuntime,
    type Memory,
    ModelClass,
    type State,
    composeContext,
    generateObject,
} from "@elizaos/core";
import { createCoin, tradeCoin } from "@zoralabs/coins-sdk";
import { parseEther, type Address } from "viem";
import { z } from "zod";

type GetZoraActionsParams = {
    getWalletClient: () => Promise<{
        walletClient: any;
        publicClient: any;
        account: any;
    }>;
};

// Schema for creating a coin
const createCoinSchema = z.object({
    name: z.string().describe("The name of the coin to create"),
    symbol: z.string().describe("The symbol/ticker of the coin"),
    payoutRecipient: z.string().optional().describe("The address to receive payouts (optional)"),
    uri: z.string().optional().describe("The metadata URI for the coin (optional)"),
});

// Schema for trading a coin
const tradeCoinSchema = z.object({
    coinAddress: z.string().describe("The contract address of the coin to trade"),
    direction: z.enum(["buy", "sell"]).describe("Whether to buy or sell the coin"),
    amount: z.string().describe("The amount to trade (in ETH for buy, in tokens for sell)"),
    recipient: z.string().optional().describe("The recipient address (optional, defaults to sender)"),
    minAmountOut: z.string().optional().describe("Minimum amount to receive (optional)"),
});

export async function getZoraActions({
    getWalletClient,
}: GetZoraActionsParams): Promise<Action[]> {
    const createCoinAction: Action = {
        name: "CREATE_ZORA_COIN",
        description: "Create a new coin on the Zora protocol",
        similes: ["CREATE_COIN", "DEPLOY_TOKEN", "MINT_COIN", "LAUNCH_TOKEN"],
        validate: async () => true,
        handler: async (
            runtime: IAgentRuntime,
            message: Memory,
            state: State | undefined,
            _options?: Record<string, unknown>,
            callback?: HandlerCallback
        ): Promise<boolean> => {
            try {
                const { walletClient, publicClient, account } = await getWalletClient();
                
                let currentState = state ?? (await runtime.composeState(message));
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
                    schema: createCoinSchema,
                });

                // Type assertion to handle the unknown type
                const typedParameters = parameters as z.infer<typeof createCoinSchema>;

                const coinParams = {
                    name: typedParameters.name,
                    symbol: typedParameters.symbol,
                    uri: typedParameters.uri || "ipfs://bafybeigoxzqzbnxsn35vq7lls3ljxdcwjafxvbvkivprsodzrptpiguysy",
                    payoutRecipient: (typedParameters.payoutRecipient || account.address) as Address,
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
                    modelClass: ModelClass.LARGE,
                });

                callback?.({
                    text: response,
                    content: {
                        success: true,
                        coinAddress: result.address,
                        txHash: result.hash,
                        name: coinParams.name,
                        symbol: coinParams.symbol,
                    },
                });

                return true;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                callback?.({
                    text: `Error creating Zora coin: ${errorMessage}`,
                    content: { error: errorMessage },
                });
                return false;
            }
        },
        examples: [
            [
                {
                    user: "{{user1}}",
                    content: {
                        text: "Create a coin called 'ElizaCoin' with symbol 'ELIZA'",
                    },
                },
                {
                    user: "{{agent}}",
                    content: {
                        text: "I'll create the ElizaCoin (ELIZA) for you on the Zora protocol!",
                        action: "CREATE_ZORA_COIN",
                    },
                },
            ],
        ],
    };

    const tradeCoinAction: Action = {
        name: "TRADE_ZORA_COIN",
        description: "Buy or sell a coin on the Zora protocol",
        similes: ["BUY_COIN", "SELL_COIN", "TRADE_TOKEN", "SWAP_COIN"],
        validate: async () => true,
        handler: async (
            runtime: IAgentRuntime,
            message: Memory,
            state: State | undefined,
            _options?: Record<string, unknown>,
            callback?: HandlerCallback
        ): Promise<boolean> => {
            try {
                const { walletClient, publicClient, account } = await getWalletClient();
                
                let currentState = state ?? (await runtime.composeState(message));
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
                    schema: tradeCoinSchema,
                });

                // Type assertion to handle the unknown type
                const typedParameters = parameters as z.infer<typeof tradeCoinSchema>;

                const tradeParams = {
                    direction: typedParameters.direction,
                    target: typedParameters.coinAddress as Address,
                    args: {
                        recipient: (typedParameters.recipient || account.address) as Address,
                        orderSize: parseEther(typedParameters.amount),
                        minAmountOut: typedParameters.minAmountOut ? parseEther(typedParameters.minAmountOut) : 0n,
                        tradeReferrer: account.address as Address,
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
${typedParameters.direction === "buy" ? "Bought" : "Sold"} ${typedParameters.amount} ${typedParameters.direction === "buy" ? "ETH worth of" : "tokens from"} coin at ${typedParameters.coinAddress}

Transaction Hash: ${result.hash}

{{actions}}

Respond to the message knowing that the coin trade was successful:
{{recentMessages}}
`
                });

                const response = await generateText({
                    runtime,
                    context: responseContext,
                    modelClass: ModelClass.LARGE,
                });

                callback?.({
                    text: response,
                    content: {
                        success: true,
                        txHash: result.hash,
                        direction: typedParameters.direction,
                        amount: typedParameters.amount,
                        coinAddress: typedParameters.coinAddress,
                    },
                });

                return true;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                callback?.({
                    text: `Error trading Zora coin: ${errorMessage}`,
                    content: { error: errorMessage },
                });
                return false;
            }
        },
        examples: [
            [
                {
                    user: "{{user1}}",
                    content: {
                        text: "Buy 0.1 ETH worth of the coin at 0x123...",
                    },
                },
                {
                    user: "{{agent}}",
                    content: {
                        text: "I'll buy 0.1 ETH worth of that coin for you!",
                        action: "TRADE_ZORA_COIN",
                    },
                },
            ],
        ],
    };

    return [createCoinAction, tradeCoinAction];
}