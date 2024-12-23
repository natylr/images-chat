const { override, addWebpackPlugin } = require("react-app-rewired");
const webpack = require("webpack");

module.exports = override(
  (config) => {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      assert: require.resolve("assert"),
    });
    config.resolve.fallback = fallback;

    config.plugins = (config.plugins || []).concat([
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ]);
    return config;
  }
);
