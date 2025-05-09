import base from '../../jest.config.base.mjs';

const jestConfig = {
  ...base,
  displayName: 'ui',
  rootDir: '.',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/*.(test|spec).ts?(x)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default jestConfig;
