// src/actions.ts
import {
  composeActionExamples as coreComposeActionExamples,
  formatActionNames as coreFormatActionNames,
  formatActions as coreFormatActions
} from "@elizaos/core";
var composeActionExamples = (actionsData, count) => {
  return coreComposeActionExamples(actionsData, count);
};
function formatActionNames(actions) {
  return coreFormatActionNames(actions);
}
function formatActions(actions) {
  return coreFormatActions(actions);
}

// src/cache.ts
import {
  MemoryCacheAdapter as coreMemoryCacheAdapter,
  FsCacheAdapter as coreFsCacheAdapter,
  DbCacheAdapter as coreDbCacheAdapter,
  CacheManager as coreCacheManager
} from "@elizaos/core";
var MemoryCacheAdapter = class {
  _adapter;
  constructor(initalData) {
    this._adapter = new coreMemoryCacheAdapter(initalData);
  }
  async get(key) {
    return this._adapter.get(key);
  }
  async set(key, value) {
    return this._adapter.set(key, value);
  }
  async delete(key) {
    return this._adapter.delete(key);
  }
};
var FsCacheAdapter = class {
  constructor(dataDir) {
    this.dataDir = dataDir;
    this._adapter = new coreFsCacheAdapter(dataDir);
  }
  _adapter;
  async get(key) {
    return this._adapter.get(key);
  }
  async set(key, value) {
    return this._adapter.set(key, value);
  }
  async delete(key) {
    return this._adapter.delete(key);
  }
};
var DbCacheAdapter = class {
  constructor(db, agentId) {
    this.db = db;
    this.agentId = agentId;
    this._adapter = new coreDbCacheAdapter(db, agentId);
  }
  _adapter;
  async get(key) {
    return this._adapter.get(key);
  }
  async set(key, value) {
    return this._adapter.set(key, value);
  }
  async delete(key) {
    return this._adapter.delete(key);
  }
};
var CacheManager = class {
  _adapter;
  adapter;
  constructor(adapter) {
    this._adapter = new coreCacheManager(adapter);
    this.adapter = adapter;
  }
  async get(key) {
    return this._adapter.get(key);
  }
  async set(key, value, opts) {
    return this._adapter.set(key, value, opts);
  }
  async delete(key) {
    return this._adapter.delete(key);
  }
};

// src/context.ts
import {
  composeContext as coreComposeContext,
  addHeader as coreAddHeader,
  composeRandomUser as coreComposeRandomUser
} from "@elizaos/core";
var composeContext = ({
  state,
  template,
  templatingEngine
}) => {
  return coreComposeContext({ state, template, templatingEngine });
};
var addHeader = (header, body) => {
  return coreAddHeader(header, body);
};
var composeRandomUser = (template, length) => {
  return coreComposeRandomUser(template, length);
};

// src/embedding.ts
import {
  EmbeddingProvider as coreEmbeddingProvider,
  getEmbeddingConfig as coreGetEmbeddingConfig,
  getEmbeddingType as coreGetEmbeddingType,
  getEmbeddingZeroVector as coreGetEmbeddingZeroVector,
  embed as coreEmbed
} from "@elizaos/core";
var EmbeddingProvider = coreEmbeddingProvider;
var getEmbeddingConfig = coreGetEmbeddingConfig;
function getEmbeddingType(runtime) {
  return coreGetEmbeddingType(runtime);
}
function getEmbeddingZeroVector() {
  return coreGetEmbeddingZeroVector();
}
async function embed(runtime, input) {
  return coreEmbed(runtime, input);
}

// src/environment.ts
import {
  envSchema as coreEnvSchema,
  validateEnv as coreValidateEnv,
  CharacterSchema as coreCharacterSchema,
  validateCharacterConfig as coreValidateCharacterConfig
} from "@elizaos/core";
var envSchema = coreEnvSchema;
function validateEnv() {
  return coreValidateEnv();
}
var CharacterSchema = coreCharacterSchema;
function validateCharacterConfig(json) {
  return coreValidateCharacterConfig(json);
}

