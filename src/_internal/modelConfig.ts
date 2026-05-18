import { FC } from 'react';

import Ace from '../brands/Ace';
import Adobe from '../brands/Adobe';
import Ai2 from '../brands/Ai2';
import Ai21 from '../brands/Ai21';
import Ai360 from '../brands/Ai360';
import AiHubMix from '../brands/AiHubMix';
import AiMass from '../brands/AiMass';
import AionLabs from '../brands/AionLabs';
import Anthropic from '../brands/Anthropic';
import Arcee from '../brands/Arcee';
import AssemblyAI from '../brands/AssemblyAI';
import Aws from '../brands/Aws';
import Aya from '../brands/Aya';
import BAAI from '../brands/BAAI';
import Baichuan from '../brands/Baichuan';
import BaiduCloud from '../brands/BaiduCloud';
import Bilibili from '../brands/Bilibili';
import BilibiliIndex from '../brands/BilibiliIndex';
import BurnCloud from '../brands/BurnCloud';
import ByteDance from '../brands/ByteDance';
import ChatGLM from '../brands/ChatGLM';
import Claude from '../brands/Claude';
import CodeGeeX from '../brands/CodeGeeX';
import CogView from '../brands/CogView';
import Cohere from '../brands/Cohere';
import Dalle from '../brands/Dalle';
import Dbrx from '../brands/Dbrx';
import DeepCogito from '../brands/DeepCogito';
import DeepMind from '../brands/DeepMind';
import DeepSeek from '../brands/DeepSeek';
import Dolphin from '../brands/Dolphin';
import Doubao from '../brands/Doubao';
import EssentialAI from '../brands/EssentialAI';
import Fireworks from '../brands/Fireworks';
import FishAudio from '../brands/FishAudio';
import Flux from '../brands/Flux';
import GLMV from '../brands/GLMV';
import Gemini from '../brands/Gemini';
import Gemma from '../brands/Gemma';
import Google from '../brands/Google';
import Grok from '../brands/Grok';
import Hunyuan from '../brands/Hunyuan';
import IBM from '../brands/IBM';
import Ideogram from '../brands/Ideogram';
import Inception from '../brands/Inception';
import Inflection from '../brands/Inflection';
import InternLM from '../brands/InternLM';
import Jimeng from '../brands/Jimeng';
import Jina from '../brands/Jina';
import Kling from '../brands/Kling';
import Kolors from '../brands/Kolors';
import Kwaipilot from '../brands/Kwaipilot';
import LG from '../brands/LG';
import LLaVA from '../brands/LLaVA';
import Liquid from '../brands/Liquid';
import LongCat from '../brands/LongCat';
import Menlo from '../brands/Menlo';
import Meta from '../brands/Meta';
import Microsoft from '../brands/Microsoft';
import Minimax from '../brands/Minimax';
import Mistral from '../brands/Mistral';
import Moonshot from '../brands/Moonshot';
import Morph from '../brands/Morph';
import NanoBanana from '../brands/NanoBanana';
import NousResearch from '../brands/NousResearch';
import Nova from '../brands/Nova';
import Nvidia from '../brands/Nvidia';
import OpenAI from '../brands/OpenAI';
import OpenChat from '../brands/OpenChat';
import OpenRouter from '../brands/OpenRouter';
import PaLM from '../brands/PaLM';
import Perplexity from '../brands/Perplexity';
import Phind from '../brands/Phind';
import Qiniu from '../brands/Qiniu';
import Qwen from '../brands/Qwen';
import Relace from '../brands/Relace';
import Rwkv from '../brands/Rwkv';
import SenseNova from '../brands/SenseNova';
import Skywork from '../brands/Skywork';
import Sora from '../brands/Sora';
import Spark from '../brands/Spark';
import Stability from '../brands/Stability';
import Stepfun from '../brands/Stepfun';
import Suno from '../brands/Suno';
import TII from '../brands/TII';
import Udio from '../brands/Udio';
import Upstage from '../brands/Upstage';
import V0 from '../brands/V0';
import VertexAI from '../brands/VertexAI';
import Voyage from '../brands/Voyage';
import Wenxin from '../brands/Wenxin';
import XiaomiMiMo from '../brands/XiaomiMiMo';
import Yi from '../brands/Yi';
import ZAI from '../brands/ZAI';
import type { IconAvatarProps } from '../runtime/IconAvatar';
import type { IconCombineProps } from '../runtime/IconCombine';
import type { IconType } from '../types';

type ModelIconType = FC<IconType & any> & {
  Avatar: FC<Omit<IconAvatarProps, 'Icon'> & any>;
  Brand?: FC<IconType & any>;
  BrandColor?: FC<IconType & any>;
  Color?: FC<IconType & any>;
  Combine?: FC<Omit<IconCombineProps, 'Icon' | 'Text'> & any>;
  Text?: FC<IconType & any>;
};

// Define a type for our model mapping
export interface ModelMapping {
  Icon: ModelIconType;
  keywords: string[];
  props?: any;
}

