// jest.config.js
/*module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|react-redux' +
      '|@react-navigation' +
      ')/)',
  ],
};*/

module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',  // Usamos babel-jest para procesar TS/JSX
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' + 
      '|@react-native' + 
      '|react-redux' +  // Incluye react-redux para que Jest lo transforme
      '|@react-navigation' +
      '|@supabase' +
      ')/)',
  ],
  moduleNameMapper: {
    '^@env$': '<rootDir>/__mocks__/@env.js',
  },
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.js'],
};
