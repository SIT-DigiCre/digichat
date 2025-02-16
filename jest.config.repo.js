const config = {
  preset: "ts-jest",
  testEnvironment: "@quramy/jest-prisma/environment",
  testEnvironmentOptions: {
    enableExperimentalRollbackInTransaction: true,
  },
  roots: ["<rootDir>/src/repositories"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx", ".mts"],
};

module.exports = config;
