import * as Icons from 'modelicons';

import { type CategoryId, categoryOf } from './categories';

export interface BrandEntry {
  id: string;
  Icon: any;
  category: CategoryId | 'other';
  hasColor: boolean;
  hasText: boolean;
  hasCombine: boolean;
  colorPrimary?: string;
  title?: string;
}

const RESERVED = new Set([
  'IconAvatar','IconCombine','ProviderIcon','ModelIcon','ProviderCombine','AgentIcon',
  'useFillId','useFillIds','ModelProvider',
]);

// `memo()` returns an object with $$typeof, not a plain function. The brand
// compound icon is `Mono as CompoundedIcon` where Mono is a MemoExoticComponent.
// We detect it by the presence of an `.Avatar` static (also a memo result).
const isReactComponent = (v: unknown): boolean =>
  typeof v === 'function' || (typeof v === 'object' && v !== null && '$$typeof' in v);

export const ALL_BRANDS: BrandEntry[] = Object.entries(Icons)
  .filter(([k, v]) => {
    if (RESERVED.has(k)) return false;
    if (!isReactComponent(v)) return false;
    const Avatar = (v as any).Avatar;
    return isReactComponent(Avatar);
  })
  .map(([id, Icon]: [string, any]) => ({
    id,
    Icon,
    category: categoryOf(id),
    hasColor: isReactComponent(Icon.Color),
    hasText: isReactComponent(Icon.Text),
    hasCombine: isReactComponent(Icon.Combine),
    colorPrimary: Icon.colorPrimary,
    title: Icon.title,
  }))
  .sort((a, b) => a.id.localeCompare(b.id, 'en', { sensitivity: 'base' }));
