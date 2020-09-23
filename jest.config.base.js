module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  setupFiles: ['./jest-setup.ts'],
  reporters: ['default', 'jest-junit'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json'
    }
  }
};
