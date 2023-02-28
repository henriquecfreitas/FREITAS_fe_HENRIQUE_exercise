const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@API": path.resolve(__dirname, './src/api'),
      "@Components": path.resolve(__dirname, './src/components'),
      "@Context": path.resolve(__dirname, './src/contexts/index.ts'),
      "@ContextProvider": path.resolve(__dirname, './src/contexts/providers.ts'),
      "@Types": path.resolve(__dirname, './src/types'),
      "@Pages": path.resolve(__dirname, './src/pages'),
    },
  },
};