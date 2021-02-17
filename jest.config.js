module.exports = {
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
   "!<rootDir>/src/**/index.{ts,tsx}",
    "!<rootDir>/src/**/__helpers__/*.{ts,tsx}",
    "!<rootDir>/src/**/__mocks__/*.{ts,tsx}",
  ],
  projects: [
    "<rootDir>/packages/*/jest.config.js"
  ]
};
