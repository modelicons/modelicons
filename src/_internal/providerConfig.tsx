import type { HTMLAttributes } from 'react';
import { FC, memo } from 'react';

import Ai21 from '../brands/Ai21';
import Ai302 from '../brands/Ai302';
import Ai360 from '../brands/Ai360';
import AiHubMix from '../brands/AiHubMix';
import AiMass from '../brands/AiMass';
import AiStudio from '../brands/AiStudio';
import AkashChat from '../brands/AkashChat';
import AlephAlpha from '../brands/AlephAlpha';
import Alibaba from '../brands/Alibaba';
import AlibabaCloud from '../brands/AlibabaCloud';
import AntGroup from '../brands/AntGroup';
import Anthropic from '../brands/Anthropic';
import Anyscale from '../brands/Anyscale';
import Apple from '../brands/Apple';
import AtlasCloud from '../brands/AtlasCloud';
import Aws from '../brands/Aws';
import Azure from '../brands/Azure';
import AzureAI from '../brands/AzureAI';
import Baichuan from '../brands/Baichuan';
import Baidu from '../brands/Baidu';
import BaiduCloud from '../brands/BaiduCloud';
import Bailian from '../brands/Bailian';
import Baseten from '../brands/Baseten';
import Bedrock from '../brands/Bedrock';
import Bfl from '../brands/Bfl';
import Bilibili from '../brands/Bilibili';
import BurnCloud from '../brands/BurnCloud';
import ByteDance from '../brands/ByteDance';
import CentML from '../brands/CentML';
import Cerebras from '../brands/Cerebras';
import Civitai from '../brands/Civitai';
import Claude from '../brands/Claude';
import Cloudflare from '../brands/Cloudflare';
import Cohere from '../brands/Cohere';
import CometAPI from '../brands/CometAPI';
import ComfyUI from '../brands/ComfyUI';
import Copilot from '../brands/Copilot';
import Crusoe from '../brands/Crusoe';
import DeepInfra from '../brands/DeepInfra';
import DeepMind from '../brands/DeepMind';
import DeepSeek from '../brands/DeepSeek';
import Doubao from '../brands/Doubao';
import Exa from '../brands/Exa';
import Fal from '../brands/Fal';
import Featherless from '../brands/Featherless';
import Fireworks from '../brands/Fireworks';
import Friendli from '../brands/Friendli';
import Gemini from '../brands/Gemini';
import GiteeAI from '../brands/GiteeAI';
import Github from '../brands/Github';
import GithubCopilot from '../brands/GithubCopilot';
import Google from '../brands/Google';
import GoogleCloud from '../brands/GoogleCloud';
import Groq from '../brands/Groq';
import Higress from '../brands/Higress';
import Huawei from '../brands/Huawei';
import HuaweiCloud from '../brands/HuaweiCloud';
import HuggingFace from '../brands/HuggingFace';
import Hunyuan from '../brands/Hunyuan';
import Hyperbolic from '../brands/Hyperbolic';
import IBM from '../brands/IBM';
import IFlyTekCloud from '../brands/IFlyTekCloud';
import Inference from '../brands/Inference';
import Infermatic from '../brands/Infermatic';
import Infinigence from '../brands/Infinigence';
import InternLM from '../brands/InternLM';
import Jina from '../brands/Jina';
import Kluster from '../brands/Kluster';
import LG from '../brands/LG';
import Lambda from '../brands/Lambda';
import LeptonAI from '../brands/LeptonAI';
import LlmApi from '../brands/LlmApi';
import LmStudio from '../brands/LmStudio';
import LobeHub from '../brands/LobeHub';
import LongCat from '../brands/LongCat';
import Menlo from '../brands/Menlo';
import Meta from '../brands/Meta';
import Microsoft from '../brands/Microsoft';
import Minimax from '../brands/Minimax';
import Mistral from '../brands/Mistral';
import ModelScope from '../brands/ModelScope';
import Moonshot from '../brands/Moonshot';
import NPLCloud from '../brands/NPLCloud';
import Nebius from '../brands/Nebius';
import NewAPI from '../brands/NewAPI';
import NousResearch from '../brands/NousResearch';
import Novita from '../brands/Novita';
import Nvidia from '../brands/Nvidia';
import Ollama from '../brands/Ollama';
import OpenAI from '../brands/OpenAI';
import OpenCode from '../brands/OpenCode';
import OpenRouter from '../brands/OpenRouter';
import PPIO from '../brands/PPIO';
import Parasail from '../brands/Parasail';
import Perplexity from '../brands/Perplexity';
import Player2 from '../brands/Player2';
import Qiniu from '../brands/Qiniu';
import Qwen from '../brands/Qwen';
import Replicate from '../brands/Replicate';
import SambaNova from '../brands/SambaNova';
import Search1API from '../brands/Search1API';
import SearchApi from '../brands/SearchApi';
import SenseNova from '../brands/SenseNova';
import SiliconCloud from '../brands/SiliconCloud';
import Snowflake from '../brands/Snowflake';
import SophNet from '../brands/SophNet';
import Spark from '../brands/Spark';
import Stability from '../brands/Stability';
import StateCloud from '../brands/StateCloud';
import Stepfun from '../brands/Stepfun';
import Straico from '../brands/Straico';
import StreamLake from '../brands/StreamLake';
import SubModel from '../brands/SubModel';
import TII from '../brands/TII';
import Targon from '../brands/Targon';
import Tencent from '../brands/Tencent';
import TencentCloud from '../brands/TencentCloud';
import Together from '../brands/Together';
import Upstage from '../brands/Upstage';
import V0 from '../brands/V0';
import Vercel from '../brands/Vercel';
import VertexAI from '../brands/VertexAI';
import Vllm from '../brands/Vllm';
import Volcengine from '../brands/Volcengine';
import Wenxin from '../brands/Wenxin';
import WorkersAI from '../brands/WorkersAI';
import XAI from '../brands/XAI';
import XiaomiMiMo from '../brands/XiaomiMiMo';
import Xinference from '../brands/Xinference';
import Xpay from '../brands/Xpay';
import Yandex from '../brands/Yandex';
import ZenMux from '../brands/ZenMux';
import ZeroOne from '../brands/ZeroOne';
import Zhipu from '../brands/Zhipu';
import type { IconType } from '../types';

