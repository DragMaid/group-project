import base from '../../jest.config.base.mjs';

const jestConfig = {
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

export default jestConfig;
