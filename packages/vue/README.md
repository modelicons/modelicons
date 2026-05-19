# @modelicons/vue

300+ AI model brand icons for Vue 3. Zero runtime dependencies.

```bash
npm install @modelicons/vue
```

## Usage

```vue
<script setup>
import { Mono as OpenAI } from '@modelicons/vue/OpenAI';
import { Color as GeminiColor } from '@modelicons/vue/Gemini';
</script>

<template>
  <OpenAI :size="32" />
  <GeminiColor :size="48" />
</template>
```

Or import any brand from the index:

```vue
<script setup>
import { OpenAI, Anthropic, Gemini } from '@modelicons/vue';
</script>

<template>
  <OpenAI.Mono :size="32" />
  <Anthropic.Mono :size="24" />
  <Gemini.Color :size="32" />
</template>
```

Each brand exports `Mono`, optionally `Color` and `Text` variants, plus `title` and `colorPrimary` constants.

## Bulk metadata

```ts
import { brands } from '@modelicons/vue';
console.log(brands.length); // 319
```

## React?

Use [`modelicons`](https://www.npmjs.com/package/modelicons).

## License

MIT. SVG art derived from [lobehub/lobe-icons](https://github.com/lobehub/lobe-icons) (MIT).
