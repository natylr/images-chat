const path = require('path');

module.exports = {
  mode: "development", // Or "production"
  entry: "./src/index.tsx", // Point to your TypeScript entry file
  output: {
    filename: "bundle.js", // Name of the output bundle
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Add file extensions
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      process: require.resolve('process/browser'),
      vm: require.resolve('vm-browserify'), // Add this line to handle 'vm'
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