// src/evaluators.ts
import {
  evaluationTemplate as coreEvaluationTemplate,
  formatEvaluatorNames as coreFormatEvaluatorNames,
  formatEvaluators as coreFormatEvaluators,
  formatEvaluatorExamples as coreFormatEvaluatorExamples,
  formatEvaluatorExampleDescriptions as coreFormatEvaluatorExampleDescriptions
} from "@elizaos/core";
var evaluationTemplate = coreEvaluationTemplate;
function formatEvaluatorNames(evaluators) {
  return coreFormatEvaluatorNames(evaluators);
}
function formatEvaluators(evaluators) {
  return coreFormatEvaluators(evaluators);
}
function formatEvaluatorExamples(evaluators) {
  return coreFormatEvaluatorExamples(evaluators);
}
function formatEvaluatorExampleDescriptions(evaluators) {
  return coreFormatEvaluatorExampleDescriptions(evaluators);
}

// src/generation.ts
import {
  trimTokens as coreTrimTokens,
  generateText as coreGenerateText,
  generateShouldRespond as coreGenerateShouldRespond,
  splitChunks as coreSplitChunks,
  splitText as coreSplitText,
  generateTrueOrFalse as coreGenerateTrueOrFalse,
  generateTextArray as coreGenerateTextArray,
  generateObjectDeprecated as coreGenerateObjectDeprecated,
  generateObjectArray as coreGenerateObjectArray,
  generateMessageResponse as coreGenerateMessageResponse,
  generateImage as coreGenerateImage,
  generateCaption as coreGenerateCaption,
  generateObject as coreGenerateObject,
  handleProvider as coreHandleProvider,
  generateTweetActions as coreGenerateTweetActions
} from "@elizaos/core";
async function trimTokens(context, maxTokens, runtime) {
  return coreTrimTokens(context, maxTokens, runtime);
}
async function generateText({
  runtime,
  context,
  modelClass,
  tools = {},
  onStepFinish,
  maxSteps = 1,
  stop,
  customSystemPrompt
}) {
  return coreGenerateText({ runtime, context, modelClass, tools, onStepFinish, maxSteps, stop, customSystemPrompt });
}
async function generateShouldRespond({
  runtime,
  context,
  modelClass
}) {
  return coreGenerateShouldRespond({ runtime, context, modelClass });
}
async function splitChunks(content, chunkSize = 1500, bleed = 100) {
  return coreSplitChunks(content, chunkSize, bleed);
}
function splitText(content, chunkSize, bleed) {
  return coreSplitText(content, chunkSize, bleed);
}
async function generateTrueOrFalse({
  runtime,
  context = "",
  modelClass
}) {
  return coreGenerateTrueOrFalse({ runtime, context, modelClass });
}
async function generateTextArray({
  runtime,
  context,
  modelClass
}) {
  return coreGenerateTextArray({ runtime, context, modelClass });
}
async function generateObjectDeprecated({
  runtime,
  context,
  modelClass
}) {
  return coreGenerateObjectDeprecated({ runtime, context, modelClass });
}
async function generateObjectArray({
  runtime,
  context,
  modelClass
}) {
  return coreGenerateObjectArray({ runtime, context, modelClass });
}
async function generateMessageResponse({
  runtime,
  context,
  modelClass
}) {
  return coreGenerateMessageResponse({ runtime, context, modelClass });
}
var generateImage = async (data, runtime) => {
  return coreGenerateImage(data, runtime);
};
var generateCaption = async (data, runtime) => {
  return coreGenerateCaption(data, runtime);
};
var generateObject = async ({
  runtime,
  context,
  modelClass,
  schema,
  schemaName,
  schemaDescription,
  stop,
  mode = "json"
}) => {
  return coreGenerateObject({ runtime, context, modelClass, schema, schemaName, schemaDescription, stop, mode });
};
async function handleProvider(options) {
  return coreHandleProvider(options);
}
async function generateTweetActions({
  runtime,
  context,
  modelClass
}) {
  return coreGenerateTweetActions({ runtime, context, modelClass });
}

// src/goals.ts
import {
  getGoals as coreGetGoals,
  formatGoalsAsString as coreFormatGoalsAsString,
  updateGoal as coreUpdateGoal,
  createGoal as coreCreateGoal
} from "@elizaos/core";
var getGoals = async ({
  runtime,
  roomId,
  userId,
  onlyInProgress = true,
  count = 5
}) => {
  return coreGetGoals({ runtime, roomId, userId, onlyInProgress, count });
};
var formatGoalsAsString = ({ goals }) => {
  return coreFormatGoalsAsString({ goals });
};
var updateGoal = async ({
  runtime,
  goal
}) => {
  return coreUpdateGoal({ runtime, goal });
};
var createGoal = async ({
  runtime,
  goal
}) => {
  return coreCreateGoal({ runtime, goal });
};

