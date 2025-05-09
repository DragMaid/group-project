import base from '../../jest.config.base.mjs';

const jestConfig = {
  ...base,
  displayName: 'api',
  rootDir: '.',
  testMatch: ['<rootDir>/**/*.(test|spec).ts'],
};

export default jestConfig;
