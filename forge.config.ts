import { MakerDeb, MakerDebConfig } from "@electron-forge/maker-deb";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
// import { MakerRpm } from "@electron-forge/maker-rpm";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";
import type { ForgeConfig } from "@electron-forge/shared-types";

import { DEEP_LINK } from "./src/constants";
import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";

const DEB_CONFIG: MakerDebConfig = {
  options: {
    mimeType: [`x-scheme-handler/${DEEP_LINK}`],
    name: "cloud-pigeon",
    productName: "Cloud Pigeon",
  },
};

const config: ForgeConfig = {
  packagerConfig: {
    name: "cloud-pigeon",
    executableName: "cloud-pigeon",
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ["darwin"]),
    // new MakerRpm({}),
    new MakerDeb(DEB_CONFIG),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./src/index.html",
            js: "./src/renderer.tsx",
            name: "main_window",
            preload: {
              js: "./src/preload.ts",
            },
          },
        ],
      },
      devContentSecurityPolicy: `default-src 'self' 'unsafe-inline' img-src * data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:`,
    }),
  ],
};

export default config;
