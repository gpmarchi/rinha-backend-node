import tsConfigPaths from 'vite-tsconfig-paths'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    setupFiles: './test/config/setup-tests.ts',
    exclude: [...configDefaults.exclude, '**/build/**'],
  },
})
