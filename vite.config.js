import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      components: '/src/components',
      layouts: '/src/layouts',
      models: '/src/models',
      state: '/src/state',
      samples: '/src/samples',
      utils: '/src/utils',
      theme: '/src/theme',
    },
  },
  build: {
    rollupOptions: {
      onwarn: (warning, warn) => {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      },
    },
  },
});
