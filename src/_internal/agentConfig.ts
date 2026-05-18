import { FC } from 'react';

import Amp from '../brands/Amp';
import Antigravity from '../brands/Antigravity';
import CherryStudio from '../brands/CherryStudio';
import Claude from '../brands/Claude';
import ClaudeCode from '../brands/ClaudeCode';
import Cline from '../brands/Cline';
import CodeBuddy from '../brands/CodeBuddy';
import CodeFlicker from '../brands/CodeFlicker';
import Codex from '../brands/Codex';
import Copilot from '../brands/Copilot';
import Coze from '../brands/Coze';
import Cursor from '../brands/Cursor';
import Dify from '../brands/Dify';
import Flowith from '../brands/Flowith';
import Gemini from '../brands/Gemini';
import GeminiCLI from '../brands/GeminiCLI';
import GithubCopilot from '../brands/GithubCopilot';
import Goose from '../brands/Goose';
import HermesAgent from '../brands/HermesAgent';
import Junie from '../brands/Junie';
import KiloCode from '../brands/KiloCode';
import Kimi from '../brands/Kimi';
import LobeHub from '../brands/LobeHub';
import Manus from '../brands/Manus';
import MetaAI from '../brands/MetaAI';
import Microsoft from '../brands/Microsoft';
import N8n from '../brands/N8n';
import Notion from '../brands/Notion';
import OpenAI from '../brands/OpenAI';
import OpenClaw from '../brands/OpenClaw';
import OpenCode from '../brands/OpenCode';
import OpenHands from '../brands/OpenHands';
import OpenWebUI from '../brands/OpenWebUI';
import Qoder from '../brands/Qoder';
import Qwen from '../brands/Qwen';
import Replit from '../brands/Replit';
import RooCode from '../brands/RooCode';
import Trae from '../brands/Trae';
import Windsurf from '../brands/Windsurf';
import Zencoder from '../brands/Zencoder';
import ZeroOne from '../brands/ZeroOne';
import type { IconAvatarProps } from '../runtime/IconAvatar';
import type { IconCombineProps } from '../runtime/IconCombine';
import type { IconType } from '../types';

type AgentIconType = FC<IconType & any> & {
  Avatar: FC<Omit<IconAvatarProps, 'Icon'> & any>;
  Brand?: FC<IconType & any>;
  BrandColor?: FC<IconType & any>;
  Color?: FC<IconType & any>;
  Combine?: FC<Omit<IconCombineProps, 'Icon' | 'Text'> & any>;
  Text?: FC<IconType & any>;
};

// Define a type for our agent mapping
export interface AgentMapping {
  Icon: AgentIconType;
  keywords: string[];
  props?: any;
}

// Create a mapping of agent keywords to their respective Icon functions
export const agentMappings: AgentMapping[] = [
  {
    Icon: LobeHub,
    keywords: ['lobehub', 'lobechat', 'lobe-chat', 'lobe-agent', 'lobe-ai', 'lobeai', 'lobe'],
  },
  { Icon: ClaudeCode, keywords: ['claude-code', 'claudecode', 'claude-co'] },
  { Icon: Claude, keywords: ['claude-desktop', 'open-claude', 'claude'] },
  { Icon: Codex, keywords: ['codex'] },
  { Icon: OpenAI, keywords: ['openai', 'chatgpt', 'gpt'] },
  { Icon: Kimi, keywords: ['kimi-cli', 'kimi-code', 'kimi', 'kimiclaw', 'kimi-claw'] },
  {
    Icon: OpenClaw,
    keywords: [
      'open-claw',
      'openclaw',
      'dewu-smartclaw',
      'nanoclaw',
      'zeroclaw',
      'goclaw',
      'clawhub',
      'catpaw',
      'copaw',
      'clawdbot',
      'moltbot',
      'claw',
    ],
  },
  { Icon: HermesAgent, keywords: ['hermes'] },
  { Icon: Manus, keywords: ['manus'] },
  { Icon: CherryStudio, keywords: ['cherry-studio', 'cherrystudio'] },
  { Icon: Cursor, keywords: ['cursor'] },
  { Icon: Amp, keywords: ['amp'] },
  {
    Icon: GithubCopilot,
    keywords: [
      'github-copilot-cli',
      'github-copilot',
      'githubcopilot',
      'vscode-copilot',
      'copilot-cli',
      'github',
    ],
  },
  { Icon: Copilot, keywords: ['copilot'] },
  { Icon: GeminiCLI, keywords: ['geminicli', 'gemini-cli'] },
  { Icon: Gemini, keywords: ['gemini-scout', 'gemini'] },
  { Icon: KiloCode, keywords: ['kilo-code', 'kilocode', 'kilo', 'kiro-cli', 'kiro'] },
  { Icon: Junie, keywords: ['junie'] },
  { Icon: Replit, keywords: ['replit'] },
  { Icon: Windsurf, keywords: ['windsurf'] },
  { Icon: Cline, keywords: ['cline'] },
  {
    Icon: OpenCode,
    keywords: [
      'open-code',
      'opencode',
      'openwork',
      'open-code-go',
      'opencodego',
      'opencodecodingplan',
      'open-code-zen',
      'opencodezen',
    ],
  },
  { Icon: OpenHands, keywords: ['open-hands', 'openhands'] },
  { Icon: RooCode, keywords: ['roo-code', 'roocode'] },
  { Icon: Goose, keywords: ['goose'] },
  { Icon: Trae, keywords: ['trae-ide', 'trae-ai', 'traeb', 'trae'] },
  { Icon: Zencoder, keywords: ['zencoder'] },
  { Icon: Coze, keywords: ['coze-coding', 'coze'] },
  { Icon: Dify, keywords: ['dify'] },
  { Icon: Antigravity, keywords: ['antigravity', 'google'] },
  { Icon: Qoder, keywords: ['qoder-work', 'qoder'] },
  { Icon: Qwen, keywords: ['qwen-code', 'qwen'] },
  { Icon: Microsoft, keywords: ['windows', 'vscode', 'micode'] },
  { Icon: OpenWebUI, keywords: ['openwebui-bridge', 'openwebui'] },
  { Icon: CodeFlicker, keywords: ['codeflicker'] },
  { Icon: Flowith, keywords: ['iflow', 'flowith'] },
  { Icon: ZeroOne, keywords: ['agent-zero', 'agentzero', 'agent0'] },
  { Icon: MetaAI, keywords: ['meta-ai', 'metaai'] },
  { Icon: N8n, keywords: ['n8n'] },
  { Icon: Notion, keywords: ['notion'] },
  { Icon: CodeBuddy, keywords: ['code-buddy', 'codebuddy'] },
];
