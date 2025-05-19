/// <reference types="node" />

// Ensure process.env is recognized globally
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HTTPBIN_API_TOKEN?: string;
      HTTPBIN_DOMAIN?: string;
    }
  }
}

export {};
