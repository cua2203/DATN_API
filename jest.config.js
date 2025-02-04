// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Chuyển đổi các file TypeScript
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    testMatch: ['**/test/**/*.test.ts'], // Đường dẫn đến file test
    extensionsToTreatAsEsm: ['.ts'], // Để Jest nhận biết file TypeScript là module
    detectOpenHandles: true
  };
  