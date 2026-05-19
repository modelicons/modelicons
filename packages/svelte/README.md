# @modelicons/svelte

300+ AI model brand icons for Svelte 4/5. Zero runtime dependencies.

```bash
npm install @modelicons/svelte
```

Works in SvelteKit out of the box (vite-plugin-svelte handles compilation).

## Usage

```svelte
<script>
  import { Mono as OpenAI, Color as OpenAIColor } from '@modelicons/svelte/OpenAI';
  import { Color as Gemini } from '@modelicons/svelte/Gemini';
</script>

<OpenAI size={32} />
<OpenAIColor size={32} />
<Gemini size={48} />
```

Or from the index:

```svelte
<script>
  import { OpenAI, Anthropic, Gemini } from '@modelicons/svelte';
</script>

<OpenAI.Mono size={32} />
<Anthropic.Mono size={24} />
<Gemini.Color size={32} color="#fff" />
```

## Props

Every component accepts:

| Prop  | Type              | Default        |
| ----- | ----------------- | -------------- |
| size  | `string \| number` | `'1em'`        |
| color | `string`           | `'currentColor'` (Mono only) |

## Bulk metadata

```ts
import { brands } from '@modelicons/svelte';
console.log(brands.length); // 319
```

## License

MIT. SVG art derived from [lobehub/lobe-icons](https://github.com/lobehub/lobe-icons) (MIT).
