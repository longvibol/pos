import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { meteor } from 'meteor-vite/plugin';
import Components from 'unplugin-vue-components/vite'
import { QuasarResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'


export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    meteor({
      clientEntry: 'client/main.js',
      serverEntry: 'server/main.js',
      enableExperimentalFeatures: true,
      stubValidation: {
        ignorePackages: ['meteor/mongo'],
      },
    }),
    AutoImport({
      resolvers: [QuasarResolver()],
    }),
     Components({
      resolvers: [QuasarResolver()],
      dirs: ['src/components'], // 👈 auto-import your own components here
      extensions: ['vue'],
      deep: true,
      dts: true,
    }),
  ],
  optimizeDeps: {
    exclude: ['vue-meteor-tracker'],
  },
});
