import { Readable } from 'stream';
import * as _elizaos_core from '@elizaos/core';
import { MemoryCacheAdapter as MemoryCacheAdapter$1, FsCacheAdapter as FsCacheAdapter$1, DbCacheAdapter as DbCacheAdapter$1, CacheManager as CacheManager$1, DatabaseAdapter as DatabaseAdapter$1, EnvConfig as EnvConfig$1, CharacterConfig as CharacterConfig$1, AgentRuntime as AgentRuntime$1 } from '@elizaos/core';
import * as zod from 'zod';
import { ZodSchema } from 'zod';
import { CoreTool, StepResult as StepResult$1, GenerateObjectResult } from 'ai';

/**
 * Represents a UUID string in the format "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
 */
type UUID = `${string}-${string}-${string}-${string}-${string}`;
/**
 * Represents the content of a message or communication
 */
interface Content {
    /** The main text content */
    text: string;
    /** Optional action associated with the message */
    action?: string;
    /** Optional source/origin of the content */
    source?: string;
    /** URL of the original message/post (e.g. tweet URL, Discord message link) */
    url?: string;
    /** UUID of parent message if this is a reply/thread */
    inReplyTo?: UUID;
    /** Array of media attachments */
    attachments?: Media[];
    /** Additional dynamic properties */
    [key: string]: unknown;
}
/**
 * Example content with associated user for demonstration purposes
 */
interface ActionExample {
    /** User associated with the example */
    user: string;
    /** Content of the example */
    content: Content;
}
/**
 * Example conversation content with user ID
 */
interface ConversationExample {
    /** UUID of user in conversation */
    userId: UUID;
    /** Content of the conversation */
    content: Content;
}
/**
 * Represents an actor/participant in a conversation
 */
interface Actor {
    /** Display name */
    name: string;
    /** Username/handle */
    username: string;
    /** Additional profile details */
    details: {
        /** Short profile tagline */
        tagline: string;
        /** Longer profile summary */
        summary: string;
        /** Favorite quote */
        quote: string;
    };
    /** Unique identifier */
    id: UUID;
}
/**
 * Represents a single objective within a goal
 */
interface Objective {
    /** Optional unique identifier */
    id?: string;
    /** Description of what needs to be achieved */
    description: string;
    /** Whether objective is completed */
    completed: boolean;
}
/**
 * Status enum for goals
 */
declare enum GoalStatus {
    DONE = "DONE",
    FAILED = "FAILED",
    IN_PROGRESS = "IN_PROGRESS"
}
/**
 * Represents a high-level goal composed of objectives
 */
interface Goal {
    /** Optional unique identifier */
    id?: UUID;
    /** Room ID where goal exists */
    roomId: UUID;
    /** User ID of goal owner */
    userId: UUID;
    /** Name/title of the goal */
    name: string;
    /** Current status */
    status: GoalStatus;
    /** Component objectives */
    objectives: Objective[];
}
/**
 * Model size/type classification
 */
declare enum ModelClass {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
    EMBEDDING = "embedding",
    IMAGE = "image"
}
/**
 * Model settings
 */
type ModelSettings$1 = {
    /** Model name */
    name: string;
    /** Maximum input tokens */
    maxInputTokens: number;
    /** Maximum output tokens */
    maxOutputTokens: number;
    /** Optional frequency penalty */
    frequency_penalty?: number;
    /** Optional presence penalty */
    presence_penalty?: number;
    /** Optional repetition penalty */
    repetition_penalty?: number;
    /** Stop sequences */
    stop: string[];
    /** Temperature setting */
    temperature: number;
    /** Optional telemetry configuration (experimental) */
    experimental_telemetry?: TelemetrySettings;
};
/** Image model settings */
type ImageModelSettings = {
    name: string;
    steps?: number;
};
/** Embedding model settings */
type EmbeddingModelSettings = {
    name: string;
    dimensions?: number;
};
/**
 * Configuration for an AI model
 */
type Model = {
    /** Optional API endpoint */
    endpoint?: string;
    /** Model names by size class */
    model: {
        [ModelClass.SMALL]?: ModelSettings$1;
        [ModelClass.MEDIUM]?: ModelSettings$1;
        [ModelClass.LARGE]?: ModelSettings$1;
        [ModelClass.EMBEDDING]?: EmbeddingModelSettings;
        [ModelClass.IMAGE]?: ImageModelSettings;
    };
};
/**
 * Model configurations by provider
 */
type Models = {
    [ModelProviderName.OPENAI]: Model;
    [ModelProviderName.ETERNALAI]: Model;
    [ModelProviderName.ANTHROPIC]: Model;
    [ModelProviderName.GROK]: Model;
    [ModelProviderName.GROQ]: Model;
    [ModelProviderName.LLAMACLOUD]: Model;
    [ModelProviderName.TOGETHER]: Model;
    [ModelProviderName.LLAMALOCAL]: Model;
    [ModelProviderName.LMSTUDIO]: Model;
    [ModelProviderName.GOOGLE]: Model;
    [ModelProviderName.MISTRAL]: Model;
    [ModelProviderName.CLAUDE_VERTEX]: Model;
    [ModelProviderName.REDPILL]: Model;
    [ModelProviderName.OPENROUTER]: Model;
    [ModelProviderName.AIMLAPI]: Model;
    [ModelProviderName.OLLAMA]: Model;
    [ModelProviderName.HEURIST]: Model;
    [ModelProviderName.GALADRIEL]: Model;
    [ModelProviderName.FAL]: Model;
    [ModelProviderName.GAIANET]: Model;
    [ModelProviderName.ALI_BAILIAN]: Model;
    [ModelProviderName.VOLENGINE]: Model;
    [ModelProviderName.NANOGPT]: Model;
    [ModelProviderName.HYPERBOLIC]: Model;
    [ModelProviderName.VENICE]: Model;
    [ModelProviderName.NVIDIA]: Model;
    [ModelProviderName.NINETEEN_AI]: Model;
    [ModelProviderName.AKASH_CHAT_API]: Model;
    [ModelProviderName.LIVEPEER]: Model;
    [ModelProviderName.DEEPSEEK]: Model;
    [ModelProviderName.INFERA]: Model;
    [ModelProviderName.BEDROCK]: Model;
    [ModelProviderName.ATOMA]: Model;
    [ModelProviderName.SECRETAI]: Model;
    [ModelProviderName.NEARAI]: Model;
    [ModelProviderName.KLUSTERAI]: Model;
    [ModelProviderName.MEM0]: Model;
};
/**
 * Available model providers
 */
declare enum ModelProviderName {
    OPENAI = "openai",
    ETERNALAI = "eternalai",
    ANTHROPIC = "anthropic",
    GROK = "grok",
    GROQ = "groq",
    LLAMACLOUD = "llama_cloud",
    TOGETHER = "together",
    LLAMALOCAL = "llama_local",
    LMSTUDIO = "lmstudio",
    GOOGLE = "google",
    MISTRAL = "mistral",
    CLAUDE_VERTEX = "claude_vertex",
    REDPILL = "redpill",
    OPENROUTER = "openrouter",
    AIMLAPI = "aimlapi",
    OLLAMA = "ollama",
    HEURIST = "heurist",
    GALADRIEL = "galadriel",
    FAL = "falai",
    GAIANET = "gaianet",
    ALI_BAILIAN = "ali_bailian",
    VOLENGINE = "volengine",
    NANOGPT = "nanogpt",
    HYPERBOLIC = "hyperbolic",
    VENICE = "venice",
    NVIDIA = "nvidia",
    NINETEEN_AI = "nineteen_ai",
    AKASH_CHAT_API = "akash_chat_api",
    LIVEPEER = "livepeer",
    LETZAI = "letzai",
    DEEPSEEK = "deepseek",
    INFERA = "infera",
    BEDROCK = "bedrock",
    ATOMA = "atoma",
    SECRETAI = "secret_ai",
    NEARAI = "nearai",
    KLUSTERAI = "kluster_ai",
    MEM0 = "mem0"
}
/**
 * Represents the current state/context of a conversation
 */
interface State {
    /** ID of user who sent current message */
    userId?: UUID;
    /** ID of agent in conversation */
    agentId?: UUID;
    /** Agent's biography */
    bio: string;
    /** Agent's background lore */
    lore: string;
    /** Message handling directions */
    messageDirections: string;
    /** Post handling directions */
    postDirections: string;
    /** Current room/conversation ID */
    roomId: UUID;
    /** Optional agent name */
    agentName?: string;
    /** Optional message sender name */
    senderName?: string;
    /** String representation of conversation actors */
    actors: string;
    /** Optional array of actor objects */
    actorsData?: Actor[];
    /** Optional string representation of goals */
    goals?: string;
    /** Optional array of goal objects */
    goalsData?: Goal[];
    /** Recent message history as string */
    recentMessages: string;
    /** Recent message objects */
    recentMessagesData: Memory[];
    /** Optional valid action names */
    actionNames?: string;
    /** Optional action descriptions */
    actions?: string;
    /** Optional action objects */
    actionsData?: Action[];
    /** Optional action examples */
    actionExamples?: string;
    /** Optional provider descriptions */
    providers?: string;
    /** Optional response content */
    responseData?: Content;
    /** Optional recent interaction objects */
    recentInteractionsData?: Memory[];
    /** Optional recent interactions string */
    recentInteractions?: string;
    /** Optional formatted conversation */
    formattedConversation?: string;
    /** Optional formatted knowledge */
    knowledge?: string;
    /** Optional knowledge data */
    knowledgeData?: KnowledgeItem[];
    /** Optional knowledge data */
    ragKnowledgeData?: RAGKnowledgeItem[];
    /** Additional dynamic properties */
    [key: string]: unknown;
}
/**
 * Represents a stored memory/message
 */
interface Memory {
    /** Optional unique identifier */
    id?: UUID;
    /** Associated user ID */
    userId: UUID;
    /** Associated agent ID */
    agentId: UUID;
    /** Optional creation timestamp */
    createdAt?: number;
    /** Memory content */
    content: Content;
    /** Optional embedding vector */
    embedding?: number[];
    /** Associated room ID */
    roomId: UUID;
    /** Whether memory is unique */
    unique?: boolean;
    /** Embedding similarity score */
    similarity?: number;
}
/**
 * Example message for demonstration
 */
interface MessageExample {
    /** Associated user */
    user: string;
    /** Message content */
    content: Content;
}
/**
 * Handler function type for processing messages
 */
type Handler = (runtime: IAgentRuntime, message: Memory, state?: State, options?: {
    [key: string]: unknown;
}, callback?: HandlerCallback) => Promise<unknown>;
/**
 * Callback function type for handlers
 */
type HandlerCallback = (response: Content, files?: any) => Promise<Memory[]>;
/**
 * Validator function type for actions/evaluators
 */
type Validator = (runtime: IAgentRuntime, message: Memory, state?: State) => Promise<boolean>;
/**
 * Represents an action the agent can perform
 */
interface Action {
    /** Similar action descriptions */
    similes: string[];
    /** Detailed description */
    description: string;
    /** Example usages */
    examples: ActionExample[][];
    /** Handler function */
    handler: Handler;
    /** Action name */
    name: string;
    /** Validation function */
    validate: Validator;
    /** Whether to suppress the initial message when this action is used */
    suppressInitialMessage?: boolean;
}
/**
 * Example for evaluating agent behavior
 */
interface EvaluationExample {
    /** Evaluation context */
    context: string;
    /** Example messages */
    messages: Array<ActionExample>;
    /** Expected outcome */
    outcome: string;
}
/**
 * Evaluator for assessing agent responses
 */
