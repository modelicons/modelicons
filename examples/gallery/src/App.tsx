import * as Icons from 'modelicons';
import { useDeferredValue, useMemo, useState } from 'react';

type BrandKey = keyof typeof Icons;

// Filter the exports namespace down to brand icons. Brand components are
// compound components with a `.Avatar` static, while feature wrappers
// (ProviderIcon, IconAvatar, useFillId...) are not.
const isBrand = (key: string, val: unknown): val is BrandKey =>
  typeof val === 'function' &&
  // @ts-expect-error compound static
  typeof val.Avatar === 'function' &&
  !/^(IconAvatar|IconCombine|ProviderIcon|ProviderCombine|ModelIcon|AgentIcon)$/.test(key);

const brandList = Object.entries(Icons)
  .filter(([k, v]) => isBrand(k, v))
  .map(([k, v]) => [k, v as any] as const)
  .sort(([a], [b]) => a.localeCompare(b));

type Variant = 'auto' | 'mono' | 'color' | 'avatar' | 'combine';

const variants: { id: Variant; label: string }[] = [
  { id: 'auto', label: 'Mixed' },
  { id: 'mono', label: 'Mono' },
  { id: 'color', label: 'Color' },
  { id: 'avatar', label: 'Avatar' },
  { id: 'combine', label: 'Combine' },
];

function App() {
  const [q, setQ] = useState('');
  const [variant, setVariant] = useState<Variant>('auto');
  const deferred = useDeferredValue(q.toLowerCase());

  const filtered = useMemo(
    () => (deferred ? brandList.filter(([k]) => k.toLowerCase().includes(deferred)) : brandList),
    [deferred],
  );

  return (
    <div>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>modelicons</h1>
        <p style={{ color: 'var(--muted)', margin: '8px 0 16px' }}>
          {brandList.length} AI / LLM brand icons. Zero runtime dependencies. ~5–9 KB per icon
          tree-shaken.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${brandList.length} brands…`}
            style={{
              flex: '1 1 240px',
              padding: '10px 14px',
              border: '1px solid var(--border)',
              borderRadius: 8,
              background: 'var(--card)',
              color: 'var(--fg)',
              fontSize: 14,
              outline: 'none',
            }}
          />
          <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--card)', borderRadius: 8, border: '1px solid var(--border)' }}>
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariant(v.id)}
                style={{
                  border: 'none',
                  padding: '6px 12px',
                  fontSize: 13,
                  borderRadius: 6,
                  cursor: 'pointer',
                  background: variant === v.id ? 'var(--accent)' : 'transparent',
                  color: variant === v.id ? 'var(--bg)' : 'var(--muted)',
                  fontWeight: variant === v.id ? 600 : 400,
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div
        style={{
          display: 'grid',
          gap: 8,
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        }}
      >
        {filtered.map(([name, Icon]) => (
          <Card key={name} name={name} Icon={Icon} variant={variant} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--muted)', padding: 48 }}>
          No brands match “{q}”.
        </p>
      )}
    </div>
  );
}

function Card({ name, Icon, variant }: { name: string; Icon: any; variant: Variant }) {
  const v = variant === 'auto' ? pickAuto(Icon) : variant;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: 16,
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        minHeight: 96,
      }}
    >
      <div style={{ height: 40, display: 'flex', alignItems: 'center' }}>
        {renderVariant(Icon, v)}
      </div>
      <code style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center' }}>{name}</code>
    </div>
  );
}

function renderVariant(Icon: any, v: Variant) {
  switch (v) {
    case 'mono':
      return <Icon size={32} />;
    case 'color':
      return Icon.Color ? <Icon.Color size={32} /> : <Icon size={32} />;
    case 'avatar':
      return <Icon.Avatar size={36} />;
    case 'combine':
      return Icon.Combine ? <Icon.Combine size={20} /> : Icon.Text ? <Icon.Text size={20} /> : <Icon size={32} />;
    default:
      return <Icon size={32} />;
  }
}

function pickAuto(Icon: any): Variant {
  if (Icon.Color) return 'color';
  if (Icon.Avatar) return 'avatar';
  return 'mono';
}

export default App;
