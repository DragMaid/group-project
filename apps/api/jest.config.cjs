const base = require('../../jest.config.base.cjs');

module.exports = {
  ...base,
  displayName: 'api',
  rootDir: '.',
  testMatch: ['<rootDir>/**/*.(test|spec).ts'],
};