interface Evaluator {
    /** Whether to always run */
    alwaysRun?: boolean;
    /** Detailed description */
    description: string;
    /** Similar evaluator descriptions */
    similes: string[];
    /** Example evaluations */
    examples: EvaluationExample[];
    /** Handler function */
    handler: Handler;
    /** Evaluator name */
    name: string;
    /** Validation function */
    validate: Validator;
}
/**
 * Provider for external data/services
 */
interface Provider {
    /** Data retrieval function */
    get: (runtime: IAgentRuntime, message: Memory, state?: State) => Promise<any>;
}
/**
 * Represents a relationship between users
 */
interface Relationship {
    /** Unique identifier */
    id: UUID;
    /** First user ID */
    userA: UUID;
    /** Second user ID */
    userB: UUID;
    /** Primary user ID */
    userId: UUID;
    /** Associated room ID */
    roomId: UUID;
    /** Relationship status */
    status: string;
    /** Optional creation timestamp */
    createdAt?: string;
}
/**
 * Represents a user account
 */
interface Account {
    /** Unique identifier */
    id: UUID;
    /** Display name */
    name: string;
    /** Username */
    username: string;
    /** Optional additional details */
    details?: {
        [key: string]: any;
    };
    /** Optional email */
    email?: string;
    /** Optional avatar URL */
    avatarUrl?: string;
}
/**
 * Room participant with account details
 */
interface Participant {
    /** Unique identifier */
    id: UUID;
    /** Associated account */
    account: Account;
}
/**
 * Represents a conversation room
 */
interface Room {
    /** Unique identifier */
    id: UUID;
    /** Room participants */
    participants: Participant[];
}
/**
 * Represents a media attachment
 */
type Media = {
    /** Unique identifier */
    id: string;
    /** Media URL */
    url: string;
    /** Media title */
    title: string;
    /** Media source */
    source: string;
    /** Media description */
    description: string;
    /** Text content */
    text: string;
    /** Content type */
    contentType?: string;
};
/**
 * Client instance
 */
type ClientInstance = {
    /** Client name */
    /** Stop client connection */
    stop: (runtime: IAgentRuntime) => Promise<unknown>;
};
/**
 * Client interface for platform connections
 */
type Client = {
    /** Client name */
    name: string;
    /** Client configuration */
    config?: {
        [key: string]: any;
    };
    /** Start client connection */
    start: (runtime: IAgentRuntime) => Promise<ClientInstance>;
};
/**
 * Database adapter initialization
 */
type Adapter = {
    /** Initialize the adapter */
    init: (runtime: IAgentRuntime) => IDatabaseAdapter & IDatabaseCacheAdapter;
};
/**
 * Plugin for extending agent functionality
 */
type Plugin = {
    /** Plugin name */
    name: string;
    /** Plugin npm name */
    npmName?: string;
    /** Plugin configuration */
    config?: {
        [key: string]: any;
    };
    /** Plugin description */
    description: string;
    /** Optional actions */
    actions?: Action[];
    /** Optional providers */
    providers?: Provider[];
    /** Optional evaluators */
    evaluators?: Evaluator[];
    /** Optional services */
    services?: Service[];
    /** Optional clients */
    clients?: Client[];
    /** Optional adapters */
    adapters?: Adapter[];
    /** Optional post character processor handler */
    handlePostCharacterLoaded?: (char: Character) => Promise<Character>;
};
interface IAgentConfig {
    [key: string]: string;
}
type TelemetrySettings = {
    /**
     * Enable or disable telemetry. Disabled by default while experimental.
     */
    isEnabled?: boolean;
    /**
     * Enable or disable input recording. Enabled by default.
     *
     * You might want to disable input recording to avoid recording sensitive
     * information, to reduce data transfers, or to increase performance.
     */
    recordInputs?: boolean;
    /**
     * Enable or disable output recording. Enabled by default.
     *
     * You might want to disable output recording to avoid recording sensitive
     * information, to reduce data transfers, or to increase performance.
     */
    recordOutputs?: boolean;
    /**
     * Identifier for this function. Used to group telemetry data by function.
     */
    functionId?: string;
};
interface ModelConfiguration {
    temperature?: number;
    maxOutputTokens?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
    maxInputTokens?: number;
    experimental_telemetry?: TelemetrySettings;
}
type TemplateType = string | ((options: {
    state: State;
}) => string);
/**
 * Configuration for an agent character
 */
type Character = {
    /** Optional unique identifier */
    id?: UUID;
    /** Character name */
    name: string;
    /** Optional username */
    username?: string;
    /** Optional email */
    email?: string;
    /** Optional system prompt */
    system?: string;
    /** Model provider to use */
    modelProvider: ModelProviderName;
    /** Image model provider to use, if different from modelProvider */
    imageModelProvider?: ModelProviderName;
    /** Image Vision model provider to use, if different from modelProvider */
    imageVisionModelProvider?: ModelProviderName;
    /** Optional model endpoint override */
    modelEndpointOverride?: string;
    /** Optional prompt templates */
    templates?: {
        goalsTemplate?: TemplateType;
        factsTemplate?: TemplateType;
        messageHandlerTemplate?: TemplateType;
        shouldRespondTemplate?: TemplateType;
        continueMessageHandlerTemplate?: TemplateType;
        evaluationTemplate?: TemplateType;
        twitterSearchTemplate?: TemplateType;
        twitterActionTemplate?: TemplateType;
        twitterPostTemplate?: TemplateType;
        twitterMessageHandlerTemplate?: TemplateType;
        twitterShouldRespondTemplate?: TemplateType;
        twitterVoiceHandlerTemplate?: TemplateType;
        instagramPostTemplate?: TemplateType;
        instagramMessageHandlerTemplate?: TemplateType;
        instagramShouldRespondTemplate?: TemplateType;
        farcasterPostTemplate?: TemplateType;
        lensPostTemplate?: TemplateType;
        farcasterMessageHandlerTemplate?: TemplateType;
        lensMessageHandlerTemplate?: TemplateType;
        farcasterShouldRespondTemplate?: TemplateType;
        lensShouldRespondTemplate?: TemplateType;
        telegramMessageHandlerTemplate?: TemplateType;
        telegramShouldRespondTemplate?: TemplateType;
        telegramAutoPostTemplate?: string;
        telegramPinnedMessageTemplate?: string;
        discordAutoPostTemplate?: string;
        discordAnnouncementHypeTemplate?: string;
        discordVoiceHandlerTemplate?: TemplateType;
        discordShouldRespondTemplate?: TemplateType;
        discordMessageHandlerTemplate?: TemplateType;
        slackMessageHandlerTemplate?: TemplateType;
        slackShouldRespondTemplate?: TemplateType;
        jeeterPostTemplate?: string;
        jeeterSearchTemplate?: string;
        jeeterInteractionTemplate?: string;
        jeeterMessageHandlerTemplate?: string;
        jeeterShouldRespondTemplate?: string;
        devaPostTemplate?: string;
    };
    /** Character biography */
    bio: string | string[];
    /** Character background lore */
    lore: string[];
    /** Example messages */
    messageExamples: MessageExample[][];
    /** Example posts */
    postExamples: string[];
    /** Known topics */
    topics: string[];
    /** Character traits */
    adjectives: string[];
    /** Optional knowledge base */
    knowledge?: (string | {
        path: string;
        shared?: boolean;
    } | {
        directory: string;
        shared?: boolean;
    })[];
    /** Available plugins */
    plugins: Plugin[];
    /** Character Processor Plugins */
    postProcessors?: Pick<Plugin, 'name' | 'description' | 'handlePostCharacterLoaded'>[];
    /** Optional configuration */
    settings?: {
        secrets?: {
            [key: string]: string;
        };
        intiface?: boolean;
        imageSettings?: {
            steps?: number;
            width?: number;
            height?: number;
            cfgScale?: number;
            negativePrompt?: string;
            numIterations?: number;
            guidanceScale?: number;
            seed?: number;
            modelId?: string;
            jobId?: string;
            count?: number;
            stylePreset?: string;
            hideWatermark?: boolean;
            safeMode?: boolean;
        };
        voice?: {
            model?: string;
            url?: string;
            elevenlabs?: {
                voiceId: string;
                model?: string;
                stability?: string;
                similarityBoost?: string;
                style?: string;
                useSpeakerBoost?: string;
            };
        };
        model?: string;
        modelConfig?: ModelConfiguration;
        embeddingModel?: string;
        chains?: {
            evm?: any[];
            solana?: any[];
            [key: string]: any[];
        };
        transcription?: TranscriptionProvider;
        ragKnowledge?: boolean;
    };
    /** Optional client-specific config */
    clientConfig?: {
        discord?: {
            shouldIgnoreBotMessages?: boolean;
            shouldIgnoreDirectMessages?: boolean;
            shouldRespondOnlyToMentions?: boolean;
            messageSimilarityThreshold?: number;
            isPartOfTeam?: boolean;
            teamAgentIds?: string[];
            teamLeaderId?: string;
            teamMemberInterestKeywords?: string[];
            allowedChannelIds?: string[];
            autoPost?: {
                enabled?: boolean;
                monitorTime?: number;
                inactivityThreshold?: number;
                mainChannelId?: string;
                announcementChannelIds?: string[];
                minTimeBetweenPosts?: number;
            };
        };
        telegram?: {
            shouldIgnoreBotMessages?: boolean;
            shouldIgnoreDirectMessages?: boolean;
            shouldRespondOnlyToMentions?: boolean;
            shouldOnlyJoinInAllowedGroups?: boolean;
            allowedGroupIds?: string[];
            messageSimilarityThreshold?: number;
            isPartOfTeam?: boolean;
            teamAgentIds?: string[];
            teamLeaderId?: string;
            teamMemberInterestKeywords?: string[];
            autoPost?: {
                enabled?: boolean;
                monitorTime?: number;
                inactivityThreshold?: number;
                mainChannelId?: string;
                pinnedMessagesGroups?: string[];
                minTimeBetweenPosts?: number;
            };
        };
        slack?: {
            shouldIgnoreBotMessages?: boolean;
            shouldIgnoreDirectMessages?: boolean;
        };
        gitbook?: {
            keywords?: {
                projectTerms?: string[];
                generalQueries?: string[];
            };
            documentTriggers?: string[];
        };
    };
    /** Writing style guides */
    style: {
        all: string[];
        chat: string[];
        post: string[];
    };
    /** Optional Twitter profile */
    twitterProfile?: {
        id: string;
        username: string;
        screenName: string;
        bio: string;
        nicknames?: string[];
    };
    /** Optional Instagram profile */
    instagramProfile?: {
        id: string;
        username: string;
        bio: string;
        nicknames?: string[];
    };
    /** Optional SimsAI profile */
    simsaiProfile?: {
        id: string;
        username: string;
        screenName: string;
        bio: string;
    };
    /** Optional NFT prompt */
    nft?: {
        prompt: string;
    };
    /**Optinal Parent characters to inherit information from */
    extends?: string[];
    twitterSpaces?: TwitterSpaceDecisionOptions;
};
interface TwitterSpaceDecisionOptions {
    maxSpeakers?: number;
    topics?: string[];
    typicalDurationMinutes?: number;
    idleKickTimeoutMs?: number;
    minIntervalBetweenSpacesMinutes?: number;
    businessHoursOnly?: boolean;
    randomChance?: number;
    enableIdleMonitor?: boolean;
    enableSttTts?: boolean;
    enableRecording?: boolean;
    voiceId?: string;
    sttLanguage?: string;
    speakerMaxDurationMs?: number;
}
/**
 * Interface for database operations
 */
