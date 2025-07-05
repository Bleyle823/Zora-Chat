import type { Plugin } from "@elizaos/core";
import { walletProvider, getWalletClient } from "./provider";
import { getZoraActions } from "./actions";

// Initial banner
console.log("\n┌════════════════════════════════════════┐");
console.log("│          ZORA PLUGIN                   │");
console.log("├────────────────────────────────────────┤");
console.log("│  Initializing Zora Plugin...           │");
console.log("│  Version: 1.0.0                        │");
console.log("└════════════════════════════════════════┘");

const initializeActions = async () => {
    try {
        // Check if we have the required environment variables
        const privateKey = process.env.ZORA_PRIVATE_KEY;
        const rpcUrl = process.env.ZORA_RPC_URL || "https://sepolia.base.org";

        if (!privateKey) {
            console.warn("⚠️ Missing ZORA_PRIVATE_KEY - Zora actions will not be available");
            return [];
        }

        const actions = await getZoraActions({
            getWalletClient,
        });
        
        console.log("✔ Zora actions initialized successfully.");
        console.log(`✔ Available actions: ${actions.map(a => a.name).join(", ")}`);
        
        return actions;
    } catch (error) {
        console.error("❌ Failed to initialize Zora actions:", error);
        return []; // Return empty array instead of failing
    }
};

export const createZoraPlugin = async (): Promise<Plugin> => {
    const actions = await initializeActions();
    
    return {
        name: "[Zora] Integration",
        description: "Zora protocol integration plugin for creating and trading coins",
        providers: [walletProvider],
        evaluators: [],
        services: [],
        actions,
    };
};

// For backward compatibility, export a default plugin with empty actions
export const zoraPlugin: Plugin = {
    name: "[Zora] Integration",
    description: "Zora protocol integration plugin for creating and trading coins",
    providers: [walletProvider],
    evaluators: [],
    services: [],
    actions: [], // Empty actions for synchronous export
};

export default zoraPlugin;