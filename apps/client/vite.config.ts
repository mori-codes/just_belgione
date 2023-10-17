import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  return {
    cacheDir: '../../node_modules/.vite/client',

    server: {
      port: 4200,
      host: 'localhost',
    },

    preview: {
      port: 4300,
      host: 'localhost',
    },

    define: {
      'process.env': {
        NX_REACT_APP_API_URL:
          mode === 'development'
            ? 'http://localhost:8000'
            : 'https://just-belgiapi.deno.dev',
        NX_REACT_APP_WS_URL:
          mode === 'development'
            ? 'ws://localhost:8000'
            : 'wss://just-belgiapi.deno.dev',
      },
    },

    plugins: [
      react(),
      nxViteTsPaths(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: mode === 'development',
        },
        manifest:{
          name: "Solo Una",
          short_name: "Solo Una",
          description: "By p&m",
          start_url: "/",
          display: "standalone",
          theme_color: "#FAE493",
          background_color: "#FAE493",
          lang: "es",
          display_override: ["standalone", "window-controls-overlay"],
          orientation: "portrait",
          dir: "ltr",
          icons: [
            {
              src: "/favicon-32x32.png",
              sizes: "32x32",
              type: "image/x-icon",
            },
            {
              src: "/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "/android-chrome-192x192.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any",
            },
          ],
        }
      }),
    ],

    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
  };
});
