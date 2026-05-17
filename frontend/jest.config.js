module.exports = {
  roots: ['<rootDir>/src/tests/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/src/tests/styleMock.js',
    '\\.(svg|png|jpg)$': '<rootDir>/src/tests/fileMock.js',
  },
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/src/tests/jestSetup.js'],
};
