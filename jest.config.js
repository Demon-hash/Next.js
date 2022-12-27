/** @type {import('ts-jest').JestConfigWithTsJest} */
const nextJest = require('next/jest');
const { defaults: tsjPreset } = require('ts-jest/presets');

const createJestConfig = nextJest({
    dir: './',
});

module.exports = createJestConfig({
    verbose: true,
    transform: {
        ...tsjPreset.transform,
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testMatch: ['<rootDir>/**/*.(spec|test).{ts,tsx}'],
    moduleDirectories: ['node_modules', '<rootDir>/'],
    testEnvironment: 'jest-environment-jsdom'
});