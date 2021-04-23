import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vuePlugin from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vuePlugin(), vueJsx()],
  server: {
    watch: {
      ignored: [(path: string) => {
        const ignored = path.includes('snapshots') || path.includes('screenshots');
        if (ignored) console.warn('Ignoring: ', path);
        return ignored;
      }],  
    }
  } 
});