import type { IconAvatarProps } from '../runtime/IconAvatar';
import type { IconCombineProps } from '../runtime/IconCombine';
import Combine from '../runtime/SegmentedCombine';
import { ModelProvider } from './providerEnum';

type ProviderIconType = FC<IconType & any> & {
  Avatar: FC<Omit<IconAvatarProps, 'Icon'> & any>;
  Brand?: FC<IconType & any>;
  BrandColor?: FC<IconType & any>;
  Color?: FC<IconType & any>;
  Combine?: FC<Omit<IconCombineProps, 'Icon' | 'Text'> & any>;
  Text?: FC<IconType & any>;
};

export interface ProviderMapping {
  Combine?: FC<HTMLAttributes<HTMLDivElement> & { size: number; type: 'color' | 'mono' }>;
  Icon: ProviderIconType;
  combineMultiple?: number;
  keywords: string[];
  props?: any;
}

export const providerMappings: ProviderMapping[] = [
  { Icon: Alibaba, keywords: [ModelProvider.Alibaba] },
  { Icon: AlephAlpha, keywords: [ModelProvider.AlephAlpha] },
  { Icon: AntGroup, keywords: [ModelProvider.AntGroup] },
  { Icon: Anyscale, keywords: [ModelProvider.Anyscale] },
  { Icon: Apple, keywords: [ModelProvider.Apple] },
  { Icon: Baidu, keywords: [ModelProvider.Baidu] },
  { Icon: Bailian, keywords: [ModelProvider.Bailian, ModelProvider.BailianCodingPlan] },
  { Icon: Baseten, keywords: [ModelProvider.Baseten] },
  { Icon: Bilibili, keywords: [ModelProvider.Bilibili] },
  { Icon: ByteDance, keywords: [ModelProvider.ByteDance] },
  { Icon: CentML, keywords: [ModelProvider.CentML] },
  { Icon: Civitai, keywords: [ModelProvider.Civitai] },
  { Icon: Crusoe, keywords: [ModelProvider.Crusoe] },
  { Icon: DeepInfra, keywords: [ModelProvider.DeepInfra] },
  { Icon: DeepMind, keywords: [ModelProvider.DeepMind] },
  { Icon: Exa, keywords: [ModelProvider.Exa] },
  { Icon: Featherless, keywords: [ModelProvider.Featherless] },
  { Icon: Friendli, keywords: [ModelProvider.Friendli] },
  { Icon: GoogleCloud, keywords: [ModelProvider.GoogleCloud] },
  { Icon: Huawei, keywords: [ModelProvider.Huawei] },
  { Icon: HuaweiCloud, keywords: [ModelProvider.HuaweiCloud] },
  { Icon: Hyperbolic, keywords: [ModelProvider.Hyperbolic] },
  { Icon: IBM, keywords: [ModelProvider.IBM] },
  { Icon: IFlyTekCloud, keywords: [ModelProvider.IFlyTekCloud] },
  { Icon: Inference, keywords: [ModelProvider.Inference] },
  { Icon: Infermatic, keywords: [ModelProvider.Infermatic] },
  { Icon: Kluster, keywords: [ModelProvider.Kluster] },
  { Icon: Lambda, keywords: [ModelProvider.Lambda] },
  { Icon: LeptonAI, keywords: [ModelProvider.LeptonAI] },
  { Icon: LlmApi, keywords: [ModelProvider.LlmApi] },
  { Icon: LG, keywords: [ModelProvider.LG] },
  { Icon: Menlo, keywords: [ModelProvider.Menlo] },
  { Icon: Meta, keywords: [ModelProvider.Meta] },
  { Icon: Microsoft, keywords: [ModelProvider.Microsoft] },
  { Icon: NPLCloud, keywords: [ModelProvider.NPLCloud] },
  { Icon: NousResearch, keywords: [ModelProvider.NousResearch] },
  { Icon: Parasail, keywords: [ModelProvider.Parasail] },
  { Icon: SearchApi, keywords: [ModelProvider.SearchApi] },
  { Icon: Snowflake, keywords: [ModelProvider.Snowflake] },
  { Icon: Stability, keywords: [ModelProvider.Stability] },
  { Icon: StateCloud, keywords: [ModelProvider.StateCloud] },
  { Icon: StreamLake, keywords: [ModelProvider.StreamLake] },
  { Icon: SubModel, keywords: [ModelProvider.SubModel] },
  { Icon: Targon, keywords: [ModelProvider.Targon] },
  { Icon: Tencent, keywords: [ModelProvider.Tencent] },
  { Icon: TII, keywords: [ModelProvider.TII] },
  { Icon: Yandex, keywords: [ModelProvider.Yandex] },

  { Icon: AiMass, keywords: [ModelProvider.AiMass] },
  { Icon: AiStudio, keywords: [ModelProvider.AiStudio] },
  { Icon: LobeHub, combineMultiple: 1.1, keywords: [ModelProvider.LobeHub] },
  {
    Icon: Zhipu,
    combineMultiple: 1.25,
    keywords: [ModelProvider.ZhiPu, ModelProvider.GLMCodingPlan],
  },
  {
    Combine: memo(({ size = 24, type = 'color', ...props }) => (
      <Combine
        left={type === 'color' ? <Aws.Color size={size * 1.2} /> : <Aws size={size * 1.2} />}
        right={<Bedrock.Combine size={size} type={type} />}
        size={size}
        {...props}
      />
    )),
    Icon: Bedrock,
    combineMultiple: 1.1,
    keywords: [ModelProvider.Bedrock],
  },
  { Icon: DeepSeek, combineMultiple: 1.16, keywords: [ModelProvider.DeepSeek] },
  {
    Combine: memo(({ size = 24, type = 'color', ...props }) => (
      <Combine
        left={
          type === 'color' ? (
            <Google.BrandColor size={size * 0.95} />
          ) : (
            <Google.Brand size={size * 0.95} />
          )
        }
        right={<Gemini.Combine size={size} type={type} />}
        size={size}
        {...props}
      />
    )),
    Icon: Google,
    combineMultiple: 0.92,
    keywords: [ModelProvider.Google],
  },
  {
    Combine: memo(({ size = 24, type = 'color', ...props }) => (
      <Combine
        left={<Azure.Combine size={size * 0.92} type={type} />}
        right={<OpenAI.Combine size={size} />}
        size={size}
        {...props}
      />
    )),
    Icon: Azure,
    combineMultiple: 0.9,
    keywords: [ModelProvider.Azure],
  },
  {
    Icon: Moonshot,
    combineMultiple: 0.9,
    keywords: [ModelProvider.Moonshot, ModelProvider.KimiCodingPlan],
  },
  { Icon: Novita, keywords: [ModelProvider.Novita] },
  { Icon: OpenAI, keywords: [ModelProvider.OpenAI] },
  {
    Icon: OpenCode,
    keywords: [
      ModelProvider.OpenCode,
      ModelProvider.OpenCodeCodingPlan,
      ModelProvider.OpenCodeGo,
      ModelProvider.OpenCodeZen,
    ],
  },
  { Icon: Ollama, combineMultiple: 1.16, keywords: [ModelProvider.Ollama] },
  { Icon: Perplexity, keywords: [ModelProvider.Perplexity] },
  {
    Icon: Minimax,
    combineMultiple: 1.3,
    keywords: [ModelProvider.Minimax, ModelProvider.MiniMaxCodingPlan],
  },
  { Icon: Mistral, keywords: [ModelProvider.Mistral] },
  {
    Combine: memo(({ size = 24, type = 'color', ...props }) => (
      <Combine
        left={<Anthropic.Text size={size * 0.75} />}
        right={<Claude.Combine size={size} type={type} />}
        size={size}
        {...props}
      />
    )),
    Icon: Anthropic,
    combineMultiple: 0.83,
    keywords: [ModelProvider.Anthropic],
  },
  { Icon: Groq, keywords: [ModelProvider.Groq] },
  { Icon: OpenRouter, combineMultiple: 0.8, keywords: [ModelProvider.OpenRouter] },
  { Icon: ZeroOne, combineMultiple: 1, keywords: [ModelProvider.ZeroOne] },
  { Icon: Together, keywords: [ModelProvider.TogetherAI] },
  { Icon: Qiniu, combineMultiple: 1.1, keywords: [ModelProvider.Qiniu] },
  {
    Combine: memo(({ size = 24, type = 'color', ...props }) => (
      <Combine
        left={<AlibabaCloud.Combine size={size} type={type} />}
        right={<Qwen.Combine size={size * 0.9} type={type} />}
        size={size}
        {...props}
      />
    )),
    Icon: AlibabaCloud,
    combineMultiple: 1.1,
    keywords: [ModelProvider.Qwen],
  },
  {
    Icon: Stepfun,
    combineMultiple: 0.83,
    keywords: [ModelProvider.Stepfun, ModelProvider.StepfunCodingPlan],
  },
  { Icon: Spark, combineMultiple: 0.92, keywords: [ModelProvider.Spark] },
  { Icon: Fireworks, combineMultiple: 1.14, keywords: [ModelProvider.FireworksAI] },
  { Icon: Baichuan, combineMultiple: 0.83, keywords: [ModelProvider.Baichuan] },
  { Icon: BurnCloud, combineMultiple: 1.2, keywords: [ModelProvider.BurnCloud] },
  { Icon: AiMass, combineMultiple: 1.16, keywords: [ModelProvider.Taichu] },
  { Icon: Ai360, combineMultiple: 0.83, keywords: [ModelProvider.Ai360] },
  { Icon: SiliconCloud, combineMultiple: 1, keywords: [ModelProvider.SiliconCloud] },
  { Icon: Upstage, combineMultiple: 0.9, keywords: [ModelProvider.Upstage] },
  { Icon: Ai21, combineMultiple: 0.9, keywords: [ModelProvider.Ai21] },
  { Icon: Player2, combineMultiple: 0.9, keywords: [ModelProvider.Player2] },
  { Icon: Github, combineMultiple: 0.95, keywords: [ModelProvider.Github] },
  {
    Icon: GithubCopilot,
    combineMultiple: 0.95,
    keywords: [ModelProvider.GithubCopilot, 'github-copilot'],
  },
  { Icon: Copilot, combineMultiple: 0.95, keywords: [ModelProvider.Copilot] },
  { Icon: Doubao, keywords: [ModelProvider.Doubao] },
  { Icon: Hunyuan, keywords: [ModelProvider.Hunyuan] },
  { Icon: Nvidia, keywords: [ModelProvider.Nvidia] },
  { Icon: TencentCloud, keywords: [ModelProvider.TencentCloud] },
  {
    Combine: memo(({ size = 24, type = 'color', ...props }) => (
      <Combine
        left={<BaiduCloud.Combine size={size * 0.9} type={type} />}
        right={<Wenxin.Combine extra={'千帆'} size={size} type={type} {...props} />}
        size={size}
        {...props}
      />
    )),
    Icon: Wenxin,
    keywords: [ModelProvider.Wenxin],
  },
  { Icon: SenseNova, combineMultiple: 0.95, keywords: [ModelProvider.SenseNova] },
  { Icon: HuggingFace, combineMultiple: 1.16, keywords: [ModelProvider.HuggingFace] },
  { Icon: LmStudio, keywords: [ModelProvider.LmStudio] },
  { Icon: XAI, combineMultiple: 0.85, keywords: [ModelProvider.XAI] },
  {
    Combine: memo(({ size = 24, type = 'color', ...props }) => (
      <Combine
        left={<Cloudflare.Combine size={size * 1.1} type={type} />}
        right={<WorkersAI.Combine size={size * 0.9} type={type} />}
        size={size}
        {...props}
      />
    )),
    Icon: Cloudflare,
    combineMultiple: 1.1,
    keywords: [ModelProvider.Cloudflare],
  },
  { Icon: InternLM, combineMultiple: 0.95, keywords: [ModelProvider.InternLM] },
  { Icon: Higress, keywords: [ModelProvider.Higress] },
  { Icon: Vllm, combineMultiple: 0.85, keywords: [ModelProvider.VLLM] },
  { Icon: GiteeAI, combineMultiple: 0.95, keywords: [ModelProvider.GiteeAI] },
  { Icon: ModelScope, combineMultiple: 1.2, keywords: [ModelProvider.ModelScope] },
  { Icon: VertexAI, keywords: [ModelProvider.VertexAI] },
  { Icon: PPIO, combineMultiple: 0.85, keywords: [ModelProvider.PPIO] },
  { Icon: Jina, keywords: [ModelProvider.Jina] },
  { Icon: AzureAI, keywords: [ModelProvider.AzureAI] },
  { Icon: Volcengine, keywords: [ModelProvider.Volcengine, ModelProvider.VolcengineCodingPlan] },
  { Icon: SambaNova, combineMultiple: 0.8, keywords: [ModelProvider.SambaNova] },
  { Icon: Cohere, keywords: [ModelProvider.Cohere] },
  { Icon: ComfyUI, keywords: [ModelProvider.ComfyUI] },
  { Icon: Search1API, combineMultiple: 0.9, keywords: [ModelProvider.Search1API] },
  { Icon: Infinigence, combineMultiple: 0.8, keywords: [ModelProvider.InfiniAI] },
  { Icon: Xinference, combineMultiple: 0.85, keywords: [ModelProvider.Xinference] },
  { Icon: Xpay, combineMultiple: 0.8, keywords: [ModelProvider.Xpay] },
  { Icon: Fal, combineMultiple: 0.8, keywords: [ModelProvider.Fal] },
  { Icon: Ai302, combineMultiple: 0.9, keywords: [ModelProvider.Ai302] },
  { Icon: AiHubMix, combineMultiple: 0.9, keywords: [ModelProvider.AiHubMix] },
  { Icon: CometAPI, keywords: [ModelProvider.CometAPI] },
  {
    Combine: memo(({ size = 24, ...props }) => (
      <Combine
        left={<Vercel.Combine size={size * 0.85} />}
        right={<V0 size={size * 1.1} />}
        size={size}
        {...props}
      />
    )),
    Icon: Vercel,
    keywords: [ModelProvider.V0],
  },
  {
    Icon: Vercel,
    combineMultiple: 0.85,
    keywords: [ModelProvider.Vercel, ModelProvider.VercelAIGateway],
  },
  { Icon: Bfl, keywords: [ModelProvider.Bfl] },
  { Icon: Replicate, combineMultiple: 0.9, keywords: [ModelProvider.Replicate] },
  { Icon: Nebius, combineMultiple: 0.75, keywords: [ModelProvider.Nebius] },
  { Icon: NewAPI, combineMultiple: 0.85, keywords: [ModelProvider.NewAPI] },
  { Icon: AkashChat, combineMultiple: 0.8, keywords: [ModelProvider.AkashChat] },
  { Icon: AtlasCloud, combineMultiple: 0.8, keywords: [ModelProvider.AtlasCloud] },
  { Icon: SophNet, combineMultiple: 0.85, keywords: [ModelProvider.SophNet] },
  {
    Combine: memo(({ size = 24, ...props }) => (
      <Ollama.Combine
        extra={'Cloud'}
        extraStyle={{ fontSize: size * 0.78, fontWeight: 500, marginLeft: size * 0.2 }}
        size={size * 1.16}
        {...props}
      />
    )),
    Icon: Ollama,
    keywords: [ModelProvider.OllamaCloud],
  },
  { Icon: LongCat, combineMultiple: 1, keywords: [ModelProvider.LongCat] },
  { Icon: Cerebras, combineMultiple: 1, keywords: [ModelProvider.Cerebras] },
  { Icon: Straico, combineMultiple: 0.85, keywords: [ModelProvider.Straico] },
  { Icon: ZenMux, combineMultiple: 1, keywords: [ModelProvider.ZenMux], props: { inverse: true } },
  { Icon: XiaomiMiMo, combineMultiple: 0.7, keywords: [ModelProvider.XiaomiMiMo] },
];