interface IDatabaseAdapter {
    /** Database instance */
    db: any;
    /** Optional initialization */
    init(): Promise<void>;
    /** Close database connection */
    close(): Promise<void>;
    /** Get account by ID */
    getAccountById(userId: UUID): Promise<Account | null>;
    /** Create new account */
    createAccount(account: Account): Promise<boolean>;
    /** Get memories matching criteria */
    getMemories(params: {
        roomId: UUID;
        count?: number;
        unique?: boolean;
        tableName: string;
        agentId: UUID;
        start?: number;
        end?: number;
    }): Promise<Memory[]>;
    getMemoryById(id: UUID): Promise<Memory | null>;
    getMemoriesByIds(ids: UUID[], tableName?: string): Promise<Memory[]>;
    getMemoriesByRoomIds(params: {
        tableName: string;
        agentId: UUID;
        roomIds: UUID[];
        limit?: number;
    }): Promise<Memory[]>;
    getCachedEmbeddings(params: {
        query_table_name: string;
        query_threshold: number;
        query_input: string;
        query_field_name: string;
        query_field_sub_name: string;
        query_match_count: number;
    }): Promise<{
        embedding: number[];
        levenshtein_score: number;
    }[]>;
    log(params: {
        body: {
            [key: string]: unknown;
        };
        userId: UUID;
        roomId: UUID;
        type: string;
    }): Promise<void>;
    getActorDetails(params: {
        roomId: UUID;
    }): Promise<Actor[]>;
    searchMemories(params: {
        tableName: string;
        agentId: UUID;
        roomId: UUID;
        embedding: number[];
        match_threshold: number;
        match_count: number;
        unique: boolean;
    }): Promise<Memory[]>;
    updateGoalStatus(params: {
        goalId: UUID;
        status: GoalStatus;
    }): Promise<void>;
    searchMemoriesByEmbedding(embedding: number[], params: {
        match_threshold?: number;
        count?: number;
        roomId?: UUID;
        agentId?: UUID;
        unique?: boolean;
        tableName: string;
    }): Promise<Memory[]>;
    createMemory(memory: Memory, tableName: string, unique?: boolean): Promise<void>;
    removeMemory(memoryId: UUID, tableName: string): Promise<void>;
    removeAllMemories(roomId: UUID, tableName: string): Promise<void>;
    countMemories(roomId: UUID, unique?: boolean, tableName?: string): Promise<number>;
    getGoals(params: {
        agentId: UUID;
        roomId: UUID;
        userId?: UUID | null;
        onlyInProgress?: boolean;
        count?: number;
    }): Promise<Goal[]>;
    updateGoal(goal: Goal): Promise<void>;
    createGoal(goal: Goal): Promise<void>;
    removeGoal(goalId: UUID): Promise<void>;
    removeAllGoals(roomId: UUID): Promise<void>;
    getRoom(roomId: UUID): Promise<UUID | null>;
    createRoom(roomId?: UUID): Promise<UUID>;
    removeRoom(roomId: UUID): Promise<void>;
    getRoomsForParticipant(userId: UUID): Promise<UUID[]>;
    getRoomsForParticipants(userIds: UUID[]): Promise<UUID[]>;
    addParticipant(userId: UUID, roomId: UUID): Promise<boolean>;
    removeParticipant(userId: UUID, roomId: UUID): Promise<boolean>;
    getParticipantsForAccount(userId: UUID): Promise<Participant[]>;
    getParticipantsForRoom(roomId: UUID): Promise<UUID[]>;
    getParticipantUserState(roomId: UUID, userId: UUID): Promise<"FOLLOWED" | "MUTED" | null>;
    setParticipantUserState(roomId: UUID, userId: UUID, state: "FOLLOWED" | "MUTED" | null): Promise<void>;
    createRelationship(params: {
        userA: UUID;
        userB: UUID;
    }): Promise<boolean>;
    getRelationship(params: {
        userA: UUID;
        userB: UUID;
    }): Promise<Relationship | null>;
    getRelationships(params: {
        userId: UUID;
    }): Promise<Relationship[]>;
    getKnowledge(params: {
        id?: UUID;
        agentId: UUID;
        limit?: number;
        query?: string;
        conversationContext?: string;
    }): Promise<RAGKnowledgeItem[]>;
    searchKnowledge(params: {
        agentId: UUID;
        embedding: Float32Array;
        match_threshold: number;
        match_count: number;
        searchText?: string;
    }): Promise<RAGKnowledgeItem[]>;
    createKnowledge(knowledge: RAGKnowledgeItem): Promise<void>;
    removeKnowledge(id: UUID): Promise<void>;
    clearKnowledge(agentId: UUID, shared?: boolean): Promise<void>;
}
interface IDatabaseCacheAdapter {
    getCache(params: {
        agentId: UUID;
        key: string;
    }): Promise<string | undefined>;
    setCache(params: {
        agentId: UUID;
        key: string;
        value: string;
    }): Promise<boolean>;
    deleteCache(params: {
        agentId: UUID;
        key: string;
    }): Promise<boolean>;
}
interface IMemoryManager {
    runtime: IAgentRuntime;
    tableName: string;
    constructor: Function;
    addEmbeddingToMemory(memory: Memory): Promise<Memory>;
    getMemories(opts: {
        roomId: UUID;
        count?: number;
        unique?: boolean;
        start?: number;
        end?: number;
    }): Promise<Memory[]>;
    getCachedEmbeddings(content: string): Promise<{
        embedding: number[];
        levenshtein_score: number;
    }[]>;
    getMemoriesByIds(ids: UUID[]): Promise<Memory[]>;
    getMemoryById(id: UUID): Promise<Memory | null>;
    getMemoriesByRoomIds(params: {
        roomIds: UUID[];
        limit?: number;
    }): Promise<Memory[]>;
    searchMemoriesByEmbedding(embedding: number[], opts: {
        match_threshold?: number;
        count?: number;
        roomId: UUID;
        unique?: boolean;
    }): Promise<Memory[]>;
    createMemory(memory: Memory, unique?: boolean): Promise<void>;
    removeMemory(memoryId: UUID): Promise<void>;
    removeAllMemories(roomId: UUID): Promise<void>;
    countMemories(roomId: UUID, unique?: boolean): Promise<number>;
}
interface IRAGKnowledgeManager {
    runtime: IAgentRuntime;
    tableName: string;
    getKnowledge(params: {
        query?: string;
        id?: UUID;
        limit?: number;
        conversationContext?: string;
        agentId?: UUID;
    }): Promise<RAGKnowledgeItem[]>;
    createKnowledge(item: RAGKnowledgeItem): Promise<void>;
    removeKnowledge(id: UUID): Promise<void>;
    searchKnowledge(params: {
        agentId: UUID;
        embedding: Float32Array | number[];
        match_threshold?: number;
        match_count?: number;
        searchText?: string;
    }): Promise<RAGKnowledgeItem[]>;
    clearKnowledge(shared?: boolean): Promise<void>;
    processFile(file: {
        path: string;
        content: string;
        type: "pdf" | "md" | "txt";
        isShared: boolean;
    }): Promise<void>;
    cleanupDeletedKnowledgeFiles(): Promise<void>;
    generateScopedId(path: string, isShared: boolean): UUID;
}
type CacheOptions = {
    expires?: number;
};
declare enum CacheStore {
    REDIS = "redis",
    DATABASE = "database",
    FILESYSTEM = "filesystem"
}
interface ICacheManager {
    get<T = unknown>(key: string): Promise<T | undefined>;
    set<T>(key: string, value: T, options?: CacheOptions): Promise<void>;
    delete(key: string): Promise<void>;
}
declare abstract class Service {
    private static instance;
    static get serviceType(): ServiceType;
    static getInstance<T extends Service>(): T;
    get serviceType(): ServiceType;
    abstract initialize(runtime: IAgentRuntime): Promise<void>;
}
interface IAgentRuntime {
    agentId: UUID;
    serverUrl: string;
    databaseAdapter: IDatabaseAdapter;
    token: string | null;
    modelProvider: ModelProviderName;
    imageModelProvider: ModelProviderName;
    imageVisionModelProvider: ModelProviderName;
    character: Character;
    providers: Provider[];
    actions: Action[];
    evaluators: Evaluator[];
    plugins: Plugin[];
    fetch?: typeof fetch | null;
    messageManager: IMemoryManager;
    descriptionManager: IMemoryManager;
    documentsManager: IMemoryManager;
    knowledgeManager: IMemoryManager;
    ragKnowledgeManager: IRAGKnowledgeManager;
    loreManager: IMemoryManager;
    cacheManager: ICacheManager;
    services: Map<ServiceType, Service>;
    clients: ClientInstance[];
    initialize(): Promise<void>;
    registerMemoryManager(manager: IMemoryManager): void;
    getMemoryManager(name: string): IMemoryManager | null;
    getService<T extends Service>(service: ServiceType): T | null;
    registerService(service: Service): void;
    getSetting(key: string): string | null;
    getConversationLength(): number;
    processActions(message: Memory, responses: Memory[], state?: State, callback?: HandlerCallback): Promise<void>;
    evaluate(message: Memory, state?: State, didRespond?: boolean, callback?: HandlerCallback): Promise<string[] | null>;
    ensureParticipantExists(userId: UUID, roomId: UUID): Promise<void>;
    ensureUserExists(userId: UUID, userName: string | null, name: string | null, source: string | null): Promise<void>;
    registerAction(action: Action): void;
    ensureConnection(userId: UUID, roomId: UUID, userName?: string, userScreenName?: string, source?: string): Promise<void>;
    ensureParticipantInRoom(userId: UUID, roomId: UUID): Promise<void>;
    ensureRoomExists(roomId: UUID): Promise<void>;
    composeState(message: Memory, additionalKeys?: {
        [key: string]: unknown;
    }): Promise<State>;
    updateRecentMessageState(state: State): Promise<State>;
}
interface IImageDescriptionService extends Service {
    describeImage(imageUrl: string): Promise<{
        title: string;
        description: string;
    }>;
}
interface ITranscriptionService extends Service {
    transcribeAttachment(audioBuffer: ArrayBuffer): Promise<string | null>;
    transcribeAttachmentLocally(audioBuffer: ArrayBuffer): Promise<string | null>;
    transcribe(audioBuffer: ArrayBuffer): Promise<string | null>;
    transcribeLocally(audioBuffer: ArrayBuffer): Promise<string | null>;
}
interface IVideoService extends Service {
    isVideoUrl(url: string): boolean;
    fetchVideoInfo(url: string): Promise<Media>;
    downloadVideo(videoInfo: Media): Promise<string>;
    processVideo(url: string, runtime: IAgentRuntime): Promise<Media>;
}
interface ITextGenerationService extends Service {
    initializeModel(): Promise<void>;
    queueMessageCompletion(context: string, temperature: number, stop: string[], frequency_penalty: number, presence_penalty: number, max_tokens: number): Promise<any>;
    queueTextCompletion(context: string, temperature: number, stop: string[], frequency_penalty: number, presence_penalty: number, max_tokens: number): Promise<string>;
    getEmbeddingResponse(input: string): Promise<number[] | undefined>;
}
interface IBrowserService extends Service {
    closeBrowser(): Promise<void>;
    getPageContent(url: string, runtime: IAgentRuntime): Promise<{
        title: string;
        description: string;
        bodyContent: string;
    }>;
}
interface ISpeechService extends Service {
    getInstance(): ISpeechService;
    generate(runtime: IAgentRuntime, text: string): Promise<Readable>;
}
interface IPdfService extends Service {
    getInstance(): IPdfService;
    convertPdfToText(pdfBuffer: Buffer): Promise<string>;
}
interface IAwsS3Service extends Service {
    uploadFile(imagePath: string, subDirectory: string, useSignedUrl: boolean, expiresIn: number): Promise<{
        success: boolean;
        url?: string;
        error?: string;
    }>;
    generateSignedUrl(fileName: string, expiresIn: number): Promise<string>;
}
interface UploadIrysResult {
    success: boolean;
    url?: string;
    error?: string;
    data?: any;
}
interface DataIrysFetchedFromGQL {
    success: boolean;
    data: any;
    error?: string;
}
interface GraphQLTag {
    name: string;
    values: any[];
}
declare enum IrysMessageType {
    REQUEST = "REQUEST",
    DATA_STORAGE = "DATA_STORAGE",
    REQUEST_RESPONSE = "REQUEST_RESPONSE"
}
declare enum IrysDataType {
    FILE = "FILE",
    IMAGE = "IMAGE",
    OTHER = "OTHER"
}
interface IrysTimestamp {
    from: number;
    to: number;
}
interface IIrysService extends Service {
    getDataFromAnAgent(agentsWalletPublicKeys: string[], tags: GraphQLTag[], timestamp: IrysTimestamp): Promise<DataIrysFetchedFromGQL>;
    workerUploadDataOnIrys(data: any, dataType: IrysDataType, messageType: IrysMessageType, serviceCategory: string[], protocol: string[], validationThreshold: number[], minimumProviders: number[], testProvider: boolean[], reputation: number[]): Promise<UploadIrysResult>;
    providerUploadDataOnIrys(data: any, dataType: IrysDataType, serviceCategory: string[], protocol: string[]): Promise<UploadIrysResult>;
}
interface ITeeLogService extends Service {
    getInstance(): ITeeLogService;
    log(agentId: string, roomId: string, userId: string, type: string, content: string): Promise<boolean>;
}
declare enum ServiceType {
    IMAGE_DESCRIPTION = "image_description",
    TRANSCRIPTION = "transcription",
    VIDEO = "video",
    TEXT_GENERATION = "text_generation",
    BROWSER = "browser",
    SPEECH_GENERATION = "speech_generation",
    PDF = "pdf",
    INTIFACE = "intiface",
    AWS_S3 = "aws_s3",
    BUTTPLUG = "buttplug",
    SLACK = "slack",
    VERIFIABLE_LOGGING = "verifiable_logging",
    IRYS = "irys",
    TEE_LOG = "tee_log",
    GOPLUS_SECURITY = "goplus_security",
    WEB_SEARCH = "web_search",
    EMAIL_AUTOMATION = "email_automation",
    NKN_CLIENT_SERVICE = "nkn_client_service"
}
declare enum LoggingLevel {
    DEBUG = "debug",
    VERBOSE = "verbose",
    NONE = "none"
}
type KnowledgeItem = {
    id: UUID;
    content: Content;
};
interface RAGKnowledgeItem {
    id: UUID;
    agentId: UUID;
    content: {
        text: string;
        metadata?: {
            isMain?: boolean;
            isChunk?: boolean;
            originalId?: UUID;
            chunkIndex?: number;
            source?: string;
            type?: string;
            isShared?: boolean;
            [key: string]: unknown;
        };
    };
    embedding?: Float32Array;
    createdAt?: number;
    similarity?: number;
    score?: number;
}
interface ActionResponse {
    like: boolean;
    retweet: boolean;
    quote?: boolean;
    reply?: boolean;
}
interface ISlackService extends Service {
    client: any;
}
declare enum TokenizerType {
    Auto = "auto",
    TikToken = "tiktoken"
}
declare enum TranscriptionProvider {
    OpenAI = "openai",
    Deepgram = "deepgram",
    Local = "local"
}
declare enum ActionTimelineType {
    ForYou = "foryou",
    Following = "following"
}
declare enum KnowledgeScope {
    SHARED = "shared",
    PRIVATE = "private"
}
declare enum CacheKeyPrefix {
    KNOWLEDGE = "knowledge"
}
interface DirectoryItem {
    directory: string;
    shared?: boolean;
}
interface ChunkRow {
    id: string;
}

