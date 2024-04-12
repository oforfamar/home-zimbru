import type { Config } from "../types/config.js";

const config: Config = {
  log_level: process.env.log_level ?? "info",
};

export default config;
