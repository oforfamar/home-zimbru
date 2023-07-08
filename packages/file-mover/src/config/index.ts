import type { Config } from "../types/config.js";

const config: Config = {
  sourceFolder: process.env.sourceFolder ?? "",
  destinationBasePath: process.env.destinationBasePath ?? "",
  provider: process.env.provider ?? "",
  resolution: process.env.resolution ?? "",
  extension: process.env.extension ?? "",
  delimiter: process.env.delimiter ?? "",
};

export default config;
