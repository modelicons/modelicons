// Hand-curated brand-to-category mapping for the gallery filter.
// Brands not in any list fall under "其它".

export const CATEGORIES = [
  { id: 'all', label: '全部' },
  { id: 'llm', label: 'LLM' },
  { id: 'image', label: '图像生成' },
  { id: 'video', label: '视频生成' },
  { id: 'audio', label: '音频/语音' },
  { id: 'code', label: '代码 Agent' },
  { id: 'cloud', label: '推理/云' },
  { id: 'tools', label: '工具/平台' },
  { id: 'data', label: 'RAG/数据库' },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];

export const CATEGORY_MEMBERS: Record<Exclude<CategoryId, 'all'>, string[]> = {
  llm: [
    'OpenAI','Anthropic','Claude','Gemini','GeminiCLI','Gemma','PaLM','DeepSeek','Mistral','Cohere',
    'Qwen','Moonshot','Kimi','Doubao','Wenxin','Hunyuan','ChatGLM','Zhipu','ZAI','Minimax','Yi',
    'ZeroOne','Spark','SenseNova','XAI','Grok','LLaVA','LongCat','Meta','MetaAI','Inflection',
    'AI21','Ai21','AlephAlpha','Aya','Cerebras','Command','CommandA','DeepCogito','Dbrx','Inception',
    'InternLM','LangSmith','LangGraph','LangChain','Liquid','Nova','NousResearch','Phidata','TII',
    'XiaomiMiMo','Xuanyuan','Yuanbao','GLMV','Stepfun','Skywork','Tiangong','Pi',
  ],
  image: [
    'Midjourney','Dalle','Stability','AdobeFirefly','Recraft','Ideogram','Flux','NanoBanana',
    'Krea','Reve','Lovart','Civitai','Adobe','Apertis','Bfl','BriaAI','Clipdrop','CogView',
    'DreamMachine','Flora','Glif','Imagen','Jimeng','Kolors','Make','Pollinations',
    'Kling','TopazLabs','VectorizerAI',
  ],
  video: [
    'Runway','Pika','Sora','Luma','Hailuo','Vidu','Viggle','Hedra','Haiper',
    'PixVerse','CogVideo','CapCut','CyberCut','Lightricks','StreamLake','SubModel',
    'Sync','TuriX',
  ],
  audio: [
    'ElevenLabs','ElevenX','Suno','Udio','FishAudio','Coqui','AssemblyAI','AgentVoice','LiveKit',
    'Deepgram','Cartesia','MyShell',
  ],
  code: [
    'Copilot','GithubCopilot','CopilotKit','Cursor','Windsurf','Cline','ClaudeCode','Codex',
    'CodeBuddy','CodeFlicker','CodeGeeX','Junie','Trae','Qoder','KiloCode','Kwaipilot','RooCode',
    'Devin','Aider','Cody','OpenHands','OpenCode','OpenClaw','Zencoder','V0','Codebase',
    'Relace','Morph','Magic','HermesAgent','Antigravity','Goose','Greptile','Phind',
    'GeminiCLI',
  ],
  cloud: [
    'Aws','Bedrock','Azure','AzureAI','VertexAI','GoogleCloud','Replicate','Together','Fireworks',
    'Groq','SiliconCloud','AlibabaCloud','BaiduCloud','TencentCloud','HuaweiCloud','IFlyTekCloud',
    'StateCloud','AtlasCloud','BurnCloud','Cloudflare','WorkersAI','Lambda','Crusoe','CentML',
    'DeepInfra','Featherless','Hyperbolic','LeptonAI','PPIO','Parasail','Kluster','Targon',
    'Inference','Infermatic','Infinigence','Friendli','Anyscale','AkashChat','Baseten','Nebius',
    'Vercel','Railway','Zeabur','RunPod','CoreWeave','Modal','Reka','NPLCloud','Apple','IBM',
    'Microsoft','Snowflake','Tencent','Alibaba','AntGroup','Baidu','Yandex','Volcengine','Huawei',
  ],
  tools: [
    'HuggingFace','LlamaIndex','LangChain','LangGraph','LangSmith','Langfuse','Ollama','LmStudio',
    'OpenRouter','OpenWebUI','OpenChat','MCP','McpSo','Smithery','Notion','Obsidian','Figma',
    'CherryStudio','Glama','Flowith','NotebookLM','Monica','Mastra','MetaGPT','CrewAI',
    'PydanticAI','N8n','Coze','Dify','FastGPT','LobeHub','RSSHub','GiteeAI','ModelScope','LangFlow',
    'Higress','Doc2X','DocSearch','Helicone','Braintrust','WandB','Github','Bing','Bilibili',
    'BilibiliIndex','Lovable','LlmApi','Replit','Player2','Poe','PrunaAI','Qingyan','Qiniu',
    'NewAPI','Glif','LobeHub','YouMind','ZenMux','Voyage','Unstructured','Upstage','Venice','Ace',
    'AiHubMix','AiMass','AiStudio','AionLabs','Ai2','Ai302','Ai360','Amp','Arcee','AskVerdict',
    'Automatic','Bailian','CometAPI','ComfyUI','Colab','Search1API','SearchApi','Tavily','Exa',
    'SophNet','SpeedAI','Straico','Manus','LG','Gradio','Agui','BAAI','Baichuan','Bing','Fal',
    'Antigravity',
  ],
  data: [
    'Pinecone','Weaviate','Qdrant','ChromaDB','Milvus','Mem0','Letta','Jina','Snowflake',
  ],
};

// reverse lookup: brandId → categoryId
export function categoryOf(brand: string): Exclude<CategoryId, 'all'> | 'other' {
  for (const [cat, members] of Object.entries(CATEGORY_MEMBERS)) {
    if (members.includes(brand)) return cat as Exclude<CategoryId, 'all'>;
  }
  return 'other';
}