/**
 * Composes a set of example conversations based on provided actions and a specified count.
 * It randomly selects examples from the provided actions and formats them with generated names.
 * @param actionsData - An array of `Action` objects from which to draw examples.
 * @param count - The number of examples to generate.
 * @returns A string containing formatted examples of conversations.
 */
declare const composeActionExamples: (actionsData: Action[], count: number) => string;
/**
 * Formats the names of the provided actions into a comma-separated string.
 * @param actions - An array of `Action` objects from which to extract names.
 * @returns A comma-separated string of action names.
 */
declare function formatActionNames(actions: Action[]): string;
/**
 * Formats the provided actions into a detailed string listing each action's name and description, separated by commas and newlines.
 * @param actions - An array of `Action` objects to format.
 * @returns A detailed string of actions, including names and descriptions.
 */
declare function formatActions(actions: Action[]): string;

interface ICacheAdapter {
    get(key: string): Promise<string | undefined>;
    set(key: string, value: string): Promise<void>;
    delete(key: string): Promise<void>;
}
declare class MemoryCacheAdapter implements ICacheAdapter {
    _adapter: MemoryCacheAdapter$1;
    constructor(initalData?: Map<string, string>);
    get(key: string): Promise<string | undefined>;
    set(key: string, value: string): Promise<void>;
    delete(key: string): Promise<void>;
}
declare class FsCacheAdapter implements ICacheAdapter {
    private dataDir;
    _adapter: FsCacheAdapter$1;
    constructor(dataDir: string);
    get(key: string): Promise<string | undefined>;
    set(key: string, value: string): Promise<void>;
    delete(key: string): Promise<void>;
}
declare class DbCacheAdapter implements ICacheAdapter {
    private db;
    private agentId;
    _adapter: DbCacheAdapter$1;
    constructor(db: IDatabaseCacheAdapter, agentId: UUID);
    get(key: string): Promise<string | undefined>;
    set(key: string, value: string): Promise<void>;
    delete(key: string): Promise<void>;
}
declare class CacheManager<CacheAdapter extends ICacheAdapter = ICacheAdapter> implements ICacheManager {
    _adapter: CacheManager$1;
    adapter: CacheAdapter;
    constructor(adapter: CacheAdapter);
    get<T = unknown>(key: string): Promise<T | undefined>;
    set<T>(key: string, value: T, opts?: CacheOptions): Promise<void>;
    delete(key: string): Promise<void>;
}

/**
 * Composes a context string by replacing placeholders in a template with corresponding values from the state.
 *
 * This function takes a template string with placeholders in the format `{{placeholder}}` and a state object.
 * It replaces each placeholder with the value from the state object that matches the placeholder's name.
 * If a matching key is not found in the state object for a given placeholder, the placeholder is replaced with an empty string.
 *
 * By default, this function uses a simple string replacement approach. However, when `templatingEngine` is set to `'handlebars'`, it uses Handlebars templating engine instead, compiling the template into a reusable function and evaluating it with the provided state object.
 *
 * @param {Object} params - The parameters for composing the context.
 * @param {State} params.state - The state object containing values to replace the placeholders in the template.
 * @param {TemplateType} params.template - The template string or function containing placeholders to be replaced with state values.
 * @param {"handlebars" | undefined} [params.templatingEngine] - The templating engine to use for compiling and evaluating the template (optional, default: `undefined`).
 * @returns {string} The composed context string with placeholders replaced by corresponding state values.
 *
 * @example
 * // Given a state object and a template
 * const state = { userName: "Alice", userAge: 30 };
 * const template = "Hello, {{userName}}! You are {{userAge}} years old";
 *
 * // Composing the context with simple string replacement will result in:
 * // "Hello, Alice! You are 30 years old."
 * const contextSimple = composeContext({ state, template });
 *
 * // Using composeContext with a template function for dynamic template
 * const template = ({ state }) => {
 * const tone = Math.random() > 0.5 ? "kind" : "rude";
 *   return `Hello, {{userName}}! You are {{userAge}} years old. Be ${tone}`;
 * };
 * const contextSimple = composeContext({ state, template });
 */
declare const composeContext: ({ state, template, templatingEngine, }: {
    state: State;
    template: TemplateType;
    templatingEngine?: "handlebars";
}) => string;
/**
 * Adds a header to a body of text.
 *
 * This function takes a header string and a body string and returns a new string with the header prepended to the body.
 * If the body string is empty, the header is returned as is.
 *
 * @param {string} header - The header to add to the body.
 * @param {string} body - The body to which to add the header.
 * @returns {string} The body with the header prepended.
 *
 * @example
 * // Given a header and a body
 * const header = "Header";
 * const body = "Body";
 *
 * // Adding the header to the body will result in:
 * // "Header\nBody"
 * const text = addHeader(header, body);
 */
declare const addHeader: (header: string, body: string) => string;
/**
 * Generates a string with random user names populated in a template.
 *
 * This function generates a specified number of random user names and populates placeholders
 * in the provided template with these names. Placeholders in the template should follow the format `{{userX}}`
 * where `X` is the position of the user (e.g., `{{user1}}`, `{{user2}}`).
 *
 * @param {string} params.template - The template string containing placeholders for random user names.
 * @param {number} params.length - The number of random user names to generate.
 * @returns {string} The template string with placeholders replaced by random user names.
 *
 * @example
 * // Given a template and a length
 * const template = "Hello, {{user1}}! Meet {{user2}} and {{user3}}.";
 * const length = 3;
 *
 * // Composing the random user string will result in:
 * // "Hello, John! Meet Alice and Bob."
 * const result = composeRandomUser({ template, length });
 */
declare const composeRandomUser: (template: string, length: number) => string;

type DatabaseAdapter = DatabaseAdapter$1;

declare const EmbeddingProvider: {
    readonly OpenAI: "OpenAI";
    readonly Ollama: "Ollama";
    readonly GaiaNet: "GaiaNet";
    readonly Heurist: "Heurist";
    readonly BGE: "BGE";
    readonly Custom: "Custom";
};
type EmbeddingProviderType = (typeof EmbeddingProvider)[keyof typeof EmbeddingProvider];
type EmbeddingConfig = {
    readonly dimensions: number;
    readonly model: string;
    readonly provider: EmbeddingProviderType;
};
declare const getEmbeddingConfig: () => _elizaos_core.EmbeddingConfig;
declare function getEmbeddingType(runtime: IAgentRuntime): "local" | "remote";
declare function getEmbeddingZeroVector(): number[];
/**
 * Gets embeddings from a remote API endpoint.  Falls back to local BGE/384
 *
 * @param {string} input - The text to generate embeddings for
 * @param {EmbeddingOptions} options - Configuration options including:
 *   - model: The model name to use
 *   - endpoint: Base API endpoint URL
 *   - apiKey: Optional API key for authentication
 *   - isOllama: Whether this is an Ollama endpoint
 *   - dimensions: Desired embedding dimensions
 * @param {IAgentRuntime} runtime - The agent runtime context
 * @returns {Promise<number[]>} Array of embedding values
 * @throws {Error} If the API request fails
 */
declare function embed(runtime: IAgentRuntime, input: string): Promise<number[]>;

