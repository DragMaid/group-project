import base from '../../jest.config.base.mjs';

const jestConfig = {
  ...base,
  displayName: 'api',
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/**/*.(test|spec).ts'],
};

export default jestConfig;
