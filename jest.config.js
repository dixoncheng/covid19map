module.exports = {
  // roots: ["<rootDir>"],
  preset: "ts-jest",
  // testEnvironment: "node",
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    //   "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^.+\\.svg$": "<rootDir>/svgTransform.js",
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  // moduleDirectories: ["node_modules", "components", "lib"],
  // roots: ["<rootDir>", "components"],
  modulePaths: ["<rootDir>"],
};
