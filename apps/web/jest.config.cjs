const base = require('../../jest.config.base.cjs');

module.exports = {
  ...base,
  displayName: 'web',
  rootDir: '.',
  testEnvironment: 'jsdom', // Required for React + browser APIs
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/**/*.(test|spec).ts?(x)'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};