// src/knowledge.ts
import {
  knowledge as coreKnowledge
} from "@elizaos/core";
async function get(runtime, message) {
  return coreKnowledge.get(runtime, message);
}
async function set(runtime, item, chunkSize = 512, bleed = 20) {
  return coreKnowledge.set(runtime, item, chunkSize, bleed);
}
function preprocess(content) {
  return coreKnowledge.preprocess(content);
}
var knowledge_default = {
  get,
  set,
  preprocess
};

// src/logger.ts
import { elizaLogger as coreLogger } from "@elizaos/core";
function adaptLogMethod(tupleMethod) {
  return function(msg, ...args) {
    return tupleMethod([msg, ...args]);
  };
}
var logger = {
  trace: adaptLogMethod(([msg, ...rest]) => {
    coreLogger.trace.apply(coreLogger, [msg, ...rest]);
  }),
  debug: adaptLogMethod(([msg, ...rest]) => {
    coreLogger.debug.apply(coreLogger, [msg, ...rest]);
  }),
  success: adaptLogMethod(([msg, ...rest]) => {
    coreLogger.debug.apply(coreLogger, [msg, ...rest]);
  }),
  progress: adaptLogMethod(([msg, ...rest]) => {
    coreLogger.debug.apply(coreLogger, [msg, ...rest]);
  }),
  log: adaptLogMethod(([msg, ...rest]) => {
    coreLogger.info.apply(coreLogger, [msg, ...rest]);
  }),
  info: adaptLogMethod(([msg, ...rest]) => {
    coreLogger.info.apply(coreLogger, [msg, ...rest]);
  }),
  warn: adaptLogMethod(([msg, ...rest]) => {
    coreLogger.warn.apply(coreLogger, [msg, ...rest]);
  }),
  error: adaptLogMethod(([msg, ...rest]) => {
    coreLogger.error.apply(coreLogger, [msg, ...rest]);
  }),
  fatal: adaptLogMethod(([msg, ...rest]) => {
    coreLogger.fatal.apply(coreLogger, [msg, ...rest]);
  }),
  clear: () => coreLogger.clear("")
  // call with dummy arg to satisfy "at least 1 argument" requirement
};
var elizaLogger = logger;

// src/memory.ts
import { MemoryManager as coreMemoryManager } from "@elizaos/core";
var MemoryManager = class {
  _mm;
  /**
   * The AgentRuntime instance associated with this manager.
   */
  runtime;
  /**
   * The name of the database table this manager operates on.
   */
  tableName;
  /**
   * Constructs a new MemoryManager instance.
   * @param opts Options for the manager.
   * @param opts.tableName The name of the table this manager will operate on.
   * @param opts.runtime The AgentRuntime instance associated with this manager.
   */
  constructor(opts) {
    this._mm = new coreMemoryManager(opts);
    this.runtime = opts.runtime;
    this.tableName = opts.tableName;
  }
  /**
   * Adds an embedding vector to a memory object if one doesn't already exist.
   * The embedding is generated from the memory's text content using the runtime's
   * embedding model. If the memory has no text content, an error is thrown.
   *
   * @param memory The memory object to add an embedding to
   * @returns The memory object with an embedding vector added
   * @throws Error if the memory content is empty
   */
  async addEmbeddingToMemory(memory) {
    return this._mm.addEmbeddingToMemory(memory);
  }
  /**
   * Retrieves a list of memories by user IDs, with optional deduplication.
   * @param opts Options including user IDs, count, and uniqueness.
   * @param opts.roomId The room ID to retrieve memories for.
   * @param opts.count The number of memories to retrieve.
   * @param opts.unique Whether to retrieve unique memories only.
   * @returns A Promise resolving to an array of Memory objects.
   */
  async getMemories({
    roomId,
    count = 10,
    unique = true,
    start,
    end
  }) {
    return this._mm.getMemories({
      roomId,
      count,
      unique,
      start,
      end
    });
  }
  async getCachedEmbeddings(content) {
    return this._mm.getMemories(content);
  }
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
  async searchMemoriesByEmbedding(embedding, opts) {
    return this._mm.searchMemoriesByEmbedding(embedding, opts);
  }
  /**
   * Creates a new memory in the database, with an option to check for similarity before insertion.
   * @param memory The memory object to create.
   * @param unique Whether to check for similarity before insertion.
   * @returns A Promise that resolves when the operation completes.
   */
  async createMemory(memory, unique = false) {
    return this._mm.createMemory(memory, unique);
  }
  async getMemoriesByRoomIds(params) {
    return this._mm.getMemoriesByRoomIds(params);
  }
  async getMemoriesByIds(ids) {
    return this._mm.getMemoriesByIds(ids);
  }
  async getMemoryById(id) {
    return this._mm.getMemoryById(id);
  }
  /**
   * Removes a memory from the database by its ID.
   * @param memoryId The ID of the memory to remove.
   * @returns A Promise that resolves when the operation completes.
   */
  async removeMemory(memoryId) {
    return this._mm.removeMemory(memoryId);
  }
  /**
   * Removes all memories associated with a set of user IDs.
   * @param roomId The room ID to remove memories for.
   * @returns A Promise that resolves when the operation completes.
   */
  async removeAllMemories(roomId) {
    return this._mm.removeAllMemories(roomId);
  }
  /**
   * Counts the number of memories associated with a set of user IDs, with an option for uniqueness.
   * @param roomId The room ID to count memories for.
   * @param unique Whether to count unique memories only.
   * @returns A Promise resolving to the count of memories.
   */
  async countMemories(roomId, unique = true) {
    return this._mm.countMemories(roomId, unique);
  }
};

