# @modelicons/svg

300+ AI model brand logos as raw SVG strings. Framework-agnostic.

```bash
npm install @modelicons/svg
```

## Use anywhere

### Vue

```vue
<script setup>
import { mono } from '@modelicons/svg/OpenAI';
</script>

<template>
  <div v-html="mono" />
</template>
```

### Svelte

```svelte
<script>
  import { mono } from '@modelicons/svg/OpenAI';
</script>

{@html mono}
```

### SolidJS

```tsx
import { mono } from '@modelicons/svg/OpenAI';

() => <div innerHTML={mono} />;
```

### Astro

```astro
---
import { mono } from '@modelicons/svg/OpenAI';
---
<Fragment set:html={mono} />
```

### Vanilla HTML / DOM

```ts
import { mono } from '@modelicons/svg/OpenAI';
document.getElementById('logo').innerHTML = mono;
```

### Web Components

```ts
import { mono } from '@modelicons/svg/OpenAI';

class Logo extends HTMLElement {
  connectedCallback() { this.innerHTML = mono; }
}
customElements.define('llm-logo', Logo);
```

## What each brand exports

```ts
import {
  mono,          // <svg fill="currentColor"> single-color string
  color,         // <svg> full-color string (where the brand has a Color variant)
  text,          // <svg> wordmark / logotype string (where present)
  title,         // 'OpenAI'
  colorPrimary,  // '#000'
} from '@modelicons/svg/OpenAI';
```

## Bulk metadata

```ts
import { brands } from '@modelicons/svg';

console.log(brands.length);  // 319
console.log(brands[0]);      // { id: 'Ace', title: 'Ace', colorPrimary: '#...' }
```

## React?

Use [`modelicons`](https://www.npmjs.com/package/modelicons) instead — it ships React components built from the same SVG sources.

## License

MIT. SVG art derived from [lobehub/lobe-icons](https://github.com/lobehub/lobe-icons) (MIT).