declare const envSchema: zod.ZodObject<{
    OPENAI_API_KEY: zod.ZodString;
    REDPILL_API_KEY: zod.ZodString;
    GROK_API_KEY: zod.ZodString;
    GROQ_API_KEY: zod.ZodString;
    OPENROUTER_API_KEY: zod.ZodString;
    AIMLAPI_API_KEY: zod.ZodString;
    GOOGLE_GENERATIVE_AI_API_KEY: zod.ZodString;
    ELEVENLABS_XI_API_KEY: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    OPENAI_API_KEY?: string;
    REDPILL_API_KEY?: string;
    GROK_API_KEY?: string;
    GROQ_API_KEY?: string;
    OPENROUTER_API_KEY?: string;
    AIMLAPI_API_KEY?: string;
    GOOGLE_GENERATIVE_AI_API_KEY?: string;
    ELEVENLABS_XI_API_KEY?: string;
}, {
    OPENAI_API_KEY?: string;
    REDPILL_API_KEY?: string;
    GROK_API_KEY?: string;
    GROQ_API_KEY?: string;
    OPENROUTER_API_KEY?: string;
    AIMLAPI_API_KEY?: string;
    GOOGLE_GENERATIVE_AI_API_KEY?: string;
    ELEVENLABS_XI_API_KEY?: string;
}>;
type EnvConfig = EnvConfig$1;
declare function validateEnv(): EnvConfig;
declare const CharacterSchema: zod.ZodObject<{
    id: zod.ZodOptional<zod.ZodString>;
    name: zod.ZodString;
    system: zod.ZodOptional<zod.ZodString>;
    modelProvider: zod.ZodNativeEnum<typeof _elizaos_core.ModelProviderName>;
    modelEndpointOverride: zod.ZodOptional<zod.ZodString>;
    templates: zod.ZodOptional<zod.ZodRecord<zod.ZodString, zod.ZodString>>;
    bio: zod.ZodUnion<[zod.ZodString, zod.ZodArray<zod.ZodString, "many">]>;
    lore: zod.ZodArray<zod.ZodString, "many">;
    messageExamples: zod.ZodArray<zod.ZodArray<zod.ZodObject<{
        user: zod.ZodString;
        content: zod.ZodIntersection<zod.ZodObject<{
            text: zod.ZodString;
            action: zod.ZodOptional<zod.ZodString>;
            source: zod.ZodOptional<zod.ZodString>;
            url: zod.ZodOptional<zod.ZodString>;
            inReplyTo: zod.ZodOptional<zod.ZodString>;
            attachments: zod.ZodOptional<zod.ZodArray<zod.ZodAny, "many">>;
        }, "strip", zod.ZodTypeAny, {
            text?: string;
            action?: string;
            source?: string;
            url?: string;
            inReplyTo?: string;
            attachments?: any[];
        }, {
            text?: string;
            action?: string;
            source?: string;
            url?: string;
            inReplyTo?: string;
            attachments?: any[];
        }>, zod.ZodRecord<zod.ZodString, zod.ZodUnknown>>;
    }, "strip", zod.ZodTypeAny, {
        user?: string;
        content?: {
            text?: string;
            action?: string;
            source?: string;
            url?: string;
            inReplyTo?: string;
            attachments?: any[];
        } & Record<string, unknown>;
    }, {
        user?: string;
        content?: {
            text?: string;
            action?: string;
            source?: string;
            url?: string;
            inReplyTo?: string;
            attachments?: any[];
        } & Record<string, unknown>;
    }>, "many">, "many">;
    postExamples: zod.ZodArray<zod.ZodString, "many">;
    topics: zod.ZodArray<zod.ZodString, "many">;
    adjectives: zod.ZodArray<zod.ZodString, "many">;
    knowledge: zod.ZodOptional<zod.ZodArray<zod.ZodUnion<[zod.ZodString, zod.ZodObject<{
        path: zod.ZodString;
        shared: zod.ZodOptional<zod.ZodBoolean>;
    }, "strip", zod.ZodTypeAny, {
        shared?: boolean;
        path?: string;
    }, {
        shared?: boolean;
        path?: string;
    }>, zod.ZodObject<{
        directory: zod.ZodString;
        shared: zod.ZodOptional<zod.ZodBoolean>;
    }, "strip", zod.ZodTypeAny, {
        shared?: boolean;
        directory?: string;
    }, {
        shared?: boolean;
        directory?: string;
    }>]>, "many">>;
    plugins: zod.ZodUnion<[zod.ZodArray<zod.ZodString, "many">, zod.ZodArray<zod.ZodObject<{
        name: zod.ZodString;
        description: zod.ZodString;
        actions: zod.ZodOptional<zod.ZodArray<zod.ZodAny, "many">>;
        providers: zod.ZodOptional<zod.ZodArray<zod.ZodAny, "many">>;
        evaluators: zod.ZodOptional<zod.ZodArray<zod.ZodAny, "many">>;
        services: zod.ZodOptional<zod.ZodArray<zod.ZodAny, "many">>;
        clients: zod.ZodOptional<zod.ZodArray<zod.ZodAny, "many">>;
    }, "strip", zod.ZodTypeAny, {
        actions?: any[];
        providers?: any[];
        name?: string;
        description?: string;
        evaluators?: any[];
        services?: any[];
        clients?: any[];
    }, {
        actions?: any[];
        providers?: any[];
        name?: string;
        description?: string;
        evaluators?: any[];
        services?: any[];
        clients?: any[];
    }>, "many">]>;
    settings: zod.ZodOptional<zod.ZodObject<{
        secrets: zod.ZodOptional<zod.ZodRecord<zod.ZodString, zod.ZodString>>;
        voice: zod.ZodOptional<zod.ZodObject<{
            model: zod.ZodOptional<zod.ZodString>;
            url: zod.ZodOptional<zod.ZodString>;
        }, "strip", zod.ZodTypeAny, {
            url?: string;
            model?: string;
        }, {
            url?: string;
            model?: string;
        }>>;
        model: zod.ZodOptional<zod.ZodString>;
        modelConfig: zod.ZodOptional<zod.ZodObject<{
            maxInputTokens: zod.ZodOptional<zod.ZodNumber>;
            maxOutputTokens: zod.ZodOptional<zod.ZodNumber>;
            temperature: zod.ZodOptional<zod.ZodNumber>;
            frequency_penalty: zod.ZodOptional<zod.ZodNumber>;
            presence_penalty: zod.ZodOptional<zod.ZodNumber>;
        }, "strip", zod.ZodTypeAny, {
            temperature?: number;
            maxInputTokens?: number;
            maxOutputTokens?: number;
            frequency_penalty?: number;
            presence_penalty?: number;
        }, {
            temperature?: number;
            maxInputTokens?: number;
            maxOutputTokens?: number;
            frequency_penalty?: number;
            presence_penalty?: number;
        }>>;
        embeddingModel: zod.ZodOptional<zod.ZodString>;
    }, "strip", zod.ZodTypeAny, {
        model?: string;
        secrets?: Record<string, string>;
        voice?: {
            url?: string;
            model?: string;
        };
        modelConfig?: {
            temperature?: number;
            maxInputTokens?: number;
            maxOutputTokens?: number;
            frequency_penalty?: number;
            presence_penalty?: number;
        };
        embeddingModel?: string;
    }, {
        model?: string;
        secrets?: Record<string, string>;
        voice?: {
            url?: string;
            model?: string;
        };
        modelConfig?: {
            temperature?: number;
            maxInputTokens?: number;
            maxOutputTokens?: number;
            frequency_penalty?: number;
            presence_penalty?: number;
        };
        embeddingModel?: string;
    }>>;
    clientConfig: zod.ZodOptional<zod.ZodObject<{
        discord: zod.ZodOptional<zod.ZodObject<{
            shouldIgnoreBotMessages: zod.ZodOptional<zod.ZodBoolean>;
            shouldIgnoreDirectMessages: zod.ZodOptional<zod.ZodBoolean>;
        }, "strip", zod.ZodTypeAny, {
            shouldIgnoreBotMessages?: boolean;
            shouldIgnoreDirectMessages?: boolean;
        }, {
            shouldIgnoreBotMessages?: boolean;
            shouldIgnoreDirectMessages?: boolean;
        }>>;
        telegram: zod.ZodOptional<zod.ZodObject<{
            shouldIgnoreBotMessages: zod.ZodOptional<zod.ZodBoolean>;
            shouldIgnoreDirectMessages: zod.ZodOptional<zod.ZodBoolean>;
        }, "strip", zod.ZodTypeAny, {
            shouldIgnoreBotMessages?: boolean;
            shouldIgnoreDirectMessages?: boolean;
        }, {
            shouldIgnoreBotMessages?: boolean;
            shouldIgnoreDirectMessages?: boolean;
        }>>;
    }, "strip", zod.ZodTypeAny, {
        discord?: {
            shouldIgnoreBotMessages?: boolean;
            shouldIgnoreDirectMessages?: boolean;
        };
        telegram?: {
            shouldIgnoreBotMessages?: boolean;
            shouldIgnoreDirectMessages?: boolean;
        };
    }, {
        discord?: {
            shouldIgnoreBotMessages?: boolean;
            shouldIgnoreDirectMessages?: boolean;
        };
        telegram?: {
            shouldIgnoreBotMessages?: boolean;
            shouldIgnoreDirectMessages?: boolean;
        };
    }>>;
    style: zod.ZodObject<{
        all: zod.ZodArray<zod.ZodString, "many">;
        chat: zod.ZodArray<zod.ZodString, "many">;
        post: zod.ZodArray<zod.ZodString, "many">;
    }, "strip", zod.ZodTypeAny, {
        all?: string[];
        chat?: string[];
        post?: string[];
    }, {
        all?: string[];
        chat?: string[];
        post?: string[];
    }>;
    twitterProfile: zod.ZodOptional<zod.ZodObject<{
        username: zod.ZodString;
        screenName: zod.ZodString;
        bio: zod.ZodString;
        nicknames: zod.ZodOptional<zod.ZodArray<zod.ZodString, "many">>;
    }, "strip", zod.ZodTypeAny, {
        bio?: string;
        username?: string;
        screenName?: string;
        nicknames?: string[];
    }, {
        bio?: string;
        username?: string;
        screenName?: string;
        nicknames?: string[];
    }>>;
    nft: zod.ZodOptional<zod.ZodObject<{
        prompt: zod.ZodOptional<zod.ZodString>;
    }, "strip", zod.ZodTypeAny, {
        prompt?: string;
    }, {
        prompt?: string;
    }>>;
    extends: zod.ZodOptional<zod.ZodArray<zod.ZodString, "many">>;
}, "strip", zod.ZodTypeAny, {
    bio?: string | string[];
    lore?: string[];
    knowledge?: (string | {
        shared?: boolean;
        path?: string;
    } | {
        shared?: boolean;
        directory?: string;
    })[];
    name?: string;
    settings?: {
        model?: string;
        secrets?: Record<string, string>;
        voice?: {
            url?: string;
            model?: string;
        };
        modelConfig?: {
            temperature?: number;
            maxInputTokens?: number;
            maxOutputTokens?: number;
            frequency_penalty?: number;
            presence_penalty?: number;
        };
        embeddingModel?: string;
    };
    modelProvider?: _elizaos_core.ModelProviderName;
    id?: string;
    system?: string;
    plugins?: string[] | {
        actions?: any[];
        providers?: any[];
        name?: string;
        description?: string;
        evaluators?: any[];
        services?: any[];
        clients?: any[];
    }[];
    topics?: string[];
    modelEndpointOverride?: string;
    templates?: Record<string, string>;
    messageExamples?: {
        user?: string;
        content?: {
            text?: string;
            action?: string;
            source?: string;
            url?: string;
            inReplyTo?: string;
            attachments?: any[];
        } & Record<string, unknown>;
    }[][];
    postExamples?: string[];
    adjectives?: string[];
    clientConfig?: {
        discord?: {
            shouldIgnoreBotMessages?: boolean;
            shouldIgnoreDirectMessages?: boolean;
        };
        telegram?: {
            shouldIgnoreBotMessages?: boolean;
            shouldIgnoreDirectMessages?: boolean;
        };
    };
    style?: {
        all?: string[];
        chat?: string[];
        post?: string[];
    };
    twitterProfile?: {
        bio?: string;
        username?: string;
        screenName?: string;
        nicknames?: string[];
    };
    nft?: {
        prompt?: string;
    };
    extends?: string[];
}, {
    bio?: string | string[];
    lore?: string[];
    knowledge?: (string | {
        shared?: boolean;
        path?: string;
    } | {
        shared?: boolean;
        directory?: string;
    })[];
    name?: string;
    settings?: {
        model?: string;
        secrets?: Record<string, string>;
        voice?: {
            url?: string;
            model?: string;
        };
        modelConfig?: {
            temperature?: number;
            maxInputTokens?: number;
            maxOutputTokens?: number;
            frequency_penalty?: number;
            presence_penalty?: number;
        };
        embeddingModel?: string;
    };
    modelProvider?: _elizaos_core.ModelProviderName;
    id?: string;
    system?: string;
    plugins?: string[] | {
        actions?: any[];
        providers?: any[];
        name?: string;
        description?: string;
        evaluators?: any[];
        services?: any[];
        clients?: any[];
    }[];
    topics?: string[];
    modelEndpointOverride?: string;
    templates?: Record<string, string>;
    messageExamples?: {
        user?: string;
        content?: {
            text?: string;
            action?: string;
            source?: string;
            url?: string;
            inReplyTo?: string;
            attachments?: any[];
        } & Record<string, unknown>;
    }[][];
    postExamples?: string[];
    adjectives?: string[];
    clientConfig?: {
        discord?: {
            shouldIgnoreBotMessages?: boolean;
            shouldIgnoreDirectMessages?: boolean;
        };
        telegram?: {
            shouldIgnoreBotMessages?: boolean;
            shouldIgnoreDirectMessages?: boolean;
        };
    };
    style?: {
        all?: string[];
        chat?: string[];
        post?: string[];
    };
    twitterProfile?: {
        bio?: string;
        username?: string;
        screenName?: string;
        nicknames?: string[];
    };
    nft?: {
        prompt?: string;
    };
    extends?: string[];
}>;
type CharacterConfig = CharacterConfig$1;
declare function validateCharacterConfig(json: unknown): CharacterConfig;