// src/parsing.ts
import {
  messageCompletionFooter as coreMessageCompletionFooter,
  shouldRespondFooter as coreShouldRespondFooter,
  booleanFooter as coreBooleanFooter,
  parseShouldRespondFromText as coreParseShouldRespondFromText,
  stringArrayFooter as coreStringArrayFooter,
  postActionResponseFooter as corePostActionResponseFooter,
  parseJsonArrayFromText as coreParseJsonArrayFromText,
  parseJSONObjectFromText as coreParseJSONObjectFromText,
  extractAttributes as coreExtractAttributes,
  normalizeJsonString as coreNormalizeJsonString,
  cleanJsonResponse as coreCleanJsonResponse,
  parseActionResponseFromText as coreParseActionResponseFromText,
  truncateToCompleteSentence as coreTruncateToCompleteSentence
} from "@elizaos/core";
var messageCompletionFooter = coreMessageCompletionFooter;
var shouldRespondFooter = coreShouldRespondFooter;
var parseShouldRespondFromText = (text) => {
  return coreParseShouldRespondFromText(text);
};
var booleanFooter = coreBooleanFooter;
var parseBooleanFromText = (text) => {
};
var stringArrayFooter = coreStringArrayFooter;
function parseJsonArrayFromText(text) {
  return coreParseJsonArrayFromText(text);
}
function parseJSONObjectFromText(text) {
  return coreParseJSONObjectFromText(text);
}
function extractAttributes(response, attributesToExtract) {
  return coreExtractAttributes(response, attributesToExtract);
}
var normalizeJsonString = (str) => {
  return coreNormalizeJsonString(str);
};
function cleanJsonResponse(response) {
  return coreCleanJsonResponse(response);
}
var postActionResponseFooter = corePostActionResponseFooter;
var parseActionResponseFromText = (text) => {
  return coreParseActionResponseFromText(text);
};
function truncateToCompleteSentence(text, maxLength) {
  return coreTruncateToCompleteSentence(text, maxLength);
}

// src/messages.ts
import {
  getActorDetails as coreGetActorDetails,
  formatActors as coreFormatActors,
  formatMessages as coreFormatMessages,
  formatTimestamp as coreFormatTimestamp
} from "@elizaos/core";
async function getActorDetails({
  runtime,
  roomId
}) {
  return coreGetActorDetails({ runtime, roomId });
}
function formatActors({ actors }) {
  return coreFormatActors({ actors });
}
var formatMessages = ({
  messages,
  actors
}) => {
  return coreFormatMessages({ messages, actors });
};
var formatTimestamp = (messageDate) => {
  return coreFormatTimestamp(messageDate);
};

// src/posts.ts
import {
  formatPosts as coreFormatPosts
} from "@elizaos/core";
var formatPosts = ({
  messages,
  actors,
  conversationHeader = true
}) => {
  return coreFormatPosts({ messages, actors, conversationHeader });
};

// src/providers.ts
import {
  getProviders as coreGetProviders
} from "@elizaos/core";
async function getProviders(runtime, message, state) {
  return coreGetProviders(runtime, message, state);
}

