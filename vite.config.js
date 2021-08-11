import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import child_process from 'child_process'

if (!process.env.NODE_ENV) {
  process.env.VITE_DEV = "1";
  child_process.exec("electron .");
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [vue()]
})