/**
 * Template used for the evaluation generateText.
 */
declare const evaluationTemplate: string;
/**
 * Formats the names of evaluators into a comma-separated list, each enclosed in single quotes.
 * @param evaluators - An array of evaluator objects.
 * @returns A string that concatenates the names of all evaluators, each enclosed in single quotes and separated by commas.
 */
declare function formatEvaluatorNames(evaluators: Evaluator[]): string;
/**
 * Formats evaluator details into a string, including both the name and description of each evaluator.
 * @param evaluators - An array of evaluator objects.
 * @returns A string that concatenates the name and description of each evaluator, separated by a colon and a newline character.
 */
declare function formatEvaluators(evaluators: Evaluator[]): string;
/**
 * Formats evaluator examples into a readable string, replacing placeholders with generated names.
 * @param evaluators - An array of evaluator objects, each containing examples to format.
 * @returns A string that presents each evaluator example in a structured format, including context, messages, and outcomes, with placeholders replaced by generated names.
 */
declare function formatEvaluatorExamples(evaluators: Evaluator[]): string;
/**
 * Generates a string summarizing the descriptions of each evaluator example.
 * @param evaluators - An array of evaluator objects, each containing examples.
 * @returns A string that summarizes the descriptions for each evaluator example, formatted with the evaluator name, example number, and description.
 */
declare function formatEvaluatorExampleDescriptions(evaluators: Evaluator[]): string;

type Tool = CoreTool<any, any>;
type StepResult = StepResult$1<any>;
type GenerationResult = GenerateObjectResult<unknown>;
/**
 * Base settings for model generation.
 */
interface ModelSettings {
    prompt: string;
    temperature: number;
    maxTokens: number;
    frequencyPenalty: number;
    presencePenalty: number;
    stop?: string[];
    experimental_telemetry?: TelemetrySettings;
}
interface ProviderOptions {
    runtime: IAgentRuntime;
    provider: ModelProviderName;
    model: string;
    apiKey: string;
    schema?: ZodSchema;
    schemaName?: string;
    schemaDescription?: string;
    mode?: "auto" | "json" | "tool";
    modelOptions: ModelSettings;
    modelClass: ModelClass;
    context: string;
}
/**
 * Trims the provided text context to a specified token limit using a tokenizer model and type.
 *
 * The function dynamically determines the truncation method based on the tokenizer settings
 * provided by the runtime. If no tokenizer settings are defined, it defaults to using the
 * TikToken truncation method with the "gpt-4o" model.
 *
 * @async
 * @function trimTokens
 * @param {string} context - The text to be tokenized and trimmed.
 * @param {number} maxTokens - The maximum number of tokens allowed after truncation.
 * @param {IAgentRuntime} runtime - The runtime interface providing tokenizer settings.
 *
 * @returns {Promise<string>} A promise that resolves to the trimmed text.
 *
 * @throws {Error} Throws an error if the runtime settings are invalid or missing required fields.
 *
 * @example
 * const trimmedText = await trimTokens("This is an example text", 50, runtime);
 * console.log(trimmedText); // Output will be a truncated version of the input text.
 */
declare function trimTokens(context: string, maxTokens: number, runtime: IAgentRuntime): Promise<string>;
/**
 * Send a message to the model for a text generateText - receive a string back and parse how you'd like
 * @param opts - The options for the generateText request.
 * @param opts.context The context of the message to be completed.
 * @param opts.stop A list of strings to stop the generateText at.
 * @param opts.model The model to use for generateText.
 * @param opts.frequency_penalty The frequency penalty to apply to the generateText.
 * @param opts.presence_penalty The presence penalty to apply to the generateText.
 * @param opts.temperature The temperature to apply to the generateText.
 * @param opts.max_context_length The maximum length of the context to apply to the generateText.
 * @returns The completed message.
 */
declare function generateText({ runtime, context, modelClass, tools, onStepFinish, maxSteps, stop, customSystemPrompt, }: {
    runtime: IAgentRuntime;
    context: string;
    modelClass: ModelClass;
    tools?: Record<string, Tool>;
    onStepFinish?: (event: StepResult) => Promise<void> | void;
    maxSteps?: number;
    stop?: string[];
    customSystemPrompt?: string;
}): Promise<string>;
/**
 * Sends a message to the model to determine if it should respond to the given context.
 * @param opts - The options for the generateText request
 * @param opts.context The context to evaluate for response
 * @param opts.stop A list of strings to stop the generateText at
 * @param opts.model The model to use for generateText
 * @param opts.frequency_penalty The frequency penalty to apply (0.0 to 2.0)
 * @param opts.presence_penalty The presence penalty to apply (0.0 to 2.0)
 * @param opts.temperature The temperature to control randomness (0.0 to 2.0)
 * @param opts.serverUrl The URL of the API server
 * @param opts.max_context_length Maximum allowed context length in tokens
 * @param opts.max_response_length Maximum allowed response length in tokens
 * @returns Promise resolving to "RESPOND", "IGNORE", "STOP" or null
 */
declare function generateShouldRespond({ runtime, context, modelClass, }: {
    runtime: IAgentRuntime;
    context: string;
    modelClass: ModelClass;
}): Promise<"RESPOND" | "IGNORE" | "STOP" | null>;
/**
 * Splits content into chunks of specified size with optional overlapping bleed sections
 * @param content - The text content to split into chunks
 * @param chunkSize - The maximum size of each chunk in tokens
 * @param bleed - Number of characters to overlap between chunks (default: 100)
 * @returns Promise resolving to array of text chunks with bleed sections
 */
declare function splitChunks(content: string, chunkSize?: number, bleed?: number): Promise<string[]>;
declare function splitText(content: string, chunkSize: number, bleed: number): string[];
/**
 * Sends a message to the model and parses the response as a boolean value
 * @param opts - The options for the generateText request
 * @param opts.context The context to evaluate for the boolean response
 * @param opts.stop A list of strings to stop the generateText at
 * @param opts.model The model to use for generateText
 * @param opts.frequency_penalty The frequency penalty to apply (0.0 to 2.0)
 * @param opts.presence_penalty The presence penalty to apply (0.0 to 2.0)
 * @param opts.temperature The temperature to control randomness (0.0 to 2.0)
 * @param opts.serverUrl The URL of the API server
 * @param opts.max_context_length Maximum allowed context length in tokens
 * @param opts.max_response_length Maximum allowed response length in tokens
 * @returns Promise resolving to a boolean value parsed from the model's response
 */
declare function generateTrueOrFalse({ runtime, context, modelClass, }: {
    runtime: IAgentRuntime;
    context: string;
    modelClass: ModelClass;
}): Promise<boolean>;
/**
 * Send a message to the model and parse the response as a string array
 * @param opts - The options for the generateText request
 * @param opts.context The context/prompt to send to the model
 * @param opts.stop Array of strings that will stop the model's generation if encountered
 * @param opts.model The language model to use
 * @param opts.frequency_penalty The frequency penalty to apply (0.0 to 2.0)
 * @param opts.presence_penalty The presence penalty to apply (0.0 to 2.0)
 * @param opts.temperature The temperature to control randomness (0.0 to 2.0)
 * @param opts.serverUrl The URL of the API server
 * @param opts.token The API token for authentication
 * @param opts.max_context_length Maximum allowed context length in tokens
 * @param opts.max_response_length Maximum allowed response length in tokens
 * @returns Promise resolving to an array of strings parsed from the model's response
 */
declare function generateTextArray({ runtime, context, modelClass, }: {
    runtime: IAgentRuntime;
    context: string;
    modelClass: ModelClass;
}): Promise<string[]>;
declare function generateObjectDeprecated({ runtime, context, modelClass, }: {
    runtime: IAgentRuntime;
    context: string;
    modelClass: ModelClass;
}): Promise<any>;
declare function generateObjectArray({ runtime, context, modelClass, }: {
    runtime: IAgentRuntime;
    context: string;
    modelClass: ModelClass;
}): Promise<any[]>;
/**
 * Send a message to the model for generateText.
 * @param opts - The options for the generateText request.
 * @param opts.context The context of the message to be completed.
 * @param opts.stop A list of strings to stop the generateText at.
 * @param opts.model The model to use for generateText.
 * @param opts.frequency_penalty The frequency penalty to apply to the generateText.
 * @param opts.presence_penalty The presence penalty to apply to the generateText.
 * @param opts.temperature The temperature to apply to the generateText.
 * @param opts.max_context_length The maximum length of the context to apply to the generateText.
 * @returns The completed message.
 */
declare function generateMessageResponse({ runtime, context, modelClass, }: {
    runtime: IAgentRuntime;
    context: string;
    modelClass: ModelClass;
}): Promise<Content>;
declare const generateImage: (data: {
    prompt: string;
    width: number;
    height: number;
    count?: number;
    negativePrompt?: string;
    numIterations?: number;
    guidanceScale?: number;
    seed?: number;
    modelId?: string;
    jobId?: string;
    stylePreset?: string;
    hideWatermark?: boolean;
    safeMode?: boolean;
    cfgScale?: number;
}, runtime: IAgentRuntime) => Promise<{
    success: boolean;
    data?: string[];
    error?: any;
}>;
declare const generateCaption: (data: {
    imageUrl: string;
}, runtime: IAgentRuntime) => Promise<{
    title: string;
    description: string;
}>;
/**
 * Configuration options for generating objects with a model.
 */
interface GenerationOptions {
    runtime: IAgentRuntime;
    context: string;
    modelClass: ModelClass;
    schema?: ZodSchema;
    schemaName?: string;
    schemaDescription?: string;
    stop?: string[];
    mode?: "auto" | "json" | "tool";
    experimental_providerMetadata?: Record<string, unknown>;
}
/**
 * Generates structured objects from a prompt using specified AI models and configuration options.
 *
 * @param {GenerationOptions} options - Configuration options for generating objects.
 * @returns {Promise<any[]>} - A promise that resolves to an array of generated objects.
 * @throws {Error} - Throws an error if the provider is unsupported or if generation fails.
 */
