// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: setear `site` con el dominio real (canonical, OG, sitemap).
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Allow Cloudflare quick-tunnel hosts (temporary demo URLs).
      allowedHosts: ['.trycloudflare.com'],
    },
  },
});
