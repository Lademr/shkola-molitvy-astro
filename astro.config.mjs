import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx'; // <-- Добавили импорт

export default defineConfig({
  site: 'https://shkola-molitvy.ru',
  output: 'static',
  base: '/',
  build: {
    format: 'directory',
  },
  integrations: [tailwind(), mdx()], // <-- Добавили mdx() в массив
});
