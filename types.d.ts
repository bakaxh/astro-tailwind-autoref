declare module 'astro-tailwind-autoref' {
  import { Plugin } from 'postcss';
  export default function addTailwindcssReference(options?: {
    reference?: string;
    trigger?: string;
    include?: string[] | null;
    exclude?: string[] | null;
    debug?: boolean;
  }): Plugin;
}