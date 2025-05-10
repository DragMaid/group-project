import jestBaseConfig from '../../jest.config.base.mjs';

const jestConfig = {
  ...jestBaseConfig,
  displayName: 'ui',
  rootDir: '.',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/*.(test|spec).ts?(x)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default jestConfig;