// src/runtime.ts
import {
  AgentRuntime as coreAgentRuntime2
} from "@elizaos/core";
var AgentRuntime = class {
  _runtime;
  /**
   * Default count for recent messages to be kept in memory.
   * @private
   */
  //readonly #conversationLength = 32 as number;
  /**
   * The ID of the agent
   */
  agentId;
  /**
   * The base URL of the server where the agent's requests are processed.
   */
  serverUrl = "http://localhost:7998";
  /**
   * The database adapter used for interacting with the database.
   */
  databaseAdapter;
  /**
   * Authentication token used for securing requests.
   */
  token;
  /**
   * Custom actions that the agent can perform.
   */
  actions = [];
  /**
   * Evaluators used to assess and guide the agent's responses.
   */
  evaluators = [];
  /**
   * Context providers used to provide context for message generation.
   */
  providers = [];
  /**
   * Database adapters used to interact with the database.
   */
  adapters = [];
  plugins = [];
  /**
   * The model to use for generateText.
   */
  modelProvider;
  /**
   * The model to use for generateImage.
   */
  imageModelProvider;
  /**
   * The model to use for describing images.
   */
  imageVisionModelProvider;
  /**
   * Fetch function to use
   * Some environments may not have access to the global fetch function and need a custom fetch override.
   */
  fetch = fetch;
  /**
   * The character to use for the agent
   */
  character;
  /**
   * Store messages that are sent and received by the agent.
   */
  messageManager;
  /**
   * Store and recall descriptions of users based on conversations.
   */
  descriptionManager;
  /**
   * Manage the creation and recall of static information (documents, historical game lore, etc)
   */
  loreManager;
  /**
   * Hold large documents that can be referenced
   */
  documentsManager;
  /**
   * Searchable document fragments
   */
  knowledgeManager;
  ragKnowledgeManager;
  services = /* @__PURE__ */ new Map();
  memoryManagers = /* @__PURE__ */ new Map();
  cacheManager;
  clients = [];
  knowledgeRoot;
  // verifiableInferenceAdapter?: IVerifiableInferenceAdapter;
  registerMemoryManager(manager) {
    return this._runtime.registerMemoryManager(manager);
  }
  getMemoryManager(tableName) {
    return this._runtime.getMemoryManager(tableName);
  }
  getService(service) {
    return this._runtime.getService(service);
  }
  async registerService(service) {
    return this._runtime.registerService(service);
  }
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
  constructor(opts) {
    this._runtime = new coreAgentRuntime2(opts);
  }
  async initialize() {
    this._runtime.initialize();
  }
  async stop() {
    this._runtime.stop();
  }
  getSetting(key) {
    return this._runtime.getSetting(key);
  }
  /**
   * Get the number of messages that are kept in the conversation buffer.
   * @returns The number of recent messages to be kept in memory.
   */
  getConversationLength() {
    return this._runtime.getConversationLength();
  }
  /**
   * Register an action for the agent to perform.
   * @param action The action to register.
   */
  registerAction(action) {
    return this._runtime.registerAction(action);
  }
  /**
   * Register an evaluator to assess and guide the agent's responses.
   * @param evaluator The evaluator to register.
   */
  registerEvaluator(evaluator) {
    return this._runtime.registerEvaluator(evaluator);
  }
  /**
   * Register a context provider to provide context for message generation.
   * @param provider The context provider to register.
   */
  registerContextProvider(provider) {
    return this._runtime.registerContextProvider(provider);
  }
  /**
   * Register an adapter for the agent to use.
   * @param adapter The adapter to register.
   */
  registerAdapter(adapter) {
    return this._runtime.registerAdapter(adapter);
  }
  /**
   * Process the actions of a message.
   * @param message The message to process.
   * @param content The content of the message to process actions from.
   */
  async processActions(message, responses, state, callback) {
    return this._runtime.processActions(message, responses, state, callback);
  }
  /**
   * Evaluate the message and state using the registered evaluators.
   * @param message The message to evaluate.
   * @param state The state of the agent.
   * @param didRespond Whether the agent responded to the message.~
   * @param callback The handler callback
   * @returns The results of the evaluation.
   */
  async evaluate(message, state, didRespond, callback) {
    return this._runtime.evaluate(message, state, didRespond, callback);
  }
  /**
   * Ensure the existence of a participant in the room. If the participant does not exist, they are added to the room.
   * @param userId - The user ID to ensure the existence of.
   * @throws An error if the participant cannot be added.
   */
  async ensureParticipantExists(userId, roomId) {
    return this._runtime.ensureParticipantExists(userId, roomId);
  }
  /**
   * Ensure the existence of a user in the database. If the user does not exist, they are added to the database.
   * @param userId - The user ID to ensure the existence of.
   * @param userName - The user name to ensure the existence of.
   * @returns
   */
  async ensureUserExists(userId, userName, name, email, source) {
    return this._runtime.ensureUserExists(userId, userName, name, email, source);
  }
  async ensureParticipantInRoom(userId, roomId) {
    return this._runtime.ensureParticipantInRoom(userId, roomId);
  }
  async ensureConnection(userId, roomId, userName, userScreenName, source) {
    return this._runtime.ensureConnection(userId, roomId, userName, userScreenName, source);
  }
  /**
   * Ensure the existence of a room between the agent and a user. If no room exists, a new room is created and the user
   * and agent are added as participants. The room ID is returned.
   * @param userId - The user ID to create a room with.
   * @returns The room ID of the room between the agent and the user.
   * @throws An error if the room cannot be created.
   */
  async ensureRoomExists(roomId) {
    return this._runtime.ensureRoomExists(roomId);
  }
  /**
   * Compose the state of the agent into an object that can be passed or used for response generation.
   * @param message The message to compose the state from.
   * @returns The state of the agent.
   */
  async composeState(message, additionalKeys = {}) {
    return this._runtime.composeState(message, additionalKeys);
  }
  async updateRecentMessageState(state) {
    return this._runtime.updateRecentMessageState(state);
  }
};

