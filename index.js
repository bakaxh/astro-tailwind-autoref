import { minimatch } from 'minimatch';

export default function addTailwindcssReference(options = {}) {
  const {
    reference = 'tailwindcss',
    trigger = '@apply',
    include = null,
    exclude = null,
    debug = false,
  } = options;

  return {
    postcssPlugin: 'postcss-add-reference',
    Once(root, { result }) {
      const from = result.opts.from || '';

      if (include === null && exclude === null) {
        if (!from.includes('.astro')) return;
      } else {
        let isIncluded = true;
        if (include !== null) {
          isIncluded = include.some(pattern => minimatch(from, pattern));
        }
        if (!isIncluded) return;
        if (exclude !== null) {
          const isExcluded = exclude.some(pattern => minimatch(from, pattern));
          if (isExcluded) return;
        }
      }

      const css = root.source?.input?.css || '';
      if (css.includes(`@reference "${reference}"`)) return;
      if (css.includes(trigger)) {
        root.prepend({ name: 'reference', params: `"${reference}"` });
        if (debug) {
          console.log(`[astro-tailwind-autoref] Injected @reference "${reference}" into: ${from}`);
        }
      }
    },
  };
}
addTailwindcssReference.postcss = true;