import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: ['src/main.tsx'],
      provider: 'v8',
      reporter: ['text', 'html'],
    },
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