declare const generateObject: ({ runtime, context, modelClass, schema, schemaName, schemaDescription, stop, mode, }: GenerationOptions) => Promise<GenerateObjectResult<unknown>>;
/**
 * Handles AI generation based on the specified provider.
 *
 * @param {ProviderOptions} options - Configuration options specific to the provider.
 * @returns {Promise<any[]>} - A promise that resolves to an array of generated objects.
 */
declare function handleProvider(options: ProviderOptions): Promise<GenerationResult>;
declare function generateTweetActions({ runtime, context, modelClass, }: {
    runtime: IAgentRuntime;
    context: string;
    modelClass: ModelClass;
}): Promise<ActionResponse | null>;

declare const getGoals: ({ runtime, roomId, userId, onlyInProgress, count, }: {
    runtime: IAgentRuntime;
    roomId: UUID;
    userId?: UUID;
    onlyInProgress?: boolean;
    count?: number;
}) => Promise<_elizaos_core.Goal[]>;
declare const formatGoalsAsString: ({ goals }: {
    goals: Goal[];
}) => string;
declare const updateGoal: ({ runtime, goal, }: {
    runtime: IAgentRuntime;
    goal: Goal;
}) => Promise<void>;
declare const createGoal: ({ runtime, goal, }: {
    runtime: IAgentRuntime;
    goal: Goal;
}) => Promise<void>;

declare function get(runtime: IAgentRuntime, message: Memory): Promise<KnowledgeItem[]>;
declare function set(runtime: IAgentRuntime, item: KnowledgeItem, chunkSize?: number, bleed?: number): Promise<void>;
declare function preprocess(content: string): string;
declare const _default: {
    get: typeof get;
    set: typeof set;
    preprocess: typeof preprocess;
};

type LogMethod = (...args: any[]) => void;
declare const logger: Record<'trace' | 'debug' | 'success' | 'progress' | 'log' | 'info' | 'warn' | 'error' | 'fatal', LogMethod> & {
    clear: () => void;
};

declare const elizaLogger: Record<"debug" | "fatal" | "error" | "warn" | "info" | "log" | "progress" | "success" | "trace", LogMethod> & {
    clear: () => void;
};

declare class MemoryManager implements IMemoryManager {
    private _mm;
    /**
     * The AgentRuntime instance associated with this manager.
     */
    runtime: IAgentRuntime;
    /**
     * The name of the database table this manager operates on.
     */
    tableName: string;
    /**
     * Constructs a new MemoryManager instance.
     * @param opts Options for the manager.
     * @param opts.tableName The name of the table this manager will operate on.
     * @param opts.runtime The AgentRuntime instance associated with this manager.
     */
    constructor(opts: {
        tableName: string;
        runtime: IAgentRuntime;
    });
    /**
     * Adds an embedding vector to a memory object if one doesn't already exist.
     * The embedding is generated from the memory's text content using the runtime's
     * embedding model. If the memory has no text content, an error is thrown.
     *
     * @param memory The memory object to add an embedding to
     * @returns The memory object with an embedding vector added
     * @throws Error if the memory content is empty
     */
    addEmbeddingToMemory(memory: Memory): Promise<Memory>;
    /**
     * Retrieves a list of memories by user IDs, with optional deduplication.
     * @param opts Options including user IDs, count, and uniqueness.
     * @param opts.roomId The room ID to retrieve memories for.
     * @param opts.count The number of memories to retrieve.
     * @param opts.unique Whether to retrieve unique memories only.
     * @returns A Promise resolving to an array of Memory objects.
     */
    getMemories({ roomId, count, unique, start, end, }: {
        roomId: UUID;
        count?: number;
        unique?: boolean;
        start?: number;
        end?: number;
    }): Promise<Memory[]>;
    getCachedEmbeddings(content: string): Promise<{
        embedding: number[];
        levenshtein_score: number;
    }[]>;
    /**
     * Searches for memories similar to a given embedding vector.
     * @param embedding The embedding vector to search with.
     * @param opts Options including match threshold, count, user IDs, and uniqueness.
     * @param opts.match_threshold The similarity threshold for matching memories.
     * @param opts.count The maximum number of memories to retrieve.
     * @param opts.roomId The room ID to retrieve memories for.
     * @param opts.unique Whether to retrieve unique memories only.
     * @returns A Promise resolving to an array of Memory objects that match the embedding.
     */
    searchMemoriesByEmbedding(embedding: number[], opts: {
        match_threshold?: number;
        count?: number;
        roomId: UUID;
        unique?: boolean;
    }): Promise<Memory[]>;
    /**
     * Creates a new memory in the database, with an option to check for similarity before insertion.
     * @param memory The memory object to create.
     * @param unique Whether to check for similarity before insertion.
     * @returns A Promise that resolves when the operation completes.
     */
    createMemory(memory: Memory, unique?: boolean): Promise<void>;
    getMemoriesByRoomIds(params: {
        roomIds: UUID[];
        limit?: number;
    }): Promise<Memory[]>;
    getMemoriesByIds(ids: UUID[]): Promise<Memory[]>;
    getMemoryById(id: UUID): Promise<Memory | null>;
    /**
     * Removes a memory from the database by its ID.
     * @param memoryId The ID of the memory to remove.
     * @returns A Promise that resolves when the operation completes.
     */
    removeMemory(memoryId: UUID): Promise<void>;
    /**
     * Removes all memories associated with a set of user IDs.
     * @param roomId The room ID to remove memories for.
     * @returns A Promise that resolves when the operation completes.
     */
    removeAllMemories(roomId: UUID): Promise<void>;
    /**
     * Counts the number of memories associated with a set of user IDs, with an option for uniqueness.
     * @param roomId The room ID to count memories for.
     * @param unique Whether to count unique memories only.
     * @returns A Promise resolving to the count of memories.
     */
    countMemories(roomId: UUID, unique?: boolean): Promise<number>;
}

declare const messageCompletionFooter = "\nResponse format should be formatted in a valid JSON block like this:\n```json\n{ \"user\": \"{{agentName}}\", \"text\": \"<string>\", \"action\": \"<string>\" }\n```\n\nThe \u201Caction\u201D field should be one of the options in [Available Actions] and the \"text\" field should be the response you want to send.\n";
declare const shouldRespondFooter = "The available options are [RESPOND], [IGNORE], or [STOP]. Choose the most appropriate option.\nIf {{agentName}} is talking too much, you can choose [IGNORE]\n\nYour response must include one of the options.";
declare const parseShouldRespondFromText: (text: string) => "RESPOND" | "IGNORE" | "STOP" | null;
declare const booleanFooter = "Respond with only a YES or a NO.";
/**
 * Parses a string to determine its boolean equivalent.
 *
 * Recognized affirmative values: "YES", "Y", "TRUE", "T", "1", "ON", "ENABLE".
 * Recognized negative values: "NO", "N", "FALSE", "F", "0", "OFF", "DISABLE".
 *
 * @param {string} text - The input text to parse.
 * @returns {boolean|null} - Returns `true` for affirmative inputs, `false` for negative inputs, and `null` for unrecognized inputs or null/undefined.
 */
declare const parseBooleanFromText: (text: string) => void;
declare const stringArrayFooter = "Respond with a JSON array containing the values in a valid JSON block formatted for markdown with this structure:\n```json\n[\n  'value',\n  'value'\n]\n```\n\nYour response must include the valid JSON block.";
/**
 * Parses a JSON array from a given text. The function looks for a JSON block wrapped in triple backticks
 * with `json` language identifier, and if not found, it searches for an array pattern within the text.
 * It then attempts to parse the JSON string into a JavaScript object. If parsing is successful and the result
 * is an array, it returns the array; otherwise, it returns null.
 *
 * @param text - The input text from which to extract and parse the JSON array.
 * @returns An array parsed from the JSON string if successful; otherwise, null.
 */
declare function parseJsonArrayFromText(text: string): any[];
/**
 * Parses a JSON object from a given text. The function looks for a JSON block wrapped in triple backticks
 * with `json` language identifier, and if not found, it searches for an object pattern within the text.
 * It then attempts to parse the JSON string into a JavaScript object. If parsing is successful and the result
 * is an object (but not an array), it returns the object; otherwise, it tries to parse an array if the result
 * is an array, or returns null if parsing is unsuccessful or the result is neither an object nor an array.
 *
 * @param text - The input text from which to extract and parse the JSON object.
 * @returns An object parsed from the JSON string if successful; otherwise, null or the result of parsing an array.
 */
declare function parseJSONObjectFromText(text: string): Record<string, any> | null;
/**
 * Extracts specific attributes (e.g., user, text, action) from a JSON-like string using regex.
 * @param response - The cleaned string response to extract attributes from.
 * @param attributesToExtract - An array of attribute names to extract.
 * @returns An object containing the extracted attributes.
 */
declare function extractAttributes(response: string, attributesToExtract?: string[]): {
    [key: string]: string | undefined;
};
/**
 * Normalizes a JSON-like string by correcting formatting issues:
 * - Removes extra spaces after '{' and before '}'.
 * - Wraps unquoted values in double quotes.
 * - Converts single-quoted values to double-quoted.
 * - Ensures consistency in key-value formatting.
 * - Normalizes mixed adjacent quote pairs.
 *
 * This is useful for cleaning up improperly formatted JSON strings
 * before parsing them into valid JSON.
 *
 * @param str - The JSON-like string to normalize.
 * @returns A properly formatted JSON string.
 */
declare const normalizeJsonString: (str: string) => string;
/**
 * Cleans a JSON-like response string by removing unnecessary markers, line breaks, and extra whitespace.
 * This is useful for handling improperly formatted JSON responses from external sources.
 *
 * @param response - The raw JSON-like string response to clean.
 * @returns The cleaned string, ready for parsing or further processing.
 */
declare function cleanJsonResponse(response: string): string;
declare const postActionResponseFooter = "Choose any combination of [LIKE], [RETWEET], [QUOTE], and [REPLY] that are appropriate. Each action must be on its own line. Your response must only include the chosen actions.";
declare const parseActionResponseFromText: (text: string) => {
    actions: ActionResponse;
};
/**
 * Truncate text to fit within the character limit, ensuring it ends at a complete sentence.
 */
declare function truncateToCompleteSentence(text: string, maxLength: number): string;

/**
 * Get details for a list of actors.
 */
declare function getActorDetails({ runtime, roomId, }: {
    runtime: IAgentRuntime;
    roomId: UUID;
}): Promise<_elizaos_core.Actor[]>;
/**
 * Format actors into a string
 * @param actors - list of actors
 * @returns string
 */
declare function formatActors({ actors }: {
    actors: Actor[];
}): string;
/**
 * Format messages into a string
 * @param messages - list of messages
 * @param actors - list of actors
 * @returns string
 */
declare const formatMessages: ({ messages, actors, }: {
    messages: Memory[];
    actors: Actor[];
}) => string;
declare const formatTimestamp: (messageDate: number) => string;

declare const formatPosts: ({ messages, actors, conversationHeader, }: {
    messages: Memory[];
    actors: Actor[];
    conversationHeader?: boolean;
}) => string;

/**
 * Formats provider outputs into a string which can be injected into the context.
 * @param runtime The AgentRuntime object.
 * @param message The incoming message object.
 * @param state The current state object.
 * @returns A string that concatenates the outputs of each provider.
 */
declare function getProviders(runtime: IAgentRuntime, message: Memory, state?: State): Promise<string>;

