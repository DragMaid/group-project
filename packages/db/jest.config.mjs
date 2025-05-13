import jestBaseConfig from '../../jest.config.base.mjs';

const jestConfig = {
  ...jestBaseConfig,
  displayName: 'db',
  rootDir: '.',
  testMatch: ['<rootDir>/**/*.(test|spec).ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default jestConfig;
