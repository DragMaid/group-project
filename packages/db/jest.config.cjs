const base = require('../../jest.config.base.cjs');

module.exports = {
  ...base,
  displayName: 'db',
  rootDir: '.',
  testMatch: ['<rootDir>/**/*.(test|spec).ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

