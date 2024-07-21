module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/functions.ts",
    "**/functions_**.ts",
    "**/nameApiService.ts",
  ],
};
