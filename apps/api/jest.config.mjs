import jestBaseConfig from '../../jest.config.base.mjs';

const jestConfig = {
  ...jestBaseConfig,
  displayName: 'api',
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/**/*.(test|spec).ts'],
};

export default jestConfig;
