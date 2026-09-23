import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://https://shkola-molitvy.ru',
  output: 'static',
  base: '/',
  build: {
    format: 'directory',
  },
  integrations: [tailwind()],
});
