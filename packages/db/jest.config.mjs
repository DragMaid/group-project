import base from '../../jest.config.base.mjs';

const jestConfig = {
  ...base,
  displayName: 'db',
  rootDir: '.',
  testMatch: ['<rootDir>/**/*.(test|spec).ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default jestConfig;