// src/settings.ts
import {
  findNearestEnvFile as coreFindNearestEnvFile,
  configureSettings as coreConfigureSettings,
  loadEnvConfig as coreLoadEnvConfig,
  hasEnvVariable as coreHasEnvVariable,
  settings as coreSettings,
  getEnvVariable as coreGetEnvVariable
} from "@elizaos/core";
function findNearestEnvFile(startDir = process.cwd()) {
  return coreFindNearestEnvFile(startDir);
}
function configureSettings(settings2) {
  return coreConfigureSettings(settings2);
}
function loadEnvConfig() {
  return coreLoadEnvConfig();
}
function getEnvVariable(key, defaultValue) {
  return coreGetEnvVariable(key, defaultValue);
}
function hasEnvVariable(key) {
  return coreHasEnvVariable(key);
}
var settings = coreSettings;

// src/types.ts
var GoalStatus = /* @__PURE__ */ ((GoalStatus2) => {
  GoalStatus2["DONE"] = "DONE";
  GoalStatus2["FAILED"] = "FAILED";
  GoalStatus2["IN_PROGRESS"] = "IN_PROGRESS";
  return GoalStatus2;
})(GoalStatus || {});
var ModelClass = /* @__PURE__ */ ((ModelClass2) => {
  ModelClass2["SMALL"] = "small";
  ModelClass2["MEDIUM"] = "medium";
  ModelClass2["LARGE"] = "large";
  ModelClass2["EMBEDDING"] = "embedding";
  ModelClass2["IMAGE"] = "image";
  return ModelClass2;
})(ModelClass || {});
var ModelProviderName = /* @__PURE__ */ ((ModelProviderName2) => {
  ModelProviderName2["OPENAI"] = "openai";
  ModelProviderName2["ETERNALAI"] = "eternalai";
  ModelProviderName2["ANTHROPIC"] = "anthropic";
  ModelProviderName2["GROK"] = "grok";
  ModelProviderName2["GROQ"] = "groq";
  ModelProviderName2["LLAMACLOUD"] = "llama_cloud";
  ModelProviderName2["TOGETHER"] = "together";
  ModelProviderName2["LLAMALOCAL"] = "llama_local";
  ModelProviderName2["LMSTUDIO"] = "lmstudio";
  ModelProviderName2["GOOGLE"] = "google";
  ModelProviderName2["MISTRAL"] = "mistral";
  ModelProviderName2["CLAUDE_VERTEX"] = "claude_vertex";
  ModelProviderName2["REDPILL"] = "redpill";
  ModelProviderName2["OPENROUTER"] = "openrouter";
  ModelProviderName2["AIMLAPI"] = "aimlapi";
  ModelProviderName2["OLLAMA"] = "ollama";
  ModelProviderName2["HEURIST"] = "heurist";
  ModelProviderName2["GALADRIEL"] = "galadriel";
  ModelProviderName2["FAL"] = "falai";
  ModelProviderName2["GAIANET"] = "gaianet";
  ModelProviderName2["ALI_BAILIAN"] = "ali_bailian";
  ModelProviderName2["VOLENGINE"] = "volengine";
  ModelProviderName2["NANOGPT"] = "nanogpt";
  ModelProviderName2["HYPERBOLIC"] = "hyperbolic";
  ModelProviderName2["VENICE"] = "venice";
  ModelProviderName2["NVIDIA"] = "nvidia";
  ModelProviderName2["NINETEEN_AI"] = "nineteen_ai";
  ModelProviderName2["AKASH_CHAT_API"] = "akash_chat_api";
  ModelProviderName2["LIVEPEER"] = "livepeer";
  ModelProviderName2["LETZAI"] = "letzai";
  ModelProviderName2["DEEPSEEK"] = "deepseek";
  ModelProviderName2["INFERA"] = "infera";
  ModelProviderName2["BEDROCK"] = "bedrock";
  ModelProviderName2["ATOMA"] = "atoma";
  ModelProviderName2["SECRETAI"] = "secret_ai";
  ModelProviderName2["NEARAI"] = "nearai";
  ModelProviderName2["KLUSTERAI"] = "kluster_ai";
  ModelProviderName2["MEM0"] = "mem0";
  return ModelProviderName2;
})(ModelProviderName || {});
var CacheStore = /* @__PURE__ */ ((CacheStore2) => {
  CacheStore2["REDIS"] = "redis";
  CacheStore2["DATABASE"] = "database";
  CacheStore2["FILESYSTEM"] = "filesystem";
  return CacheStore2;
})(CacheStore || {});
var Service = class _Service {
  static instance = null;
  static get serviceType() {
    throw new Error("Service must implement static serviceType getter");
  }
  static getInstance() {
    if (!_Service.instance) {
      _Service.instance = new this();
    }
    return _Service.instance;
  }
  get serviceType() {
    return this.constructor.serviceType;
  }
};
var IrysMessageType = /* @__PURE__ */ ((IrysMessageType2) => {
  IrysMessageType2["REQUEST"] = "REQUEST";
  IrysMessageType2["DATA_STORAGE"] = "DATA_STORAGE";
  IrysMessageType2["REQUEST_RESPONSE"] = "REQUEST_RESPONSE";
  return IrysMessageType2;
})(IrysMessageType || {});
var IrysDataType = /* @__PURE__ */ ((IrysDataType2) => {
  IrysDataType2["FILE"] = "FILE";
  IrysDataType2["IMAGE"] = "IMAGE";
  IrysDataType2["OTHER"] = "OTHER";
  return IrysDataType2;
})(IrysDataType || {});
var ServiceType = /* @__PURE__ */ ((ServiceType2) => {
  ServiceType2["IMAGE_DESCRIPTION"] = "image_description";
  ServiceType2["TRANSCRIPTION"] = "transcription";
  ServiceType2["VIDEO"] = "video";
  ServiceType2["TEXT_GENERATION"] = "text_generation";
  ServiceType2["BROWSER"] = "browser";
  ServiceType2["SPEECH_GENERATION"] = "speech_generation";
  ServiceType2["PDF"] = "pdf";
  ServiceType2["INTIFACE"] = "intiface";
  ServiceType2["AWS_S3"] = "aws_s3";
  ServiceType2["BUTTPLUG"] = "buttplug";
  ServiceType2["SLACK"] = "slack";
  ServiceType2["VERIFIABLE_LOGGING"] = "verifiable_logging";
  ServiceType2["IRYS"] = "irys";
  ServiceType2["TEE_LOG"] = "tee_log";
  ServiceType2["GOPLUS_SECURITY"] = "goplus_security";
  ServiceType2["WEB_SEARCH"] = "web_search";
  ServiceType2["EMAIL_AUTOMATION"] = "email_automation";
  ServiceType2["NKN_CLIENT_SERVICE"] = "nkn_client_service";
  return ServiceType2;
})(ServiceType || {});
var LoggingLevel = /* @__PURE__ */ ((LoggingLevel2) => {
  LoggingLevel2["DEBUG"] = "debug";
  LoggingLevel2["VERBOSE"] = "verbose";
  LoggingLevel2["NONE"] = "none";
  return LoggingLevel2;
})(LoggingLevel || {});
var TokenizerType = /* @__PURE__ */ ((TokenizerType2) => {
  TokenizerType2["Auto"] = "auto";
  TokenizerType2["TikToken"] = "tiktoken";
  return TokenizerType2;
})(TokenizerType || {});
var TranscriptionProvider = /* @__PURE__ */ ((TranscriptionProvider2) => {
  TranscriptionProvider2["OpenAI"] = "openai";
  TranscriptionProvider2["Deepgram"] = "deepgram";
  TranscriptionProvider2["Local"] = "local";
  return TranscriptionProvider2;
})(TranscriptionProvider || {});
var ActionTimelineType = /* @__PURE__ */ ((ActionTimelineType2) => {
  ActionTimelineType2["ForYou"] = "foryou";
  ActionTimelineType2["Following"] = "following";
  return ActionTimelineType2;
})(ActionTimelineType || {});
var KnowledgeScope = /* @__PURE__ */ ((KnowledgeScope2) => {
  KnowledgeScope2["SHARED"] = "shared";
  KnowledgeScope2["PRIVATE"] = "private";
  return KnowledgeScope2;
})(KnowledgeScope || {});
var CacheKeyPrefix = /* @__PURE__ */ ((CacheKeyPrefix2) => {
  CacheKeyPrefix2["KNOWLEDGE"] = "knowledge";
  return CacheKeyPrefix2;
})(CacheKeyPrefix || {});

