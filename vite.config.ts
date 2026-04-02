import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repositoryName = 'teoria-animada'

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : `/${repositoryName}/`,
  plugins: [react()],
}))
