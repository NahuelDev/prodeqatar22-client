import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePWA({
    includeAssets: ["favicon.svg"],
    injectRegister: "inline",
    manifest: {
      background_color: "#000",
      description: "App with football bracket prediction (World Cup Qatar 2022) to bet with friends",
      display: "fullscreen",
      icons: [
        {
          purpose: "any",
          sizes: "any",
          src: "favicon.svg",
          type: "image/svg+xml"
        }
      ],
      name: "Prodegios",
      short_name: "Prodegios",
      theme_color: "#000"
    },
    workbox: {
      globPatterns: ["**/*.{js,html,svg, gz}"]
    }
  }),
  ]
})

