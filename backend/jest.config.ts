// const nextJest = require('next/jest')

// const createJestConfig = nextJest({
//     // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
//     dir: './',
// })

// // Add any custom config to be passed to Jest
// const customJestConfig = {
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//     testEnvironment: 'jsdom',
// }

// // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// module.exports = {
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//     preset: 'ts-jest',
//     testEnvironment: 'node',
//     testMatch: ['**/__tests__/**/*.test.ts'],
// }
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testMatch: ['**/__tests__/**/*.test.ts'],
}