// src/uuid.ts
import {
  uuidSchema as coreUuidSchema,
  validateUuid as coreValidateUuid,
  stringToUuid as coreStringToUuid
} from "@elizaos/core";
var uuidSchema = coreUuidSchema;
function validateUuid(value) {
  return coreValidateUuid(value);
}
function stringToUuid(target) {
  return coreStringToUuid(target);
}

// src/models.ts
import {
  models as coreModels,
  getModelSettings as coreGetModelSettings,
  getImageModelSettings as coreGetImageModelSettings,
  getEmbeddingModelSettings as coreGetEmbeddingModelSettings,
  getEndpoint as coreGetEndpoint
} from "@elizaos/core";
var models = coreModels;
function getModelSettings(provider, type) {
  return coreGetModelSettings(provider, type);
}
function getImageModelSettings(provider) {
  return coreGetImageModelSettings(provider);
}
function getEmbeddingModelSettings(provider) {
  return coreGetEmbeddingModelSettings(provider);
}
function getEndpoint(provider) {
  return coreGetEndpoint(provider);
}
export {
  ActionTimelineType,
  AgentRuntime,
  CacheKeyPrefix,
  CacheManager,
  CacheStore,
  CharacterSchema,
  DbCacheAdapter,
  EmbeddingProvider,
  FsCacheAdapter,
  GoalStatus,
  IrysDataType,
  IrysMessageType,
  KnowledgeScope,
  LoggingLevel,
  MemoryCacheAdapter,
  MemoryManager,
  ModelClass,
  ModelProviderName,
  Service,
  ServiceType,
  TokenizerType,
  TranscriptionProvider,
  addHeader,
  booleanFooter,
  cleanJsonResponse,
  composeActionExamples,
  composeContext,
  composeRandomUser,
  configureSettings,
  createGoal,
  elizaLogger,
  embed,
  envSchema,
  evaluationTemplate,
  extractAttributes,
  findNearestEnvFile,
  formatActionNames,
  formatActions,
  formatActors,
  formatEvaluatorExampleDescriptions,
  formatEvaluatorExamples,
  formatEvaluatorNames,
  formatEvaluators,
  formatGoalsAsString,
  formatMessages,
  formatPosts,
  formatTimestamp,
  generateCaption,
  generateImage,
  generateMessageResponse,
  generateObject,
  generateObjectArray,
  generateObjectDeprecated,
  generateShouldRespond,
  generateText,
  generateTextArray,
  generateTrueOrFalse,
  generateTweetActions,
  getActorDetails,
  getEmbeddingConfig,
  getEmbeddingModelSettings,
  getEmbeddingType,
  getEmbeddingZeroVector,
  getEndpoint,
  getEnvVariable,
  getGoals,
  getImageModelSettings,
  getModelSettings,
  getProviders,
  handleProvider,
  hasEnvVariable,
  knowledge_default as knowledge,
  loadEnvConfig,
  logger,
  messageCompletionFooter,
  models,
  normalizeJsonString,
  parseActionResponseFromText,
  parseBooleanFromText,
  parseJSONObjectFromText,
  parseJsonArrayFromText,
  parseShouldRespondFromText,
  postActionResponseFooter,
  settings,
  shouldRespondFooter,
  splitChunks,
  splitText,
  stringArrayFooter,
  stringToUuid,
  trimTokens,
  truncateToCompleteSentence,
  updateGoal,
  uuidSchema,
  validateCharacterConfig,
  validateEnv,
  validateUuid
};
//# sourceMappingURL=index.js.map