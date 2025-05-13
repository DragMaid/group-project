import jestBaseConfig from '../../jest.config.base.mjs';

const jestConfig = {
  ...jestBaseConfig,
  displayName: 'web',
  rootDir: '.',
  testEnvironment: 'jsdom', 
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/**/*.(test|spec).ts?(x)'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};

export default jestConfig;