declare class AgentRuntime implements IAgentRuntime {
    _runtime: AgentRuntime$1;
    /**
     * Default count for recent messages to be kept in memory.
     * @private
     */
    /**
     * The ID of the agent
     */
    agentId: UUID;
    /**
     * The base URL of the server where the agent's requests are processed.
     */
    serverUrl: string;
    /**
     * The database adapter used for interacting with the database.
     */
    databaseAdapter: IDatabaseAdapter;
    /**
     * Authentication token used for securing requests.
     */
    token: string | null;
    /**
     * Custom actions that the agent can perform.
     */
    actions: Action[];
    /**
     * Evaluators used to assess and guide the agent's responses.
     */
    evaluators: Evaluator[];
    /**
     * Context providers used to provide context for message generation.
     */
    providers: Provider[];
    /**
     * Database adapters used to interact with the database.
     */
    adapters: Adapter[];
    plugins: Plugin[];
    /**
     * The model to use for generateText.
     */
    modelProvider: ModelProviderName;
    /**
     * The model to use for generateImage.
     */
    imageModelProvider: ModelProviderName;
    /**
     * The model to use for describing images.
     */
    imageVisionModelProvider: ModelProviderName;
    /**
     * Fetch function to use
     * Some environments may not have access to the global fetch function and need a custom fetch override.
     */
    fetch: typeof fetch;
    /**
     * The character to use for the agent
     */
    character: Character;
    /**
     * Store messages that are sent and received by the agent.
     */
    messageManager: IMemoryManager;
    /**
     * Store and recall descriptions of users based on conversations.
     */
    descriptionManager: IMemoryManager;
    /**
     * Manage the creation and recall of static information (documents, historical game lore, etc)
     */
    loreManager: IMemoryManager;
    /**
     * Hold large documents that can be referenced
     */
    documentsManager: IMemoryManager;
    /**
     * Searchable document fragments
     */
    knowledgeManager: IMemoryManager;
    ragKnowledgeManager: IRAGKnowledgeManager;
    services: Map<ServiceType, Service>;
    memoryManagers: Map<string, IMemoryManager>;
    cacheManager: ICacheManager;
    clients: ClientInstance[];
    private readonly knowledgeRoot;
    registerMemoryManager(manager: IMemoryManager): void;
    getMemoryManager(tableName: string): IMemoryManager | null;
    getService<T extends Service>(service: ServiceType): T | null;
    registerService(service: Service): Promise<void>;
    /**
     * Creates an instance of AgentRuntime.
     * @param opts - The options for configuring the AgentRuntime.
     * @param opts.conversationLength - The number of messages to hold in the recent message cache.
     * @param opts.token - The JWT token, can be a JWT token if outside worker, or an OpenAI token if inside worker.
     * @param opts.serverUrl - The URL of the worker.
     * @param opts.actions - Optional custom actions.
     * @param opts.evaluators - Optional custom evaluators.
     * @param opts.services - Optional custom services.
     * @param opts.memoryManagers - Optional custom memory managers.
     * @param opts.providers - Optional context providers.
     * @param opts.model - The model to use for generateText.
     * @param opts.embeddingModel - The model to use for embedding.
     * @param opts.agentId - Optional ID of the agent.
     * @param opts.databaseAdapter - The database adapter used for interacting with the database.
     * @param opts.fetch - Custom fetch function to use for making requests.
     */
    constructor(opts: {
        conversationLength?: number;
        agentId?: UUID;
        character?: Character;
        token: string;
        serverUrl?: string;
        actions?: Action[];
        evaluators?: Evaluator[];
        plugins?: Plugin[];
        providers?: Provider[];
        modelProvider: ModelProviderName;
        services?: Service[];
        managers?: IMemoryManager[];
        databaseAdapter?: IDatabaseAdapter;
        fetch?: typeof fetch | unknown;
        speechModelPath?: string;
        cacheManager?: ICacheManager;
        logging?: boolean;
    });
    initialize(): Promise<void>;
    stop(): Promise<void>;
    getSetting(key: string): any;
    /**
     * Get the number of messages that are kept in the conversation buffer.
     * @returns The number of recent messages to be kept in memory.
     */
    getConversationLength(): number;
    /**
     * Register an action for the agent to perform.
     * @param action The action to register.
     */
    registerAction(action: Action): void;
    /**
     * Register an evaluator to assess and guide the agent's responses.
     * @param evaluator The evaluator to register.
     */
    registerEvaluator(evaluator: Evaluator): void;
    /**
     * Register a context provider to provide context for message generation.
     * @param provider The context provider to register.
     */
    registerContextProvider(provider: Provider): void;
    /**
     * Register an adapter for the agent to use.
     * @param adapter The adapter to register.
     */
    registerAdapter(adapter: Adapter): void;
    /**
     * Process the actions of a message.
     * @param message The message to process.
     * @param content The content of the message to process actions from.
     */
    processActions(message: Memory, responses: Memory[], state?: State, callback?: HandlerCallback): Promise<void>;
    /**
     * Evaluate the message and state using the registered evaluators.
     * @param message The message to evaluate.
     * @param state The state of the agent.
     * @param didRespond Whether the agent responded to the message.~
     * @param callback The handler callback
     * @returns The results of the evaluation.
     */
    evaluate(message: Memory, state: State, didRespond?: boolean, callback?: HandlerCallback): Promise<string[]>;
    /**
     * Ensure the existence of a participant in the room. If the participant does not exist, they are added to the room.
     * @param userId - The user ID to ensure the existence of.
     * @throws An error if the participant cannot be added.
     */
    ensureParticipantExists(userId: UUID, roomId: UUID): Promise<void>;
    /**
     * Ensure the existence of a user in the database. If the user does not exist, they are added to the database.
     * @param userId - The user ID to ensure the existence of.
     * @param userName - The user name to ensure the existence of.
     * @returns
     */
    ensureUserExists(userId: UUID, userName: string | null, name: string | null, email?: string | null, source?: string | null): Promise<void>;
    ensureParticipantInRoom(userId: UUID, roomId: UUID): Promise<void>;
    ensureConnection(userId: UUID, roomId: UUID, userName?: string, userScreenName?: string, source?: string): Promise<void>;
    /**
     * Ensure the existence of a room between the agent and a user. If no room exists, a new room is created and the user
     * and agent are added as participants. The room ID is returned.
     * @param userId - The user ID to create a room with.
     * @returns The room ID of the room between the agent and the user.
     * @throws An error if the room cannot be created.
     */
    ensureRoomExists(roomId: UUID): Promise<void>;
    /**
     * Compose the state of the agent into an object that can be passed or used for response generation.
     * @param message The message to compose the state from.
     * @returns The state of the agent.
     */
    composeState(message: Memory, additionalKeys?: {
        [key: string]: unknown;
    }): Promise<_elizaos_core.State>;
    updateRecentMessageState(state: State): Promise<State>;
}

interface Settings {
    [key: string]: string | undefined;
}
/**
 * Recursively searches for a .env file starting from the current directory
 * and moving up through parent directories (Node.js only)
 * @param {string} [startDir=process.cwd()] - Starting directory for the search
 * @returns {string|null} Path to the nearest .env file or null if not found
 */
declare function findNearestEnvFile(startDir?: string): string;
/**
 * Configures environment settings for browser usage
 * @param {Settings} settings - Object containing environment variables
 */
declare function configureSettings(settings: Settings): void;
/**
 * Loads environment variables from the nearest .env file in Node.js
 * or returns configured settings in browser
 * @returns {Settings} Environment variables object
 * @throws {Error} If no .env file is found in Node.js environment
 */
declare function loadEnvConfig(): Settings;
/**
 * Gets a specific environment variable
 * @param {string} key - The environment variable key
 * @param {string} [defaultValue] - Optional default value if key doesn't exist
 * @returns {string|undefined} The environment variable value or default value
 */
declare function getEnvVariable(key: string, defaultValue?: string): string | undefined;
/**
 * Checks if a specific environment variable exists
 * @param {string} key - The environment variable key
 * @returns {boolean} True if the environment variable exists
 */
declare function hasEnvVariable(key: string): boolean;
declare const settings: Settings;

declare const uuidSchema: zod.ZodType<`${string}-${string}-${string}-${string}-${string}`, zod.ZodTypeDef, `${string}-${string}-${string}-${string}-${string}`>;
declare function validateUuid(value: unknown): UUID | null;
declare function stringToUuid(target: string | number): UUID;

declare const models: Models;
declare function getModelSettings(provider: ModelProviderName, type: ModelClass): ModelSettings$1 | undefined;
declare function getImageModelSettings(provider: ModelProviderName): ImageModelSettings | undefined;
declare function getEmbeddingModelSettings(provider: ModelProviderName): EmbeddingModelSettings | undefined;
declare function getEndpoint(provider: ModelProviderName): any;

export { type Account, type Action, type ActionExample, type ActionResponse, ActionTimelineType, type Actor, type Adapter, AgentRuntime, CacheKeyPrefix, CacheManager, type CacheOptions, CacheStore, type Character, type CharacterConfig, CharacterSchema, type ChunkRow, type Client, type ClientInstance, type Content, type ConversationExample, type DataIrysFetchedFromGQL, type DatabaseAdapter, DbCacheAdapter, type DirectoryItem, type EmbeddingConfig, type EmbeddingModelSettings, EmbeddingProvider, type EmbeddingProviderType, type EnvConfig, type EvaluationExample, type Evaluator, FsCacheAdapter, type GenerationOptions, type Goal, GoalStatus, type GraphQLTag, type Handler, type HandlerCallback, type IAgentConfig, type IAgentRuntime, type IAwsS3Service, type IBrowserService, type ICacheAdapter, type ICacheManager, type IDatabaseAdapter, type IDatabaseCacheAdapter, type IImageDescriptionService, type IIrysService, type IMemoryManager, type IPdfService, type IRAGKnowledgeManager, type ISlackService, type ISpeechService, type ITeeLogService, type ITextGenerationService, type ITranscriptionService, type IVideoService, type ImageModelSettings, IrysDataType, IrysMessageType, type IrysTimestamp, type KnowledgeItem, KnowledgeScope, LoggingLevel, type Media, type Memory, MemoryCacheAdapter, MemoryManager, type MessageExample, type Model, ModelClass, type ModelConfiguration, ModelProviderName, type ModelSettings$1 as ModelSettings, type Models, type Objective, type Participant, type Plugin, type Provider, type RAGKnowledgeItem, type Relationship, type Room, Service, ServiceType, type State, type TelemetrySettings, type TemplateType, TokenizerType, TranscriptionProvider, type TwitterSpaceDecisionOptions, type UUID, type UploadIrysResult, type Validator, addHeader, booleanFooter, cleanJsonResponse, composeActionExamples, composeContext, composeRandomUser, configureSettings, createGoal, elizaLogger, embed, envSchema, evaluationTemplate, extractAttributes, findNearestEnvFile, formatActionNames, formatActions, formatActors, formatEvaluatorExampleDescriptions, formatEvaluatorExamples, formatEvaluatorNames, formatEvaluators, formatGoalsAsString, formatMessages, formatPosts, formatTimestamp, generateCaption, generateImage, generateMessageResponse, generateObject, generateObjectArray, generateObjectDeprecated, generateShouldRespond, generateText, generateTextArray, generateTrueOrFalse, generateTweetActions, getActorDetails, getEmbeddingConfig, getEmbeddingModelSettings, getEmbeddingType, getEmbeddingZeroVector, getEndpoint, getEnvVariable, getGoals, getImageModelSettings, getModelSettings, getProviders, handleProvider, hasEnvVariable, _default as knowledge, loadEnvConfig, logger, messageCompletionFooter, models, normalizeJsonString, parseActionResponseFromText, parseBooleanFromText, parseJSONObjectFromText, parseJsonArrayFromText, parseShouldRespondFromText, postActionResponseFooter, settings, shouldRespondFooter, splitChunks, splitText, stringArrayFooter, stringToUuid, trimTokens, truncateToCompleteSentence, updateGoal, uuidSchema, validateCharacterConfig, validateEnv, validateUuid };
