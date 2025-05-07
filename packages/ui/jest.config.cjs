const base = require('../../jest.config.base.cjs');

module.exports = {
  ...base,
  displayName: 'ui',
  rootDir: '.',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/*.(test|spec).ts?(x)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