// Create a mapping of model keywords to their respective Icon functions
export const modelMappings: ModelMapping[] = [
  { Icon: OpenAI, keywords: ['gpt-3'], props: { type: 'gpt3' } },
  { Icon: OpenAI, keywords: ['gpt-4'], props: { type: 'gpt4' } },
  { Icon: OpenAI, keywords: ['gpt-5'], props: { type: 'gpt5' } },
  { Icon: Sora, keywords: ['sora'] },
  { Icon: OpenAI, keywords: ['gpt-oss'], props: { type: 'oss' } },
  {
    Icon: OpenAI,
    keywords: ['o1-', '^o1', '/o1', 'o3-', '^o3', '/o3', 'o4-', '^o4', '/o4'],
    props: { type: 'o1' },
  },
  { Icon: Dalle, keywords: ['dalle', 'dall-e'] },
  {
    Icon: OpenAI,
    keywords: [
      'text-embedding-',
      'tts-',
      'whisper-',
      'codex',
      'davinci',
      'babbage',
      'omni-moderation',
      'text-moderation',
      'text-adb',
      'text-ada',
      'computer-use',
    ],
    props: { type: 'platform' },
  },
  {
    Icon: OpenAI,
    keywords: ['^gpt-', '/gpt-', 'openai'],
  },
  { Icon: GLMV, keywords: ['^glm-(.*)v', '/glm-(.*)v', '-glm-(.*)v'] },
  {
    Icon: ZAI,
    keywords: ['^glm-5', '/glm-5', '/glm5', '-glm-4', '^glm-4', '/glm-4', '/glm4', '-glm-5'],
  },
  { Icon: ChatGLM, keywords: ['^glm-', '/glm-', 'chatglm', '-glm-'] },
  { Icon: CodeGeeX, keywords: ['^codegeex', '/codegeex'] },
  { Icon: Claude, keywords: ['claude'] },
  { Icon: Anthropic, keywords: ['anthropic'] },
  { Icon: Aws, keywords: ['titan'] },
  { Icon: Fireworks, keywords: ['accounts/fireworks/models/fire'] },
  { Icon: InternLM, keywords: ['internlm', 'internvl'] },
  {
    Icon: NousResearch,
    keywords: ['deephermes', 'hermes', 'genstruct', 'minos'],
  },
  {
    Icon: Nvidia,
    keywords: ['nemotron', 'openreasoning', 'nemoretriever', 'neva-', 'nv-'],
  },
  { Icon: Meta, keywords: ['llama', '/l3'] },
  { Icon: LLaVA, keywords: ['llava'] },
  {
    Icon: NanoBanana,
    keywords: [
      'gemini-3.1-flash-image-preview',
      'gemini-3-pro-image-preview',
      'gemini-\\d+(?:\\.\\d+)?-(?:flash|pro)-image-preview$',
      'nanobanana',
      'nano-banana',
    ],
  },
  { Icon: Gemini, keywords: ['gemini'] },
  {
    Icon: DeepMind,
    keywords: ['^imagen-', '/imagen-', '^imagen\\d/', '/imagen\\d'],
  },
  { Icon: Gemma, keywords: ['gemma'] },
  { Icon: Moonshot, keywords: ['kimi', 'moonshot'] },
  { Icon: Qiniu, keywords: ['qiniu'] },
  {
    Icon: Qwen,
    keywords: ['qwen', 'qwq', 'qvq', 'wanx', 'wan\\d/', 'wan\\d\\.\\d-', 'tongyi', 'gte-rerank'],
  },
  { Icon: Minimax, keywords: ['minimax', 'abab', '^image-'] },
  {
    Icon: Mistral,
    keywords: [
      'mistral',
      'mixtral',
      'codestral',
      'mathstral',
      '/mn-',
      'pixtral',
      'ministral',
      'magistral',
      'devstral',
      'voxtral',
    ],
  },
  { Icon: Perplexity, keywords: ['pplx', 'sonar'] },
  { Icon: Yi, keywords: ['^yi-', '/yi-', '-yi-'] },
  { Icon: OpenRouter, keywords: ['^openrouter'] },
  { Icon: Relace, keywords: ['^relace-', '/relace-'] },
  {
    Icon: Arcee,
    keywords: [
      '^trinity-',
      '/trinity-',
      'afm-4.5b',
      'caller-large',
      'spotlight',
      'maestro-reasoning',
      'virtuoso-medium-v2',
      'virtuoso-large',
      'coder-large',
      'arcee-blitz',
    ],
  },
  { Icon: EssentialAI, keywords: ['^rnj-', '/rnj-'] },
  {
    Icon: DeepCogito,
    keywords: ['^deepcogito-', '/deepcogito-', '^cogito-', '/cogito-'],
  },
  { Icon: Morph, keywords: ['^morph-', '/morph-'] },
  { Icon: Ai2, keywords: ['^olmo-', '/olmo-'] },
  { Icon: Inception, keywords: ['^mercury', '/mercury'] },
  { Icon: OpenChat, keywords: ['^openchat'] },
  { Icon: Aya, keywords: ['aya'] },
  { Icon: Cohere, keywords: ['command'] },
  { Icon: Dbrx, keywords: ['dbrx'] },
  { Icon: Stepfun, keywords: ['step'] },
  { Icon: AiMass, keywords: ['taichu'] },
  { Icon: Ai360, keywords: ['360gpt', '360zhinao'] },
  { Icon: Baichuan, keywords: ['baichuan'] },
  { Icon: Rwkv, keywords: ['rwkv', '/eagle-'] },
  { Icon: Wenxin, keywords: ['ernie', 'irag'] },
  { Icon: Jina, keywords: ['^jina', '/jina'] },
  { Icon: Jimeng, keywords: ['^jimeng-', '/jimeng-', 'seedream', 'seededit', 'seedance-'] },
  { Icon: Doubao, keywords: ['^ep-', 'doubao-'] },
  { Icon: Kling, keywords: ['^kling', 'kling-', 'klingai'] },
  { Icon: Hunyuan, keywords: ['hunyuan'] },
  { Icon: FishAudio, keywords: ['^d_', '^g_', '^wd_'] },
  { Icon: ByteDance, keywords: ['skylark', 'seed-', 'bytedance'] },
  { Icon: BurnCloud, keywords: ['burncloud'] },
  {
    Icon: Stability,
    keywords: [
      'stable-diffusion',
      'stable-video',
      'stable-cascade',
      'sdxl',
      'stablelm',
      '^stable-',
      '^sd3',
      '^sd2',
      '^sd1',
    ],
  },
  { Icon: Flux, keywords: ['flux'] },
  { Icon: Suno, keywords: ['suno'] },
  {
    Icon: Microsoft,
    keywords: ['wizardlm', '/phi-', '^phi-', '-phi-', 'mai-', 'microsoft'],
  },
  { Icon: Adobe, keywords: ['firefly'] },
  { Icon: Ai21, keywords: ['jamba', '^j2-', 'ai21'] },
  { Icon: Upstage, keywords: ['^solar-', '/solar'] },
  { Icon: PaLM, keywords: ['palm'] },
  { Icon: SenseNova, keywords: ['SenseChat', 'SenseNova'] },
  { Icon: Grok, keywords: ['^grok-', '/grok-'] },
  { Icon: Ideogram, keywords: ['ideogram', '^v_1', '^v_2', '^v3$', '^upscale$', '^describe$'] },
  {
    Icon: Spark,
    keywords: [
      'spark',
      'general$',
      'generalv3$',
      'generalv3.5$',
      '4.0ultra$',
      'pro-128k$',
      '^max-32k$',
      '^lite$',
      '^x1$',
    ],
  },
  { Icon: Udio, keywords: ['udio'] },
  { Icon: DeepSeek, keywords: ['deepseek'] },
  { Icon: Voyage, keywords: ['voyage'] },
  { Icon: AssemblyAI, keywords: ['assemblyai'] },
  { Icon: Liquid, keywords: ['liquid', 'lfm'] },
  { Icon: Inflection, keywords: ['inflection-'] },
  { Icon: AionLabs, keywords: ['aion-'] },
  { Icon: AiHubMix, keywords: ['aihubmix'] },
  { Icon: V0, keywords: ['^v0-'] },
  { Icon: VertexAI, keywords: ['^veo-', '/veo-', '^veo3'] },
  { Icon: Google, keywords: ['google', 'learnlm', 'nano-banana'] },
  { Icon: CogView, keywords: ['cogview'] },
  { Icon: Kolors, keywords: ['kolors'] },
  { Icon: BaiduCloud, keywords: ['baidu', 'qianfan'] },
  { Icon: Phind, keywords: ['phind'] },
  { Icon: Dolphin, keywords: ['dolphin'] },
  { Icon: IBM, keywords: ['ibm', 'granite'] },
  { Icon: Skywork, keywords: ['skywork'] },
  { Icon: BilibiliIndex, keywords: ['bilibili-index', 'index-tts'] },
  { Icon: Bilibili, keywords: ['bilibili'] },
  { Icon: LG, keywords: ['kmmlu', 'exaone', 'lgai'] },
  { Icon: TII, keywords: ['falcon'] },
  { Icon: Menlo, keywords: ['menlo', 'lucy', 'jan-nano'] },
  { Icon: LongCat, keywords: ['longcat'] },
  { Icon: Kwaipilot, keywords: ['kat-'] },
  { Icon: Nova, keywords: ['^nova-', '/nova-'] },
  { Icon: XiaomiMiMo, keywords: ['^mimo-', '/mimo-'] },
  { Icon: BAAI, keywords: ['^baai', '^bge-', '/beg-', 'touchd', 'robobrain'] },
  { Icon: Ace, keywords: ['ace-step'] },
];
