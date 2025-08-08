import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // any request starting with /api/poke will be forwarded...
      "/api/poke": {
        target: "https://api.pokemontcg.io/v2/cards?q=set.name:Fossil nationalPokedexNumbers:[1 TO 151]",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/poke/, ""),
      },
    },
  },
});