# astro-tailwind-autoref

A PostCSS plugin that automatically injects `@reference "tailwindcss"` into `.astro` styles when `@apply` is detected.

## Install

npm:
```bash
npm install astro-tailwind-autoref
```
pnpm:
```bash
pnpm add astro-tailwind-autoref
```
yarn:
```bash
yarn add astro-tailwind-autoref
```

## Usage

Install portcss and @tailwindcss/vite
```bash
npm install portcss @tailwindcss/vite
```

In astro.config.mjs:

```js
import addTailwindcssReference from 'astro-tailwind-autoref';

export default defineConfig({
  vite: {
    css: {
      postcss: {
        plugins: [addTailwindcssReference({
            reference: "tailwindcss",
            trigger: "@apply",
            include: "['**/*.astro']",
            exclude: ""
        })]
      }
    }
  }
});
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `reference` | `string` | `'tailwindcss'` | Content after `@reference` |
| `trigger` | `string` | `'@apply'` | Keyword that triggers injection |
| `include` | `string[]` | `['**/*.astro']` | Glob patterns to include |
| `exclude` | `string[]` | `[]` | Glob patterns to exclude |

## How it works

This plugin runs as a PostCSS plugin during the build. When Astro processes .astro files, all styles (regardless of their lang attribute) are eventually compiled to plain CSS and passed to PostCSS.

The plugin checks the file path against include / exclude patterns.

It scans the CSS content for the trigger keyword (default @apply) and ensures no @reference already exists.

If conditions are met, it prepends an at-rule @reference "xxx" to the root.

## License

MIT