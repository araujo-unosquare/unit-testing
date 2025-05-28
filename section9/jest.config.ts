import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/app/server_app/**/*.ts"],
  testMatch: ["<rootDir>/src/test/server_app/**/*test.ts"],
  setupFiles: ["<rootDir>/src/test/server_app/test utils/config.ts"],
};

export default config;
