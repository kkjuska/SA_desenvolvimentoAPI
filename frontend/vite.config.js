import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // 1. Importa o módulo path
import { fileURLToPath } from 'url' // 2. Importa para recriar o __dirname

// 3. Cria manualmente o equivalente ao __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Agora o '@' vai funcionar perfeitamente apontando para a pasta src
      "@": path.resolve(__dirname, "./src"),
    },
  },
})