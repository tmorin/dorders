module.exports = {
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/**/__helpers__/*.{ts,tsx}"
  ],
  projects: [
    "<rootDir>/packages/*/jest.config.js"
  ]
};
