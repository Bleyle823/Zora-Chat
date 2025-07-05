import type { Provider, IAgentRuntime } from "@elizaos/core";
import { createWalletClient, createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import * as fs from "node:fs";

const WALLET_DATA_FILE = "zora_wallet_data.json";

interface WalletData {
    address: string;
    privateKey: string;
    network: string;
}

export async function getWalletClient() {
    const privateKey = process.env.ZORA_PRIVATE_KEY;
    const rpcUrl = process.env.ZORA_RPC_URL || "https://sepolia.base.org";

    if (!privateKey) {
        throw new Error("Missing ZORA_PRIVATE_KEY environment variable");
    }

    // Create account from private key
    const account = privateKeyToAccount(privateKey as `0x${string}`);

    // Create wallet client
    const walletClient = createWalletClient({
        account,
        chain: baseSepolia,
        transport: http(rpcUrl),
    });

    // Create public client
    const publicClient = createPublicClient({
        chain: baseSepolia,
        transport: http(rpcUrl),
    });

    // Save wallet data for reference
    const walletData: WalletData = {
        address: account.address,
        privateKey: privateKey,
        network: "base-sepolia"
    };

    try {
        fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify(walletData, null, 2));
    } catch (error) {
        console.warn("Warning: Could not save wallet data:", error);
    }

    return { walletClient, publicClient, account };
}

export const walletProvider: Provider = {
    async get(_runtime: IAgentRuntime): Promise<string | null> {
        try {
            const { account } = await getWalletClient();
            return `Zora Wallet Address: ${account.address} (Base Sepolia)`;
        } catch (error) {
            console.error("Error in Zora wallet provider:", error);
            return `Error initializing Zora wallet: ${error.message}`;
        }
    },
};