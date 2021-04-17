import { startDevServer } from '@cypress/vite-dev-server';
import viteConfig from '../../vite.config';

export default function (on, config) {
  on('dev-server:start', (options) => {
    return startDevServer({ options, viteConfig })
  })
  return config
}