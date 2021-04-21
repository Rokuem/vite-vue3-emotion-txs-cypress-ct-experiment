import { startDevServer } from "@cypress/vite-dev-server";
import viteConfig from "../../vite.config";
import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin';

export default function (on, config) {
  addMatchImageSnapshotPlugin(on, config);
  on("dev-server:start", (options) => {
    return startDevServer({ options, viteConfig });
  });
  return config;
}
