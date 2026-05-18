// Brand icons (auto-generated re-exports from src/brands).
export * from './brands';

// Feature wrappers
export { default as AgentIcon, type AgentIconProps } from './features/AgentIcon';
export { default as ModelIcon, type ModelIconProps } from './features/ModelIcon';
export { default as ProviderCombine, type ProviderCombineProps } from './features/ProviderCombine';
export { default as ProviderIcon, type ProviderIconProps } from './features/ProviderIcon';

// Runtime primitives
export { default as IconAvatar, type IconAvatarProps } from './runtime/IconAvatar';
export { default as IconCombine, type IconCombineProps } from './runtime/IconCombine';

// Hooks
export { useFillId, useFillIds } from './hooks/useFillId';

// Provider enum (re-exported for consumers building provider-aware UIs)
export { ModelProvider, type ModelProviderKey } from './_internal/providerEnum';

// Types
export type { IconBaseProps, IconType } from './types';
