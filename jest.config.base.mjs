/** @type {import('jest').Config} */
const jestBaseConfig = {
  testEnvironment: 'node',
  passWithNoTests: true,
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/dist/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/.next/', '/dist/']
};

export default jestBaseConfig;
