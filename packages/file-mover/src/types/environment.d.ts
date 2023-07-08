declare global {
  namespace NodeJS {
    interface ProcessEnv {
      sourceFolder: string;
      destinationBasePath: string;
      provider: string;
      resolution: string;
      extension: string;
      delimiter: string;
    }
  }
}

export {};
